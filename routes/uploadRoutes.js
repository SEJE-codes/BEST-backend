const express = require("express");

const router = express.Router();

const multer = require("multer");

const cloudinary =
  require("../config/cloudinary");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const storage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder: "qshe-audits",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
      ],
    },
  });

const upload =
  multer({ storage });

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      res.json({
        image:
          req.file.path,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Upload failed",
      });
    }
  }
);

module.exports = router;