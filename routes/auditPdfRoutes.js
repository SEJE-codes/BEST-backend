const express = require("express");
const router = express.Router();
const db = require("../config/db");
const PDFDocument = require("pdfkit");
const axios = require("axios");

router.get("/export/:id", async (req, res) => {

  console.log("=================================");
  console.log("PDF route hit");
  console.log("Audit ID:", req.params.id);
  console.log("=================================");

  try {

    const { id } = req.params;

    const sql =
      "SELECT * FROM audits WHERE id = ?";

    const [results] =
      await db.query(sql, [id]);

    console.log("Query completed");
    console.log("Rows:", results.length);

    if (results.length === 0) {

      console.log("Audit not found");

      return res.status(404).json({
        message: "Audit not found",
      });
    }

    const audit = results[0];

    console.log("Audit loaded");

    let checklist = [];

    try {

      checklist =
        typeof audit.checklist === "string"
          ? JSON.parse(audit.checklist)
          : audit.checklist;

      if (!Array.isArray(checklist)) {
        checklist = [];
      }

    } catch (err) {

      console.log(
        "Checklist parse error:",
        err.message
      );

      checklist = [];
    }

    console.log("Checklist parsed");
    console.log(
      "Equipment count:",
      checklist.length
    );

    console.log("Creating PDF");

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

    async function getImageBuffer(url){

  const response =
    await axios.get(url,{
      responseType:"arraybuffer"
    });

  return Buffer.from(
    response.data,
    "binary"
  );
}

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

    console.log(
      "Starting checklist loop"
    );

    // =====================
    // CHECKLIST
    // =====================

    for (const [equipmentIndex, item] of checklist.entries()) {

  doc
    .fontSize(16)
    .fillColor("#2563eb")
    .text(
      `${equipmentIndex + 1}. ${item.equipment}`
    );

  doc.moveDown();

  if (!item.inspections) continue;

  for (const [inspectionIndex, inspection] of item.inspections.entries()) {

    if (doc.y > 650) {
      doc.addPage();
    }

    if (inspection.image) {

      try {

        const imageBuffer =
          await getImageBuffer(
            inspection.image
          );

        doc.image(
          imageBuffer,
          {
            fit: [200, 150]
          }
        );

      } catch (err) {

        console.log(
          "Image error:",
          err.message
        );

      }
    }

    doc.moveDown(0.5);

    doc
      .fontSize(11)
      .fillColor("black")
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

  doc.moveDown();
}

    console.log("Ending PDF");

    doc.end();

    console.log(
      "PDF finished successfully"
    );

  } catch (error) {

    console.log(
      "PDF ERROR:"
    );

    console.log(error);

    res.status(500).json({
      message:
        "PDF generation failed",
      error:
        error.message,
    });
  }
});

module.exports = router;