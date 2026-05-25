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
            message: "Database error",
          });
        }

        if (results.length === 0) {

          return res.status(404).json({
            message: "APR report not found",
          });
        }

        const report = results[0];

        let data = report.data;

        // ====================================
        // SAFE JSON PARSE
        // ====================================

        try {

          if (
            typeof data === "string"
          ) {

            data = JSON.parse(data);
          }

          if (!Array.isArray(data)) {
            data = [];
          }

        } catch {

          data = [];
        }

        // ====================================
        // PDF CONFIG
        // ====================================

        const doc =
          new PDFDocument({
            margin: 40,
            size: "A4",
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

        // ====================================
        // HEADER
        // ====================================

        doc
          .fontSize(22)
          .fillColor("#0f172a")
          .text(
            "INDUSTRIAL APR REPORT",
            {
              align: "center",
            }
          );

        doc.moveDown();

        doc
          .fontSize(13)
          .fillColor("black")
          .text(
            `Zone: ${report.zone || "N/A"}`
          );

        doc.text(
          `Generated: ${new Date().toLocaleString()}`
        );

        doc.moveDown(2);

        // ====================================
        // EACH APR BLOCK
        // ====================================

        data.forEach(
          (row, index) => {

            // ================================
            // PAGE BREAK
            // ================================

            if (doc.y > 650) {

              doc.addPage();
            }

            // ================================
            // SECTION TITLE
            // ================================

            doc
              .roundedRect(
                35,
                doc.y,
                530,
                28,
                6
              )
              .fill("#2563eb");

            doc
              .fillColor("white")
              .fontSize(14)
              .text(
                `${index + 1}. ${row.installation || "N/A"}`,
                50,
                doc.y - 20
              );

            doc.moveDown(2);

            // ================================
            // CONTENT
            // ================================

            const addField = (
              title,
              value
            ) => {

              if (doc.y > 700) {
                doc.addPage();
              }

              doc
                .fontSize(11)
                .fillColor("#2563eb")
                .text(
                  title,
                  {
                    continued: true,
                  }
                );

              doc
                .fillColor("black")
                .text(
                  ` ${value || "N/A"}`,
                  {
                    width: 500,
                  }
                );

              doc.moveDown(0.5);
            };

            addField(
              "Operation:",
              row.operation
            );

            addField(
              "Product:",
              row.product
            );

            addField(
              "Central Event:",
              row.central_event
            );

            addField(
              "Possible Causes:",
              row.possible_causes
            );

            addField(
              "Dangerous Phenomenon:",
              row.dangerous_phenomenon
            );

            addField(
              "Consequences:",
              row.consequences
            );

            addField(
              "Risks:",
              row.risks
            );

            addField(
              "Existing Measures:",
              row.existing_measures
            );

            // ================================
            // RISK BOXES
            // ================================

            const riskColor =
              (
                color
              ) => {

                if (
                  color === "GREEN"
                )
                  return "#16a34a";

                if (
                  color === "YELLOW"
                )
                  return "#eab308";

                if (
                  color === "ORANGE"
                )
                  return "#ea580c";

                return "#dc2626";
              };

            // INITIAL RISK

            doc
              .roundedRect(
                40,
                doc.y,
                240,
                35,
                8
              )
              .fill(
                riskColor(
                  row.initial_color
                )
              );

            doc
              .fillColor("white")
              .fontSize(12)
              .text(
                `INITIAL RISK : ${row.initial_risk || "N/A"}`,
                55,
                doc.y - 23
              );

            // RESIDUAL RISK

            doc
              .roundedRect(
                320,
                doc.y - 12,
                240,
                35,
                8
              )
              .fill(
                riskColor(
                  row.residual_color
                )
              );

            doc
              .fillColor("white")
              .fontSize(12)
              .text(
                `RESIDUAL RISK : ${row.residual_risk || "N/A"}`,
                335,
                doc.y - 35
              );

            doc.moveDown(3);

            // ================================
            // F G C
            // ================================

            doc
              .fillColor("#0f172a")
              .fontSize(12)
              .text(
                `F = ${row.F || 0}   |   G = ${row.G || 0}   |   C = ${row.C || 0}`
              );

            doc.moveDown(2);

            // LINE

            doc
              .moveTo(40, doc.y)
              .lineTo(550, doc.y)
              .strokeColor("#cbd5e1")
              .stroke();

            doc.moveDown(2);
          }
        );

        doc.end();
      }
    );
  }
);

module.exports = router;