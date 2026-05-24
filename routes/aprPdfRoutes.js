const express = require("express");

const router = express.Router();

const db = require("../config/db");

const PDFDocument = require("pdfkit");

router.get(
  "/export/:id",
  (req, res) => {

    const { id } = req.params;

    const sql =
      "SELECT * FROM apr_reports WHERE id = ?";

    db.query(
      sql,
      [id],
      (err, results) => {

        if (err) {
          console.log(err);

          return res.status(500).json({
            message:
              "Database error",
          });
        }

        if (
          results.length === 0
        ) {
          return res.status(404).json({
            message:
              "Report not found",
          });
        }

        const report =
          results[0];

        let data =
          report.data;

        // =========================
        // SAFE JSON
        // =========================

        if (
          typeof data ===
          "string"
        ) {
          data =
            JSON.parse(data);
        }

        // =========================
        // PDF CONFIG
        // =========================

        const doc =
          new PDFDocument({
            margin: 20,
            size: "A3",
            layout:
              "landscape",
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

        // =========================
        // TITLE
        // =========================

        doc
          .fontSize(18)
          .fillColor("black")
          .text(
            "TABLEAU APR INDUSTRIEL",
            {
              align:
                "center",
            }
          );

        doc.moveDown();

        doc
          .fontSize(13)
          .text(
            `ZONE : ${report.zone}`
          );

        doc.moveDown();

        // =========================
        // TABLE CONFIG
        // =========================

        const startX = 20;
        let y = 120;

        const rowHeight = 60;

        const columns = [
          {
            title: "N°",
            width: 35,
          },

          {
            title:
              "Installation",
            width: 90,
          },

          {
            title:
              "Opération",
            width: 90,
          },

          {
            title:
              "Produit",
            width: 80,
          },

          {
            title:
              "Événement",
            width: 90,
          },

          {
            title:
              "Causes",
            width: 120,
          },

          {
            title:
              "Phénomène",
            width: 120,
          },

          {
            title:
              "Conséquences",
            width: 120,
          },

          {
            title:
              "Risques",
            width: 80,
          },

          {
            title:
              "Mesures existantes",
            width: 150,
          },

          {
            title:
              "Risque résiduel",
            width: 70,
          },

          {
            title:
              "Scénario",
            width: 55,
          },

          {
            title: "F",
            width: 30,
          },

          {
            title: "G",
            width: 30,
          },

          {
            title: "C",
            width: 30,
          },
        ];

        // =========================
        // DRAW HEADER
        // =========================

        let x = startX;

        columns.forEach(
          (col) => {

            doc
              .rect(
                x,
                y,
                col.width,
                rowHeight
              )
              .fillAndStroke(
                "#D9D9D9",
                "black"
              );

            doc
              .fillColor(
                "black"
              )
              .fontSize(9)
              .text(
                col.title,
                x + 3,
                y + 20,
                {
                  width:
                    col.width -
                    6,
                  align:
                    "center",
                }
              );

            x += col.width;
          }
        );

        y += rowHeight;

        // =========================
        // DRAW ROWS
        // =========================

        doc.font("Helvetica");
        data.forEach(
          (row) => {

            let x =
              startX;

            const rowData = [

              row.n,

              `${row.installation}`,

              row.operation,

              row.product,

              row.central_event,

              row.possible_causes,

              row.dangerous_phenomenon,

              row.consequences,

              row.initial_risk,

              Array.isArray(
  row.existing_measures
)
  ? row.existing_measures.join("\n")
  : typeof row.existing_measures ===
    "object"
  ? JSON.stringify(
      row.existing_measures,
      null,
      2
    )
  : String(
      row.existing_measures || ""
    )
      .replace(/,/g, "\n")
      .replace(
        /[^\x20-\x7EÀ-ÿ\n]/g,
        ""
      )
      .trim(),

              row.residual_risk,

              row.scenario,

              row.F,

              row.G,

              row.C,
            ];

            rowData.forEach(
              (
                cell,
                index
              ) => {

                let bgColor =
                  "white";

                // =====================
                // RISK COLORS
                // =====================

                if (
                  index === 8
                ) {

                  if (
                    row.initial_color ===
                    "GREEN"
                  )
                    bgColor =
                      "#00B050";

                  if (
                    row.initial_color ===
                    "YELLOW"
                  )
                    bgColor =
                      "#FFFF00";

                  if (
                    row.initial_color ===
                    "ORANGE"
                  )
                    bgColor =
                      "#ED7D31";

                  if (
                    row.initial_color ===
                    "RED"
                  )
                    bgColor =
                      "#FF0000";
                }

                if (
                  index === 10
                ) {

                  if (
                    row.residual_color ===
                    "GREEN"
                  )
                    bgColor =
                      "#00B050";

                  if (
                    row.residual_color ===
                    "YELLOW"
                  )
                    bgColor =
                      "#FFFF00";

                  if (
                    row.residual_color ===
                    "ORANGE"
                  )
                    bgColor =
                      "#ED7D31";

                  if (
                    row.residual_color ===
                    "RED"
                  )
                    bgColor =
                      "#FF0000";
                }

                // =====================
                // CELL
                // =====================

                doc
                  .rect(
                    x,
                    y,
                    columns[
                      index
                    ].width,
                    rowHeight
                  )
                  .fillAndStroke(
                    bgColor,
                    "black"
                  );

                doc
                  .fillColor(
                    "black"
                  )
                  .fontSize(8)
                  .text(
                    String(
                      cell || ""
                    ),
                    x + 2,
                    y + 5,
                    {
                      width:
                        columns[
                          index
                        ].width - 4,
                    }
                  );

                x +=
                  columns[
                    index
                  ].width;
              }
            );

            y += rowHeight;

            // =====================
            // NEW PAGE
            // =====================

            if (y > 500) {

              doc.addPage();

              y = 50;
            }
          }
        );

        doc.end();
      }
    );
  }
);

module.exports = router;