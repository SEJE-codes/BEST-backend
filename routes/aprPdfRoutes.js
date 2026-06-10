const express = require("express");
const router = express.Router();

const PDFDocument = require("pdfkit-table");

const db = require("../config/db");
const fs = require("fs");
const path = require("path");const pdfFolder = path.join(
  __dirname,
  "..",
  "uploads",
  "apr"
);

if (!fs.existsSync(pdfFolder)) {
  fs.mkdirSync(pdfFolder, {
    recursive: true,
  });
}
router.get(
  "/generate/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      const [reports] =
        await db.query(
          "SELECT * FROM apr_reports WHERE id=?",
          [id]
        );

      if (
        reports.length === 0
      ) {

        return res
          .status(404)
          .json({
            message:
              "Report not found",
          });
      }

      const report =
        reports[0];
        console.log("REPORT DATA:");
console.log(report.data);

      const tableData =
        typeof report.data ===
        "string"
          ? JSON.parse(
              report.data
            )
          : report.data;

      const doc = new PDFDocument({
  size: "A2",
  layout: "landscape",
  margin: 20,
});

      const buffers = [];

      doc.on(
        "data",
        buffers.push.bind(
          buffers
        )
      );

      doc.fontSize(18);

      doc.text(
        `APR REPORT - ${report.zone}`,
        {
          align:
            "center",
        }
      );

      doc.moveDown();

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

  row.initial_risk || "",

  (row.existing_measures || "")
    .replace(/\t/g, " ")
    .replace(/-\s*/g, "• ")
    .replace(/\n/g, "\n"),

  row.residual_risk || "",

  row.scenario || ""

]);
console.log("ROWS COUNT:", rows.length);
console.log(rows);
const table = {

  headers: [

    "Bloc",
    "Installation",
    "Operation",
    "Produit",
    "Evenement",
    "Causes",
    "Phenomene",
    "Consequences",
    "Risque",
    "Mesures",
    "Risque Residuel",
    "Scenario"

  ],

  rows

};
doc.moveDown();

doc.fontSize(10);

doc.text(
  `Date de génération : ${new Date().toLocaleDateString()}`,
  {
    align: "right"
  }
);

doc.moveDown(2);
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
      "Scénario"
    ],

    rows
  },

  {
    x: 15,

    width: 1600,

    columnsSize: [
      60,   // Bloc
      130,  // Installation
      140,  // Opération
      120,  // Produit
      160,  // Evènement
      170,  // Causes
      140,  // Phénomène
      170,  // Conséquences
      80,   // Risque
      220,  // Mesures
      100,  // Risque résiduel
      80    // Scenario
    ],

    padding: 5,

    prepareHeader: () => {

      doc
        .font("Helvetica-Bold")
        .fontSize(10);

    },

    prepareRow: (
      row,
      indexColumn,
      indexRow,
      rectRow
    ) => {

      doc
        .font("Helvetica")
        .fontSize(8);

      doc
        .lineWidth(0.8)
        .rect(
          rectRow.x,
          rectRow.y,
          rectRow.width,
          rectRow.height
        )
        .stroke();

    }

  }
);

      doc.end();

      doc.on(
        "end",
        async () => {

          try {

            const pdfBuffer =
  Buffer.concat(buffers);

const fileName =
  `APR_${id}.pdf`;

const filePath =
  path.join(
    pdfFolder,
    fileName
  );

fs.writeFileSync(
  filePath,
  pdfBuffer
);
const pdfUrl =
  `https://best-backend-1.onrender.com/uploads/apr/${fileName}`;
           await db.query(
  `UPDATE apr_reports
   SET pdf_url=?
   WHERE id=?`,
  [
    pdfUrl,
    id,
  ]
);

            res.json({
  message: "PDF generated",
  pdf_url: pdfUrl,
});

          } catch (
            uploadError
          ) {

            console.log(
              uploadError
            );

            res.status(
              500
            ).json({

              message:
                "Cloudinary upload failed",

            });

          }

        }
      );

    } catch (error) {

      console.log(
        error
      );

      res.status(500)
      .json({

        message:
          "PDF generation failed",

      });

    }

  }
);

module.exports =
  router;