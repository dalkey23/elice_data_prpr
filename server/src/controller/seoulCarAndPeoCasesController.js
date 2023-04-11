const { seoulCarAndPeoCasesService } = require("../service");
const util = require("../misc/util");

const seoulCarAndPeoCasesController = {
  async getSeoulCarAndPeoCases(req, res, next) {
    try {
      const { borough, latitude, longitudem, number_of_cases } = req.query;
      const seoulCarAndPeoCases =
        await seoulCarAndPeoCasesService.getSeoulCarAndPeoCases({
          borough,
          latitude,
          longitudem,
          number_of_cases,
        });
      res.json(util.buildResponse(seoulCarAndPeoCases));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = seoulCarAndPeoCasesController;
