const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    const filename =
      Date.now() + ".jpg";

    const filepath =
      path.join(
        "uploads",
        filename
      );

    await sharp(req.file.buffer)
      .resize({
        width: 1200
      })
      .jpeg({
        quality: 70
      })
      .toFile(filepath);

    res.json({
      image: filename
    });
  }
);

module.exports = router;