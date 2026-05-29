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

// POST IMAGE
router.post(
  "/",
  upload.single("image"),
  (req, res) => {

    res.json({
      image: req.file.filename,
    });
  }
);

module.exports = router;