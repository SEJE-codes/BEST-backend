const express = require("express");
const multer = require("multer");

const router = express.Router();

// STORAGE

const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(null, "uploads/");
  },

  filename: function (
    req,
    file,
    cb
  ) {

    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },

});

const upload =
  multer({ storage });

// UPLOAD IMAGE

router.post(
  "/",
  upload.single("image"),
  (req, res) => {

    // VERY IMPORTANT

    const imagePath =
      `uploads/${req.file.filename}`;

    res.json({
      image: imagePath,
    });
  }
);

module.exports = router;