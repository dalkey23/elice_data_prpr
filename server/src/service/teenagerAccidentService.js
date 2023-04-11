const { teenagerAccidentDAO } = require("../data-access");

const teenagerAccidentService = {
  async getTeenagerAccident() {
    const teenagerAccident = await teenagerAccidentDAO.findAll();
    return teenagerAccident;
  },
};

module.exports = teenagerAccidentService;
