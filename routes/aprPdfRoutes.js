const express = require("express");

const router = express.Router();

const db = require("../config/db");

const PDFDocument = require("pdfkit-table");
const fs = require("fs");
const path = require("path");

router.get(
  "/export/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      const sql =
        "SELECT * FROM apr_reports WHERE id = ?";

      db.query(
        sql,
        async (err, results) => {

          if (err) {

            console.log(err);

            return res.status(500).json({
              message: "Database error",
            });
          }

          if (results.length === 0) {

            return res.status(404).json({
              message: "Report not found",
            });
          }

          const report = results[0];

          console.log(
  "APR ROWS:",
  JSON.parse(report.data).length
);

          let data =
            typeof report.data === "string"
              ? JSON.parse(report.data)
              : report.data;

          // =========================
          // PDF
          // =========================

          const doc =
            new PDFDocument({
              margin: 20,
              size: "A3",
              layout: "landscape",
            });

          res.setHeader(
            "Content-Type",
            "application/pdf"
          );

          res.setHeader(
            "Content-Disposition",
            `attachment; filename=APR_${report.zone}.pdf`
          );

          doc.pipe(res);

          const logoPath =
  path.join(
    __dirname,
    "..",
    "uploads",
    "best.png"
  );

if (
  fs.existsSync(
    logoPath
  )
) {

  doc.image(
    logoPath,
    20,
    15,
    {
      width: 90
    }
  );
}

doc.moveDown(4);

          // =========================
          // TITLE
          // =========================

          doc
            .fontSize(20)
            .fillColor("#0f172a")
            .text(
              "TABLEAU APR INDUSTRIEL",
              {
                align: "center",
              }
            );

          doc.moveDown();

          doc
            .fontSize(12)
            .fillColor("black")
            .text(
              `ZONE : ${report.zone}`
            );

          doc.moveDown();

          // =========================
          // TABLE
          // =========================

          const table = {

            headers: [

              "Bloc",

              "Installation",

              "Operation",

              "Produit",

              "Evenement",

              "Causes",

              "Phenomenes",

              "Consequences",

              "Mesures",

              "Initial",

              "Residual",
            ],

            rows: data.map((row) => [

              row.zone || "",

              row.installation || "",

              row.operation || "",

              row.product || "",

              row.central_event || "",

              row.possible_causes || "",

              row.dangerous_phenomenon || "",

              row.consequences || "",

              row.existing_measures || "",

              row.initial_risk || "",

              row.residual_risk || "",
            ]),
          };

          await doc.table(table, {

            width: 1100,

            prepareHeader: () => {

              doc
                .font("Helvetica-Bold")
                .fontSize(8);
            },

            prepareRow: (
              row,
              indexColumn,
              indexRow,
              rectRow
            ) => {

              doc
                .font("Helvetica")
                .fontSize(7);
            },
          });

          doc.end();
        }
      );
    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "PDF generation failed",
      });
    }
  }
);

module.exports = router;