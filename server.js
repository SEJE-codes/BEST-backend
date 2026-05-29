const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const uploadsPath =
  path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, {
    recursive: true,
  });
}

const authRoutes = require("./routes/authRoutes");
const auditRoutes = require("./routes/auditRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const auditPdfRoutes = require("./routes/auditPdfRoutes");
const aiAprRoutes = require("./routes/aiAprRoutes");

const app = express();

// ======================================
// CORS CONFIGURATION
// ======================================

const allowedOrigins = [
  "https://best-digital-platform.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: [
    "https://best-digital-platform.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));
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

// ROUTE
app.use(
  "/api/upload",
  uploadRoutes
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
  "/api/pdf",
  auditPdfRoutes
);

app.use(
  "/api/ai",
  aiAprRoutes
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

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, {
    recursive: true,
  });
}
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