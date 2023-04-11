const express = require("express");
const boardRouter = require("./boardRouter");
const myRouter = require("./myRouter");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");
const recruitmentRouter = require("./recruitmentRouter");
const dataRouter = require("./dataRouter");
const imageRouter = require("./imageRouter");

const v1Router = express.Router();
// const cors = require("cors");
// v1Router.use(cors());
v1Router.use("/board", boardRouter);
v1Router.use("/my", myRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/recruitment", recruitmentRouter);
v1Router.use("/data", dataRouter);
v1Router.use("/image", imageRouter);

module.exports = {
  v1: v1Router,
};
