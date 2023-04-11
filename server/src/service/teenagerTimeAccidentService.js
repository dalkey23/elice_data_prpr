const { teenagerTimeAccidentDAO } = require("../data-access");

const teenagerTimeAccidentService = {
  async getTeenagerTimeAccident() {
    const teenagerTimeAccident = await teenagerTimeAccidentDAO.findAll();
    return teenagerTimeAccident;
  },
};

module.exports = teenagerTimeAccidentService;
