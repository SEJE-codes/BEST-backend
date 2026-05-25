const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/auditRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const auditPdfRoutes = require("./routes/auditPdfRoute");

const app = express();

// ======================================
// CORS CONFIGURATION
// ======================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://best-digital-platform.vercel.app",
    ],

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    credentials: true,
  })
);

// ======================================
// BODY PARSER
// ======================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================
// STATIC FOLDERS
// ======================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ======================================
// API ROUTES
// ======================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/audits",
  auditRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);

app.use(
  "/api/pdf",
  auditPdfRoutes
);

// ======================================
// TEST ROUTE
// ======================================

app.get("/", (req, res) => {
  res.json({
    message:
      "BEST Backend API Running Successfully",
  });
});

// ======================================
// 404 ROUTE
// ======================================

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ======================================
// SERVER
// ======================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});