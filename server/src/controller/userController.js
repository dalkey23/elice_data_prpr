const { userService } = require("../service");
const util = require("../misc/util");

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      const { name, email, password, address, phoneNumber, nickname } = req.body;

      const user = await userService.createUser({
        name,
        email,
        password,
        address,
        phoneNumber,
        nickname,
      });
      res.status(201).json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 수정
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        password,
        address,
        phoneNumber,
        nickname,
        profileImage,
      } = req.body;

      const user = await userService.updateUser(id, {
        name,
        email,
        password,
        address,
        phoneNumber,
        nickname,
        profileImage,
      });
      res.json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 사용자 정보 조회
  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);
      res.json(util.buildResponse(user));
    } catch(error) {
      next(error);
    }
  },

  // 사용자 정보 삭제 (회원 탈퇴)
  async deleteUser(req, res, next) {
    try{
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      res.clearCookie('accessToken').json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch(error) {
      next(error);
    }
  },
};

module.exports = userController;
