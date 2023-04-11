const { carAndPeoDAO } = require("../data-access");

const carAndPeoService = {
  async getCarAndPeo() {
    const carAndPeo = await carAndPeoDAO.findAll();
    return carAndPeo;
  },
};

module.exports = carAndPeoService;
