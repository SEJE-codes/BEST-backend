const express = require("express");
const router = express.Router();

const PDFDocument = require("pdfkit-table");
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// ===============================
// FOLDER PDF
// ===============================
const pdfFolder = path.join(__dirname, "..", "uploads", "apr");

if (!fs.existsSync(pdfFolder)) {
  fs.mkdirSync(pdfFolder, { recursive: true });
}

// ===============================
// ROUTE GENERATE PDF
// ===============================
router.get("/generate/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [reports] = await db.query(
      "SELECT * FROM apr_reports WHERE id=?",
      [id]
    );

    if (reports.length === 0) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    const report = reports[0];

    const tableData =
      typeof report.data === "string"
        ? JSON.parse(report.data)
        : report.data;

    // ===============================
    // PDF CONFIG (A3 LANDSCAPE)
    // ===============================
    const doc = new PDFDocument({
      size: "A3",
      layout: "landscape",
      margin: 15,
    });

    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    // ===============================
    // TITLE
    // ===============================
    doc.fontSize(18);
    doc.text(`APR REPORT - ${report.zone}`, {
      align: "center",
    });

    doc.moveDown();

    // ===============================
    // FORMAT DATA
    // ===============================
    const rows = tableData.map((row) => [
      row.bloc || "",
      row.installation || "",
      row.operation || "",
      row.product || "",
      row.central_event || "",
      (row.possible_causes || "")
        .replace(/\n/g, "\n• "),
      (row.dangerous_phenomenon || "")
        .replace(/\n/g, "\n• "),
      (row.consequences || "")
        .replace(/\n/g, "\n• "),
      {
  type: "risk",
  value: row.initial_risk || ""
},
      (row.existing_measures || "")
        .replace(/\t/g, " ")
        .replace(/-\s*/g, "• ")
        .replace(/\n/g, "\n"),
      {
  type: "risk",
  value: row.residual_risk || ""
},
      row.scenario || "",
    ]);

    console.log("ROWS COUNT:", rows.length);

    function getRiskColor(risk) {
  if (!risk) return "#FFFFFF";

  const value = risk.toLowerCase();

  if (value.includes("green") || value.includes("vert"))
    return "#00B050";

  if (value.includes("yellow") || value.includes("jaune"))
    return "#FFFF00";

  if (value.includes("orange"))
    return "#ED7D31";

  if (value.includes("red") || value.includes("rouge"))
    return "#FF0000";

  return "#FFFFFF";
}

    // ===============================
    // TABLE
    // ===============================
    await doc.table(
      {
        headers: [
          "Bloc",
          "Installation",
          "Opération",
          "Produit",
          "Évènement",
          "Causes",
          "Phénomène",
          "Conséquences",
          "Risque",
          "Mesures Existantes",
          "Risque Résiduel",
          "Scénario",
        ],
        rows,
      },
      {
        x: 15,
        width: 820, // optimisé pour A3 paysage lisible

        columnsSize: [
          50,   // Bloc
          90,   // Installation
          100,  // Opération
          90,   // Produit
          120,  // Évènement
          140,  // Causes
          120,  // Phénomène
          140,  // Conséquences
          70,   // Risque
          180,  // Mesures
          90,   // Risque résiduel
          80,   // Scénario
        ],

        padding: 10, // 🔥 AUGMENTE LA HAUTEUR VISUELLE
        divider: {
  header: { disabled: false, width: 1 },
  horizontal: { disabled: false, width: 1 },
  vertical: { disabled: false, width: 1 }
},
        prepareHeader: () => {
          doc.font("Helvetica-Bold").fontSize(9);
        },

        prepareRow: (row, indexColumn, indexRow, rectRow) => {
  doc
    .font("Helvetica")
    .fontSize(8);

  // Bordure extérieure de la ligne
  doc
    .lineWidth(0.8)
    .rect(
      rectRow.x,
      rectRow.y,
      rectRow.width,
      rectRow.height
    )
    .stroke();

    const riskColumn = 8;
const residualRiskColumn = 10;

if (
  indexColumn === riskColumn &&
  row[indexColumn]?.type === "risk"
) {
  doc
    .fillColor(
      getRiskColor(row[indexColumn].value)
    )
    .rect(
      rectRow.x + 5,
      rectRow.y + 5,
      rectRow.width - 10,
      rectRow.height - 10
    )
    .fill();

  doc.fillColor("black");
}

if (
  indexColumn === residualRiskColumn &&
  row[indexColumn]?.type === "risk"
) {
  doc
    .fillColor(
      getRiskColor(row[indexColumn].value)
    )
    .rect(
      rectRow.x + 5,
      rectRow.y + 5,
      rectRow.width - 10,
      rectRow.height - 10
    )
    .fill();

  doc.fillColor("black");
}
},
      }
    );

    doc.end();

    // ===============================
    // SAVE FILE
    // ===============================
    doc.on("end", async () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);

        const fileName = `APR_${id}.pdf`;
        const filePath = path.join(pdfFolder, fileName);

        fs.writeFileSync(filePath, pdfBuffer);

        const pdfUrl = `https://best-backend-1.onrender.com/uploads/apr/${fileName}`;

        await db.query(
          `UPDATE apr_reports SET pdf_url=? WHERE id=?`,
          [pdfUrl, id]
        );

        res.json({
          message: "PDF generated successfully",
          pdf_url: pdfUrl,
        });
      } catch (uploadError) {
        console.log(uploadError);

        res.status(500).json({
          message: "PDF saving failed",
        });
      }
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "PDF generation failed",
    });
  }
});

module.exports = router;