const { TeenagerAccident } = require("./model");

const teenagerAccidentDAO = {
  async findAll() {
    const plainTeenagerAccidenet = await TeenagerAccident.find().lean();
    return plainTeenagerAccidenet;
  },
};

module.exports = teenagerAccidentDAO;
