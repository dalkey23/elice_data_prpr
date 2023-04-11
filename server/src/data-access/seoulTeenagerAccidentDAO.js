const { SeoulTeenagerAccident } = require("./model");

const seoulTeenagerAccidentDAO = {
  async findAll() {
    const plainSeoulTeenagerAccident =
      await SeoulTeenagerAccident.find().lean();
    return plainSeoulTeenagerAccident;
  },
};

module.exports = seoulTeenagerAccidentDAO;
