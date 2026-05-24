const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ========================
// MIDDLEWARE
// ========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// STATIC FILES (UPLOADS)
// ========================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// ========================
// ROUTES
// ========================
const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/auditRoutes");
const aiAprRoutes = require("./routes/aiAprRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const aprReportsRoutes = require("./routes/aprReportsRoutes");
const aprPdfRoutes = require("./routes/aprPdfRoutes");
const auditPdfRoutes =
  require("./routes/auditPdfRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/audits", auditRoutes);
app.use("/api/ai", aiAprRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/apr-reports", aprReportsRoutes);
app.use("/api/apr", aprPdfRoutes);
app.use(
  "/api/audit-pdf",
  auditPdfRoutes
);

// ========================
// HEALTH CHECK ROUTE (IMPORTANT)
// ========================
app.get("/", (req, res) => {
  res.send("QSHE API is running 🚀");
});

// ========================
// HANDLE UNKNOWN ROUTES
// ========================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ========================
// START SERVER
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // DEBUG JWT (VERY IMPORTANT FOR YOUR CURRENT ISSUE)
  console.log("JWT SECRET:", process.env.JWT_SECRET);
});