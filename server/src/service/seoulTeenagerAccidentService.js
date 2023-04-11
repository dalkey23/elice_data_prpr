const { seoulTeenagerAccidentDAO } = require("../data-access");

const seoulTeenagerAccidentService = {
  async getSeoulTeenagerAccident() {
    const seoulTeenagerAccident = await seoulTeenagerAccidentDAO.findAll();
    return seoulTeenagerAccident;
  },
};

module.exports = seoulTeenagerAccidentService;
