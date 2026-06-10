const express = require("express");
const router = express.Router();

const OpenAI = require("openai");

const db = require("../config/db");

const blocsData = require("../data/blocs");
const axios = require("axios");
const qhseKnowledge =
  require("../data/qhseKnowledge");

const {
  calculateRisk,
} = require("../utils/riskMatrix");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post(
  "/generate-apr",
  async (req, res) => {
    try {
      const { zone, blocs } = req.body;

      // =========================
      // VALIDATION
      // =========================

      if (
        !zone ||
        !blocs ||
        blocs.length === 0
      ) {
        return res.status(400).json({
          message: "Missing data",
        });
      }

      // =========================
      // BUILD COMPLETE BLOCS
      // =========================

      const completeBlocs = blocs
        .map((item) => {
          const blocInfo =
            blocsData[zone]?.find(
              (b) =>
                b.code === item.code
            );

          if (!blocInfo) {
            return null;
          }

          const knowledge =
            qhseKnowledge[
              item.code
            ];

          return {
            code: blocInfo.code,

            installation:
              blocInfo.installation,

            operation:
              knowledge?.operation ||
              "Activité industrielle",

            product:
              knowledge?.product ||
              "Produit industriel",

            existing_measures:
              item.existing_measures,

            hazards:
              knowledge?.hazards || [],
          };
        })
        .filter(Boolean);

      // =========================
      // AI PROMPT
      // =========================

      const prompt = `
Tu es un expert QHSE spécialisé en APR industriel selon les normes utilisées au Cameroun.

Tu dois générer un tableau APR professionnel EXACTEMENT comme les entreprises industrielles utilisent.

IMPORTANT :
- UNE SEULE LIGNE PAR BLOC
IMPORTANT :

bloc = code du bloc (BAT01, BAT02...)

installation = nom réel de l'installation
(Parking, Atelier mécanique, Réservoir...)

Ne jamais mettre la même valeur dans bloc et installation.
- Ne jamais répéter BAT01 plusieurs fois
- Chaque ligne doit regrouper tous les risques importants du bloc
- Utiliser les données industrielles fournies
- Tu peux enrichir les analyses techniques si nécessaire
- MAIS tu ne dois JAMAIS modifier les mesures existantes de l'utilisateur

Les mesures existantes correspondent aux mesures préventives réellement présentes dans l'entreprise.

IMPORTANT :
- existing_measures = données utilisateur uniquement
- Tu ne dois jamais ajouter tes propres mesures
- Tu dois utiliser ces mesures pour réduire le niveau du risque résiduel

SCENARIO :
- Si residual_risk = RED ou ORANGE → scenario = "YES"
- Si residual_risk = YELLOW ou GREEN → scenario = "NO"

COULEURS :
- GREEN
- YELLOW
- ORANGE
- RED

FORMAT JSON STRICT :

[
  {
    "n": 1,
    "zone": "",
    "bloc": "",
    "installation": "",
    "operation": "",
    "product": "",
    "central_event": "",
    "possible_causes": "",
    "dangerous_phenomenon": "",
    "consequences": "",
    "risks": "",
    "existing_measures": "",
    "initial_risk": "",
    "initial_color": "",
    "residual_risk": "",
    "residual_color": "",
    "scenario": "",
    "F": 1,
    "G": 1,
    "C": 1
  }
]

DONNEES :
${JSON.stringify(
  completeBlocs,
  null,
  2
)}

RÈGLES :
- Textes professionnels
- Textes lisibles
- Causes séparées par saut de ligne
- Conséquences séparées par saut de ligne
- Risques séparés par saut de ligne
- Ne pas écrire de texte inutile
- JSON uniquement
`;

      // =========================
      // OPENAI
      // =========================

      const completion =
        await openai.chat.completions.create({
          model: "gpt-4.1-mini",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.3,
        });

      let response =
        completion.choices[0]
          .message.content;

      // =========================
      // CLEAN JSON
      // =========================

      response = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed =
        JSON.parse(response);

      // =========================
      // APPLY RISK MATRIX
      // =========================

      const finalTable = parsed.map((row) => {

  const originalBloc =
    completeBlocs.find(
      (b) =>
        b.installation ===
        row.installation
    );

  // =====================
  // FORCE COLORS
  // =====================

  if (!row.initial_color) {

    row.initial_color = "GREEN";
    row.initial_risk = "GREEN";

  }

  if (!row.residual_color) {

    row.residual_color =
      row.initial_color;

    row.residual_risk =
      row.initial_risk;

  }

  const scoring =
    calculateRisk(
      row.initial_color
    );

  return {
    ...row,

    existing_measures:
      originalBloc
        ?.existing_measures ||
      row.existing_measures,

    F: scoring.F,
    G: scoring.G,
    C: scoring.C,
  };

});

      // =========================
      // SAVE DATABASE
      // =========================

      const sql = `
INSERT INTO apr_reports
(zone, data)
VALUES (?, ?)
`;

      const [result] =
  await db.query(
    sql,
    [
      zone,
      JSON.stringify(finalTable),
    ]
  );

const reportId =
  result.insertId;
  try {

  const backendUrl =
  process.env.BACKEND_URL;

  await axios.get(
    `${backendUrl}/api/apr-pdf/generate/${reportId}`
  );

  console.log(
    "PDF generated automatically"
  );

} catch (pdfError) {

  console.log(
    "PDF generation error:",
    pdfError.message
  );

}
res.json({

  reportId,

  table: finalTable,

});
 } catch (error) {

  console.log(error);

  res.status(500).json({
    message: "APR generation failed",
  });

}
});   
module.exports = router;