const express = require("express");
const imageUploader = require("../middleware/imageMiddleware");


const imageRouter = express.Router();

imageRouter.post("/upload", imageUploader.single("image"), (req, res) => {
    const image = req.file.location;
    if(image === undefined){
        return res.status(400).send("이미지가 존재하지 않습니다.")
    }
    res.status(200).send({
        message : "요청성공",
        image : image
    })
  });


  module.exports = imageRouter;