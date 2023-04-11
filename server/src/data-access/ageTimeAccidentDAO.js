const { AgeTimeAccident } = require("./model");

const ageTimeAccidentDAO = {
  async findAll() {
    const plainAgeTimeAccident = await AgeTimeAccident.find().lean();
    return plainAgeTimeAccident;
  },
};

module.exports = ageTimeAccidentDAO;
