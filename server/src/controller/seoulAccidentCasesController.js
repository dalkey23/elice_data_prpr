const { seoulAccidentCasesService } = require("../service");
const util = require("../misc/util");

const seoulAccidentCasesController = {
  async getSeoulAccidentCases(req, res, next) {
    try {
      const { borough, latitude, longitudem, number_of_cases } = req.query;
      const seoulAccidentCases =
        await seoulAccidentCasesService.getSeoulAccidentCases({
          borough,
          latitude,
          longitudem,
          number_of_cases,
        });
      res.json(util.buildResponse(seoulAccidentCases));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = seoulAccidentCasesController;
