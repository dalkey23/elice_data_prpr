const { teenagerAccidentService } = require("../service");
const util = require("../misc/util");

const teenagerAccidentController = {
  async getTeenagerAccident(req, res, next) {
    try {
      const { death_toll, accident_death } = req.query;
      const teenagerAccident =
        await teenagerAccidentService.getTeenagerAccident({
          death_toll,
          accident_death,
        });
      res.json(util.buildResponse(teenagerAccident));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = teenagerAccidentController;
