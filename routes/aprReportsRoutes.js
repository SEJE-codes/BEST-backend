const express = require("express");
const router = express.Router();

const db = require("../config/db");

// =========================
// GET ALL REPORTS
// =========================

router.get("/", async (req, res) => {

  try {

    const [results] =
      await db.query(
        "SELECT * FROM apr_reports ORDER BY created_at DESC"
      );

    res.json(results);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch reports",
    });

  }

});

// =========================
// GET SINGLE REPORT
// =========================

router.get("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const [results] =
      await db.query(
        "SELECT * FROM apr_reports WHERE id=?",
        [id]
      );

    if (results.length === 0) {

      return res.status(404).json({
        message: "Report not found",
      });

    }

    res.json(results[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch report",
    });

  }

});

// =========================
// DELETE REPORT
// =========================

router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM apr_reports WHERE id=?",
      [id]
    );

    res.json({
      message: "Report deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });

  }

});

// =========================
// UPDATE REPORT
// =========================

router.put("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(

      "UPDATE apr_reports SET data=? WHERE id=?",

      [
        JSON.stringify(req.body.data),
        id,
      ]

    );

    res.json({
      message: "Report updated successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Update failed",
    });

  }

});

module.exports = router;