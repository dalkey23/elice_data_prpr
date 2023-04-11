const { ageTimeAccidentDAO } = require("../data-access");

const ageTimeAccidentService = {
  async getAgeTimeAccident() {
    const ageTimeAccident = await ageTimeAccidentDAO.findAll();
    return ageTimeAccident;
  },
};

module.exports = ageTimeAccidentService;
