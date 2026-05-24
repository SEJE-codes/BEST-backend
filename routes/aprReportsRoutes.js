const express = require("express");
const router = express.Router();
const db = require("../config/db");

// =========================
// GET ALL REPORTS
// =========================
router.get("/", (req, res) => {
  const sql =
    "SELECT * FROM apr_reports ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// =========================
// GET SINGLE REPORT (VIEW)
// =========================
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM apr_reports WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.json(results[0]);
  });
});

// =========================
// DELETE REPORT
// =========================
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM apr_reports WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Delete failed",
      });
    }

    res.json({
      message: "Report deleted successfully",
    });
  });
});

// =========================
// UPDATE REPORT (EDIT)
// =========================
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const sql =
    "UPDATE apr_reports SET data = ? WHERE id = ?";

  db.query(
    sql,
    [JSON.stringify(data), id],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Update failed",
        });
      }

      res.json({
        message: "Report updated successfully",
      });
    }
  );
});

module.exports = router;