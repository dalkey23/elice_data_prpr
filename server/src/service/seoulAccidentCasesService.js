const { seoulAccidentCasesDAO } = require("../data-access");

const seoulAccidentCasesService = {
  async getSeoulAccidentCases() {
    const seoulAccidentCases = await seoulAccidentCasesDAO.findAll();
    return seoulAccidentCases;
  },
};

module.exports = seoulAccidentCasesService;
