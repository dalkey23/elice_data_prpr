const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const s3 = require("../data-access/s3");

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "prprtest",
    acl: "public-read-write",
    key: (req, file, callback) => {
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong Extension"));
      }
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = imageUploader;
