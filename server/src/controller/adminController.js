const { userService } = require("../service");
const util = require("../misc/util");

const adminController = {
  async getUserslist(req, res, next) {
    // 현재 페이지 번호
    const page = Number(req.query.page ?? 1);
    // 페이지 당 불러올 회원 수
    const perPage = Number(req.query.perPage ?? 10);

    const { sanitzedUsers, total, totalPage } = await userService.getAllUsers(page, perPage);
    res.json(util.buildResponse({
      page: page,
      perPage: perPage,
      totalPage: totalPage,
      userCount: total,
      users: sanitzedUsers
    }));
  },

  async updateUser(req, res, next) {
    try{
      const { id } = req.params;
      const { userType } = req.body;
      const user = await userService.updateUser(id, { userType });
      res.json(util.buildResponse(user));
    } catch(error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try{
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      res.json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch(error) {
      next(error);
    }
  },
};

module.exports = adminController;
