const { allAccidentTypeDAO } = require("../data-access");

const allAccidentTypeService = {
  async getAllAccidentType() {
    const allAccidentType = await allAccidentTypeDAO.findAll();
    return allAccidentType;
  },
};

module.exports = allAccidentTypeService;
