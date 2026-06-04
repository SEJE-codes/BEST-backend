const express = require("express");
const router = express.Router();
const db = require("../config/db");
const puppeteer = require("puppeteer");

router.get("/export/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const [results] =
      await db.query(
        "SELECT * FROM apr_reports WHERE id = ?",
        [id]
      );

    if (results.length === 0) {

      return res.status(404).json({
        message: "Report not found"
      });
    }

    const report = results[0];

    const data =
      typeof report.data === "string"
        ? JSON.parse(report.data)
        : report.data;

    const browser =
      await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox"
        ]
      });

    const page =
      await browser.newPage();

    const rows =
      data.map(row => {

        return `
          <tr>

            <td>${row.bloc || ""}</td>

            <td>${row.installation || ""}</td>

            <td>${row.operation || ""}</td>

            <td>${row.product || ""}</td>

            <td>${row.central_event || ""}</td>

            <td>${row.possible_causes || ""}</td>

            <td>${row.dangerous_phenomenon || ""}</td>

            <td>${row.consequences || ""}</td>

            <td>${row.initial_risk || ""}</td>

            <td>${row.existing_measures || ""}</td>

            <td
              style="
                background:${getColor(
                  row.residual_color
                )};
              "
            >
            </td>

            <td>${row.scenario || ""}</td>

          </tr>
        `;
      }).join("");

    const html = `

      <html>

      <head>

      <style>

      body{
        font-family:Arial;
        font-size:10px;
      }

      h1{
        text-align:center;
      }

      table{

        width:100%;
        border-collapse:collapse;

      }

      th{

        background:#e6dcc0;

      }

      td,th{

        border:1px solid black;
        padding:5px;
        vertical-align:top;

      }

      .risk{
        width:30px;
      }

      </style>

      </head>

      <body>

      <h1>
        TABLEAU APR INDUSTRIEL
      </h1>

      <table>

      <thead>

      <tr>

        <th>N°</th>
        <th>Installation</th>
        <th>Opérations</th>
        <th>Produit</th>
        <th>Évènement</th>
        <th>Causes</th>
        <th>Phénomène</th>
        <th>Conséquences</th>
        <th>Risque</th>
        <th>Mesures existantes</th>
        <th>Rr</th>
        <th>Scénario</th>

      </tr>

      </thead>

      <tbody>

      ${rows}

      </tbody>

      </table>

      </body>

      </html>

    `;

    await page.setContent(html, {
      waitUntil: "networkidle0"
    });

    const pdf =
      await page.pdf({

        format: "A3",

        landscape: true,

        printBackground: true

      });

    await browser.close();

    res.set({
      "Content-Type":
        "application/pdf",

      "Content-Disposition":
        `attachment; filename=APR_${id}.pdf`
    });

    res.send(pdf);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "PDF generation failed"
    });
  }
});

function getColor(color) {

  switch (
    String(color).toUpperCase()
  ) {

    case "GREEN":
      return "#00b050";

    case "YELLOW":
      return "#ffff00";

    case "ORANGE":
      return "#ffc000";

    case "RED":
      return "#ff0000";

    default:
      return "white";
  }
}

module.exports = router;