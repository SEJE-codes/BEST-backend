const express = require("express");
const router = express.Router();
const db = require("../config/db");
const PDFDocument = require("pdfkit");

router.get("/export/:id", (req, res) => {
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

      if (!Array.isArray(checklist)) {
        checklist = [];
      }
    } catch {
      checklist = [];
    }

    // =========================
    // PDF
    // =========================

    const doc = new PDFDocument({
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

    // =========================
    // HEADER
    // =========================

    doc
      .fontSize(22)
      .fillColor("#0f172a")
      .text("QSHE AUDIT REPORT", {
        align: "center",
      });

    doc.moveDown(2);

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

    // =========================
    // CHECKLIST
    // =========================

    // =========================
// CHECKLIST
// =========================

checklist.forEach((item, index) => {

  doc
    .fontSize(16)
    .fillColor("#2563eb")
    .text(
      `${index + 1}. ${item.equipment}`
    );

  doc.moveDown(0.5);

  if (
    item.inspections &&
    item.inspections.length > 0
  ) {

    item.inspections.forEach((img) => {

      // IMAGE

      if (img.image) {

        try {

          const path =
            require("path");

          const fs =
            require("fs");

          const imagePath =
            path.join(
              __dirname,
              "..",
              "uploads",
              img.image
            );

          if (
            fs.existsSync(
              imagePath
            )
          ) {

            doc.image(
              imagePath,
              {
                fit: [220, 180],
                align: "center",
              }
            );
          }

        } catch (err) {

          console.log(
            "Image not found"
          );
        }
      }

      doc.moveDown(0.5);

      // COMMENT

      doc
        .fontSize(11)
        .fillColor("black")
        .text(
          `Comment: ${
            img.comment ||
            "No comment"
          }`
        );

      // DATETIME

      doc.text(
        ` ${
          img.datetime || "N/A"
        }`
      );

      doc.moveDown(1.5);

      // PAGE BREAK

      if (doc.y > 700) {

        doc.addPage();
      }
    });

  } else {

    doc
      .fontSize(11)
      .fillColor("gray")
      .text(
        "No inspection evidence"
      );
  }

  doc.moveDown(2);
});

    doc.end();
  });
});

module.exports = router;