const db = require("../config/db");

// ========================================
// CREATE AUDIT
// ========================================

const createAudit = async (
  req,
  res
) => {

  try {

    const {
      company_name,
      inspector_name,
      audit_date,
      checklist,
    } = req.body;

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

    const [result] =
      await db.query(
        sql,
        [
          company_name,
          inspector_name,
          audit_date,
          JSON.stringify(checklist),
        ]
      );

    res.status(201).json({
      message:
        "Audit saved successfully",

      auditId:
        result.insertId,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Database save failed",
    });
  }
};

// ========================================
// GET AUDITS
// ========================================

const getAudits = async (
  req,
  res
) => {

  try {

    const sql =
      "SELECT * FROM audits ORDER BY id DESC";

    const [results] =
      await db.query(sql);

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

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Failed to fetch audits",
    });
  }
};

// ========================================
// DELETE AUDIT
// ========================================

const deleteAudit = async (
  req,
  res
) => {

  try {

    const { id } =
      req.params;

    const sql =
      "DELETE FROM audits WHERE id = ?";

    await db.query(
      sql,
      [id]
    );

    res.json({
      message:
        "Audit deleted successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:
        "Delete failed",
    });
  }
};

// ========================================

module.exports = {

  createAudit,

  getAudits,

  deleteAudit,

};