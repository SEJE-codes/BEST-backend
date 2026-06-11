const express = require("express");
const router = express.Router();

const PDFDocument = require("pdfkit");
const db = require("../config/db");

const fs = require("fs");
const path = require("path");

// ======================================================
// PDF FOLDER
// ======================================================

const pdfFolder = path.join(__dirname, "..", "uploads", "apr");

if (!fs.existsSync(pdfFolder)) {
  fs.mkdirSync(pdfFolder, { recursive: true });
}

// ======================================================
// CONFIG
// ======================================================

const HEADER_HEIGHT = 35;

// ======================================================
// COLUMNS
// ======================================================

const columns = [
  { key: "bloc", title: "Bloc", width: 60 },
  { key: "installation", title: "Installation", width: 95 },
  { key: "operation", title: "Opération", width: 110 },
  { key: "product", title: "Produit", width: 90 },
  { key: "central_event", title: "Évènement", width: 120 },
  { key: "possible_causes", title: "Causes", width: 150 },
  { key: "dangerous_phenomenon", title: "Phénomène", width: 120 },
  { key: "consequences", title: "Conséquences", width: 150 },
  { key: "initial_color", title: "Risque", width: 70 },
  { key: "existing_measures", title: "Mesures Existantes", width: 190 },
  { key: "residual_color", title: "Risque Résiduel", width: 70 },
  { key: "scenario", title: "Scénario", width: 80 },
];

// ======================================================
// RISK COLOR
// ======================================================

function getRiskColor(color) {
  if (!color) return "#FFFFFF";

  switch (String(color).toUpperCase().trim()) {
    case "GREEN":
      return "#00B050";
    case "YELLOW":
      return "#FFFF00";
    case "ORANGE":
      return "#ED7D31";
    case "RED":
      return "#FF0000";
    default:
      return "#FFFFFF";
  }
}

// ======================================================
// CLEAN TEXT
// ======================================================

function cleanText(text) {
  if (!text) return "";
  return String(text).replace(/\t/g, " ").replace(/\r/g, "").trim();
}

// ======================================================
// ROW HEIGHT
// ======================================================

function calculateRowHeight(doc, row) {
  let maxHeight = 40;

  columns.forEach((column) => {
    if (column.key === "initial_color" || column.key === "residual_color") return;

    const value = cleanText(row?.[column.key]);

    const textHeight = doc.heightOfString(value, {
      width: column.width - 8,
      align: "left",
    });

    maxHeight = Math.max(maxHeight, textHeight);
  });

  return maxHeight + 12;
}

// ======================================================
// HEADER
// ======================================================

function drawHeader(doc, startX, startY) {
  let x = startX;

  doc.font("Helvetica-Bold").fontSize(8);

  columns.forEach((column) => {
    doc.rect(x, startY, column.width, HEADER_HEIGHT).stroke();

    doc.text(column.title, x + 3, startY + 10, {
      width: column.width - 6,
      align: "center",
    });

    x += column.width;
  });

  return startY + HEADER_HEIGHT;
}

// ======================================================
// ROW
// ======================================================

function drawRow(doc, row, startX, startY, rowHeight) {
  let x = startX;

  doc.font("Helvetica").fontSize(7);

  columns.forEach((column) => {
    const cellX = x;
    const cellY = startY;

    const value = cleanText(row?.[column.key]);

    // COLOR CELLS
    if (column.key === "initial_color" || column.key === "residual_color") {
      const color = getRiskColor(value);

      doc.fillColor(color).rect(cellX, cellY, column.width, rowHeight).fill();

      doc.strokeColor("black").rect(cellX, cellY, column.width, rowHeight).stroke();

      x += column.width;
      return;
    }

    // NORMAL CELL
    doc
      .strokeColor("black")
      .rect(cellX, cellY, column.width, rowHeight)
      .stroke();

    doc.fillColor("black").text(value, cellX + 4, cellY + 4, {
      width: column.width - 8,
      align: column.key === "scenario" ? "center" : "left",
    });

    x += column.width;
  });
}

// ======================================================
// PAGE BREAK
// ======================================================

function checkPageBreak(doc, currentY, rowHeight) {
  return currentY + rowHeight > doc.page.height - 40;
}

// ======================================================
// NEW PAGE
// ======================================================

function addPageWithHeader(doc, startX) {
  doc.addPage();
  return drawHeader(doc, startX, 20);
}

// ======================================================
// ROUTE
// ======================================================

router.get("/generate/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [reports] = await db.query(
      "SELECT * FROM apr_reports WHERE id=?",
      [id]
    );

    if (!reports.length) {
      return res.status(404).json({ message: "Report not found" });
    }

    const report = reports[0];

    const tableData =
      typeof report.data === "string"
        ? JSON.parse(report.data)
        : report.data;

    const doc = new PDFDocument({
      size: "A3",
      layout: "landscape",
      margin: 15,
    });

    const buffers = [];
    doc.on("data", (chunk) => buffers.push(chunk));

    // TITLE
    doc.font("Helvetica-Bold").fontSize(16);
    doc.text(`APR REPORT - ${report.zone}`, { align: "center" });
    doc.moveDown();

    const startX = 15;
    let currentY = 60;

    currentY = drawHeader(doc, startX, currentY);

    for (const row of tableData) {
      const rowHeight = calculateRowHeight(doc, row);

      if (checkPageBreak(doc, currentY, rowHeight)) {
        currentY = addPageWithHeader(doc, startX);
      }

      drawRow(doc, row, startX, currentY, rowHeight);
      currentY += rowHeight;
    }

    doc.end();

    // SAVE FILE AFTER FINISH
    doc.on("end", async () => {
      try {
        const pdfBuffer = Buffer.concat(buffers);

        const fileName = `APR_${id}.pdf`;
        const filePath = path.join(pdfFolder, fileName);

        fs.writeFileSync(filePath, pdfBuffer);

        const pdfUrl = `https://best-backend-1.onrender.com/uploads/apr/${fileName}`;

        await db.query(
          "UPDATE apr_reports SET pdf_url = ? WHERE id = ?",
          [pdfUrl, id]
        );

        res.json({
          message: "PDF generated successfully",
          pdf_url: pdfUrl,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "PDF saving failed" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "PDF generation failed" });
  }
});

module.exports = router;