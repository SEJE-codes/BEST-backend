const express = require("express");
const router = express.Router();

const PDFDocument = require("pdfkit");
require("pdfkit-table");

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

      const tableData =
        typeof report.data ===
        "string"
          ? JSON.parse(
              report.data
            )
          : report.data;

      const doc =
        new PDFDocument({
          size: "A3",
          layout:
            "landscape",
          margin: 15,
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

  row.possible_causes || "",

  row.dangerous_phenomenon || "",

  row.consequences || "",

  row.initial_risk || "",

  row.existing_measures || "",

  row.residual_risk || "",

  row.scenario || ""

]);

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

      await doc.table(
  table,
  {

    width: 1120,

    columnsSize: [

      60,
      90,
      90,
      80,
      120,
      120,
      110,
      120,
      70,
      120,
      80,
      60

    ],

    prepareHeader: () => {

      doc
        .font("Helvetica-Bold")
        .fontSize(7);

    },

    prepareRow: (
      row,
      indexColumn,
      indexRow,
      rectRow
    ) => {

      doc
        .font("Helvetica")
        .fontSize(6);

      doc.rect(

        rectRow.x,
        rectRow.y,

        rectRow.width,
        rectRow.height

      ).stroke();

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