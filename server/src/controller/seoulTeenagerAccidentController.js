const { seoulTeenagerAccidentService } = require("../service");
const util = require("../misc/util");

const seoulTeenagerAccidentController = {
  async getSeoulTeenagerAccident(req, res, next) {
    try {
      const { borough, latitude, longitudem, casualties } = req.query;
      const seoulTeenagerAccident =
        await seoulTeenagerAccidentService.getSeoulTeenagerAccident({
          borough,
          latitude,
          longitudem,
          casualties,
        });
      res.json(util.buildResponse(seoulTeenagerAccident));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = seoulTeenagerAccidentController;
