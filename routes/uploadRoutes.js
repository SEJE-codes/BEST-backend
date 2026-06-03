const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      const result =
        await new Promise(
          (resolve, reject) => {

            cloudinary.uploader.upload_stream(
              {
                folder: "best-audits",
              },

              (error, result) => {

                if (error)
                  reject(error);

                else
                  resolve(result);
              }
            ).end(
              req.file.buffer
            );
          }
        );

      res.json({
        image:
          result.secure_url,
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