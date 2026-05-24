const db = require("../config/db");

// ========================================
// CREATE AUDIT
// ========================================

const createAudit = (
  req,
  res
) => {

  const {
    company_name,
    inspector_name,
    audit_date,
    checklist,
  } = req.body;

  // =========================
  // VALIDATION
  // =========================

  if (
    !company_name ||
    !inspector_name ||
    !checklist
  ) {

    return res.status(400).json({
      message:
        "Missing required fields",
    });
  }

  // =========================
  // SAVE
  // =========================

  const sql = `
INSERT INTO audits
(
company_name,
inspector_name,
audit_date,
checklist
)
VALUES (?, ?, ?, ?)
`;

  db.query(
    sql,
    [
      company_name,
      inspector_name,
      audit_date,
      JSON.stringify(checklist),
    ],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message:
            "Database save failed",
        });
      }

      res.status(201).json({
        message:
          "Audit saved successfully",

        auditId:
          result.insertId,
      });
    }
  );
};

// ========================================
// GET AUDITS
// ========================================

const getAudits = (
  req,
  res
) => {

  const sql =
    "SELECT * FROM audits ORDER BY id DESC";

  db.query(
    sql,
    (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message:
            "Failed to fetch audits",
        });
      }

      // =========================
      // SAFE JSON PARSE
      // =========================

      const formatted =
        results.map(
          (audit) => ({

            ...audit,

            checklist:
              typeof audit.checklist ===
              "string"
                ? JSON.parse(
                    audit.checklist
                  )
                : audit.checklist,
          })
        );

      res.json(formatted);
    }
  );
};

// ========================================
// DELETE AUDIT
// ========================================

const deleteAudit = (
  req,
  res
) => {

  const { id } =
    req.params;

  const sql =
    "DELETE FROM audits WHERE id = ?";

  db.query(
    sql,
    [id],
    (err) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message:
            "Delete failed",
        });
      }

      res.json({
        message:
          "Audit deleted successfully",
      });
    }
  );
};

// ========================================

module.exports = {

  createAudit,

  getAudits,

  deleteAudit,

};