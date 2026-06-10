const express = require("express");
const router = express.Router();

const PDFDocument = require("pdfkit");
const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// ===============================
// FOLDER PDF
// ===============================
const pdfFolder = path.join(__dirname, "..", "uploads", "apr");

if (!fs.existsSync(pdfFolder)) {
  fs.mkdirSync(pdfFolder, { recursive: true });
}

// ===============================
// COLORS
// ===============================
function getRiskColor(risk) {
  if (!risk) return "#FFFFFF";

  const value = String(risk).toLowerCase();

  if (value.includes("green") || value.includes("vert")) return "#00B050";
  if (value.includes("yellow") || value.includes("jaune")) return "#FFFF00";
  if (value.includes("orange")) return "#ED7D31";
  if (value.includes("red") || value.includes("rouge")) return "#FF0000";

  return "#FFFFFF";
}

// ===============================
// WRAP TEXT
// ===============================
function wrapText(doc, text, width) {
  return doc.widthOfString(text) > width
    ? text.toString()
    : text;
}

// ===============================
// ROUTE
// ===============================
router.get("/generate/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [reports] = await db.query(
      "SELECT * FROM apr_reports WHERE id=?",
      [id]
    );

    if (reports.length === 0) {
      return res.status(404).json({ message: "Report not found" });
    }

    const report = reports[0];

    const tableData =
      typeof report.data === "string"
        ? JSON.parse(report.data)
        : report.data;

    // ===============================
    // PDF CONFIG
    // ===============================
    const doc = new PDFDocument({
      size: "A3",
      layout: "landscape",
      margin: 20,
    });

    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));

    const pageWidth = doc.page.width;
    const startX = 20;

    const tableWidth = pageWidth - 40;

    doc.fontSize(16).text(
      `APR REPORT - ${report.zone}`,
      { align: "center" }
    );

    doc.moveDown(1);

    // ===============================
    // HEADERS
    // ===============================
    const headers = [
      "Bloc",
      "Installation",
      "Opération",
      "Produit",
      "Évènement",
      "Causes",
      "Phénomène",
      "Conséquences",
      "Risque",
      "Mesures",
      "Risque Résiduel",
      "Scénario",
    ];

    const colWidths = [
      60, 90, 100, 90, 120,
      140, 120, 140, 70, 180, 90, 80
    ];

    function drawHeader(y) {
      let x = startX;

      doc.font("Helvetica-Bold").fontSize(8);

      headers.forEach((h, i) => {
        doc.rect(x, y, colWidths[i], 25).stroke();
        doc.text(h, x + 2, y + 8, {
          width: colWidths[i] - 4,
          align: "center",
        });
        x += colWidths[i];
      });

      return y + 25;
    }

    function drawRow(row, y) {
      let x = startX;
      let maxHeight = 30;

      const values = [
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
        row.scenario || "",
      ];

      doc.font("Helvetica").fontSize(7);

      values.forEach((val, i) => {
        const text = String(val).replace(/\n/g, " ");

        const height = doc.heightOfString(text, {
          width: colWidths[i] - 4,
        }) + 10;

        if (height > maxHeight) maxHeight = height;

        // RISK COLOR CELLS
        if (i === 8 || i === 10) {
          doc
            .fillColor(getRiskColor(text))
            .rect(x, y, colWidths[i], height)
            .fill();
          doc.fillColor("black");
        }

        doc.rect(x, y, colWidths[i], height).stroke();

        doc.text(text, x + 2, y + 5, {
          width: colWidths[i] - 4,
        });

        x += colWidths[i];
      });

      return y + maxHeight;
    }

    // ===============================
    // TABLE RENDER
    // ===============================
    let y = 80;

    y = drawHeader(y);

    for (let i = 0; i < tableData.length; i++) {
      if (y > doc.page.height - 60) {
        doc.addPage();
        y = 40;
        y = drawHeader(y);
      }

      y = drawRow(tableData[i], y);
    }

    doc.end();

    // ===============================
    // SAVE
    // ===============================
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      const fileName = `APR_${id}.pdf`;
      const filePath = path.join(pdfFolder, fileName);

      fs.writeFileSync(filePath, pdfBuffer);

      const pdfUrl =
        `https://best-backend-1.onrender.com/uploads/apr/${fileName}`;

      await db.query(
        "UPDATE apr_reports SET pdf_url=? WHERE id=?",
        [pdfUrl, id]
      );

      res.json({
        message: "PDF generated successfully",
        pdf_url: pdfUrl,
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "PDF generation failed",
    });
  }
});

module.exports = router;