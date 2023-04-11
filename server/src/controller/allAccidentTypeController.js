const { allAccidentTypeService } = require("../service");
const util = require("../misc/util");

const allAccidentTypeController = {
  async getAllAccidentType(req, res, next) {
    try {
      const { accident_type, death_toll, number_of_injured } = req.query;
      const allAccidentType = await allAccidentTypeService.getAllAccidentType({
        accident_type,
        death_toll,
        number_of_injured,
      });
      res.json(util.buildResponse(allAccidentType));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = allAccidentTypeController;
