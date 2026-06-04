const express = require("express");
const router = express.Router();
const db = require("../config/db");
const PDFDocument = require("pdfkit-table");

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
      `attachment; filename=APR_${id}.pdf`
    );

    doc.pipe(res);

    // =========================
    // TITLE
    // =========================

    doc
      .fontSize(20)
      .text(
        "TABLEAU APR INDUSTRIEL",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(12)
      .text(
        `Zone : ${report.zone || "N/A"}`
      );

    doc.moveDown();

    console.log(
      "Creating APR table"
    );

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
        "Residual"

      ],

      rows: data.map((row) => [

        row.bloc || "",
        row.installation || "",
        row.operation || "",
        row.product || "",
        row.central_event || "",
        row.possible_causes || "",
        row.dangerous_phenomenon || "",
        row.consequences || "",
        row.existing_measures || "",
        row.initial_risk || "",
        row.residual_risk || ""

      ])
    };

    await doc.table(table, {

      width: 1100,

      prepareHeader: () => {

        doc
          .font("Helvetica-Bold")
          .fontSize(8);

      },

      prepareRow: () => {

        doc
          .font("Helvetica")
          .fontSize(7);

      }

    });

    console.log(
      "APR table generated"
    );

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