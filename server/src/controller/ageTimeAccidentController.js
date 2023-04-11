const { ageTimeAccidentService } = require("../service");
const util = require("../misc/util");

const ageTimeAccidentController = {
  async getAgeTimeAccident(req, res, next) {
    try {
      const { by_time, death_toll, number_of_injured } = req.query;
      const ageTimeAccident = await ageTimeAccidentService.getAgeTimeAccident({
        by_time,
        death_toll,
        number_of_injured,
      });
      res.json(util.buildResponse(ageTimeAccident));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ageTimeAccidentController;
