const express = require("express");
const router = express.Router();
const db = require("../config/db");
const PDFDocument = require("pdfkit");

router.get("/export/:id", async (req, res) => {

  console.log("=================================");
  console.log("APR PDF route hit");
  console.log("Report ID:", req.params.id);
  console.log("=================================");

  try {

    const { id } = req.params;

    const sql =
      "SELECT * FROM apr_reports WHERE id = ?";

    const [results] =
      await db.query(sql, [id]);

    console.log("Query completed");
    console.log("Rows:", results.length);

    if (results.length === 0) {

      console.log("APR report not found");

      return res.status(404).json({
        message: "Report not found",
      });
    }

    const report = results[0];

    console.log("APR report loaded");

    let data = [];

    try {

      data =
        typeof report.data === "string"
          ? JSON.parse(report.data)
          : report.data;

      if (!Array.isArray(data)) {
        data = [];
      }

    } catch (err) {

      console.log(
        "JSON parse error:",
        err.message
      );

      data = [];
    }

    console.log(
      "Rows in APR:",
      data.length
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
      `attachment; filename=APR_${id}.pdf`
    );

    doc.pipe(res);

    // =========================
    // HEADER
    // =========================

    doc
      .fontSize(22)
      .text(
        "APR REPORT",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(12)
      .text(
        `Zone: ${report.zone || "N/A"}`
      );

    doc.moveDown(2);

    console.log(
      "Starting APR rows loop"
    );

    // =========================
    // ROWS
    // =========================

    data.forEach(
      (row, index) => {

        console.log(
          "APR row:",
          index + 1
        );

        if (doc.y > 700) {
          doc.addPage();
        }

        doc
          .fontSize(14)
          .text(
            `Row ${index + 1}`
          );

        doc
          .fontSize(10)
          .text(
            `Bloc: ${row.zone || ""}`
          );

        doc.text(
          `Installation: ${row.installation || ""}`
        );

        doc.text(
          `Operation: ${row.operation || ""}`
        );

        doc.text(
          `Produit: ${row.product || ""}`
        );

        doc.text(
          `Evenement: ${row.central_event || ""}`
        );

        doc.text(
          `Causes: ${row.possible_causes || ""}`
        );

        doc.text(
          `Phenomenes: ${row.dangerous_phenomenon || ""}`
        );

        doc.text(
          `Consequences: ${row.consequences || ""}`
        );

        doc.text(
          `Mesures: ${row.existing_measures || ""}`
        );

        doc.text(
          `Initial Risk: ${row.initial_risk || ""}`
        );

        doc.text(
          `Residual Risk: ${row.residual_risk || ""}`
        );

        doc.moveDown(2);
      }
    );

    console.log("Ending APR PDF");

    doc.end();

    console.log(
      "APR PDF finished successfully"
    );

  } catch (error) {

    console.log(
      "APR PDF ERROR:"
    );

    console.log(error);

    res.status(500).json({
      message:
        "APR PDF generation failed",
      error:
        error.message,
    });
  }
});

module.exports = router;