const { seoulCarAndPeoCasesDAO } = require("../data-access");

const seoulCarAndPeoCasesService = {
  async getSeoulCarAndPeoCases() {
    const seoulCarAndPeoCases = await seoulCarAndPeoCasesDAO.findAll();
    return seoulCarAndPeoCases;
  },
};

module.exports = seoulCarAndPeoCasesService;
