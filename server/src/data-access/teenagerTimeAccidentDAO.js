const { TeenagerTimeAccident } = require("./model");

const teenagerTimeAccidentDAO = {
  async findAll() {
    const plainTeenagerTimeAccident = await TeenagerTimeAccident.find().lean();
    return plainTeenagerTimeAccident;
  },
};

module.exports = teenagerTimeAccidentDAO;
