const { teenagerTimeAccidentService } = require("../service");
const util = require("../misc/util");

const teenagerTimeAccidentController = {
  async getTeenagerTimeAccident(req, res, next) {
    try {
      const { by_time, death_toll, number_of_injured } = req.query;
      const teenagerTimeAccident =
        await teenagerTimeAccidentService.getTeenagerTimeAccident({
          by_time,
          death_toll,
          number_of_injured,
        });
      res.json(util.buildResponse(teenagerTimeAccident));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = teenagerTimeAccidentController;
