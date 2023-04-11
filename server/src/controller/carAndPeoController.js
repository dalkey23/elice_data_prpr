const { carAndPeoService } = require("../service");
const util = require("../misc/util");

const carAndPeoController = {
  async getCarAndPeo(req, res, next) {
    try {
      const {
        accident_type2,
        number_of_accidents,
        death_toll,
        number_of_injured,
      } = req.query;
      const carAndPeo = await carAndPeoService.getCarAndPeo({
        accident_type2,
        number_of_accidents,
        death_toll,
        number_of_injured,
      });
      res.json(util.buildResponse(carAndPeo));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = carAndPeoController;
