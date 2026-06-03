const express = require("express");
const router = express.Router();
const db = require("../config/db");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

router.get("/export/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const sql =
      "SELECT * FROM audits WHERE id = ?";

    db.query(sql, [id], (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Database error",
        });
      }

      if (results.length === 0) {

        return res.status(404).json({
          message: "Audit not found",
        });
      }

      const audit = results[0];

      let checklist = [];

      try {

        checklist =
          typeof audit.checklist === "string"
            ? JSON.parse(audit.checklist)
            : audit.checklist;

      } catch {

        checklist = [];
      }

      const doc =
        new PDFDocument({
          margin: 30,
          size: "A4",
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename=audit_${audit.id}.pdf`
      );

      doc.pipe(res);

      // =====================
      // LOGO
      // =====================

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
          50,
          20,
          {
            width: 80,
          }
        );
      }

      doc.moveDown(4);

      // =====================
      // HEADER
      // =====================

      doc
        .fontSize(22)
        .fillColor("#0f172a")
        .text(
          "QSHE AUDIT REPORT",
          {
            align: "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(12)
        .fillColor("black")
        .text(
          `Company: ${audit.company_name}`
        );

      doc.text(
        `Inspector: ${audit.inspector_name}`
      );

      doc.text(
        `Date: ${
          audit.audit_date
            ? new Date(
                audit.audit_date
              ).toLocaleString()
            : "N/A"
        }`
      );

      doc.moveDown(2);

      // =====================
      // CHECKLIST
      // =====================

      checklist.forEach(
        (
          item,
          equipmentIndex
        ) => {

          doc
            .fontSize(16)
            .fillColor("#2563eb")
            .text(
              `${equipmentIndex + 1}. ${item.equipment}`
            );

          doc.moveDown();

          item.inspections?.forEach(
            (
              inspection,
              inspectionIndex
            ) => {

              if (
                doc.y > 650
              ) {

                doc.addPage();
              }

              // IMAGE

              if (
                inspection.image
              ) {

                try {

                  const imagePath =
                    path.join(
                      __dirname,
                      "..",
                      "uploads",
                      inspection.image
                    );

                  if (
                    fs.existsSync(
                      imagePath
                    )
                  ) {

                    doc.image(
                      imagePath,
                      {
                        fit: [
                          180,
                          140,
                        ],
                        align:
                          "center",
                      }
                    );
                  }

                } catch (err) {

                  console.log(
                    "Image loading error:",
                    err.message
                  );
                }
              }

              doc.moveDown(0.5);

              doc
                .fontSize(11)
                .fillColor(
                  "black"
                )
                .text(
                  `Comment: ${
                    inspection.comment ||
                    "No comment"
                  }`
                );

              doc.text(
                `Date: ${
                  inspection.datetime ||
                  "N/A"
                }`
              );

              doc.moveDown();
            }
          );

          doc.moveDown();
        }
      );

      doc.end();

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "PDF generation failed",
    });
  }

});

module.exports = router;