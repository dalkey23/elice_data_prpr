const jwt = require("jsonwebtoken");
const util = require("../misc/util");

const authController = {
  async login(req, res, next) {
    const accessToken = jwt.sign(req.user, process.env.SECRET, { expiresIn: "1h" });
    res.cookie('accessToken', accessToken, { httpOnly: true }).json(req.user);
  },

  async logout(req, res, next) {
    try {
      req.logout(() => {
        if (!req.cookies['accessToken']){
          throw new Error("로그인된 상태가 아닙니다.");
        }
        res.clearCookie('accessToken')
        .status(200)
        .json(util.buildResponse(`로그아웃되었습니다.`));
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
