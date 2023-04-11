const { SeoulAccidentCases } = require("./model");

const seoulAccidentCasesDAO = {
  async findAll() {
    const plainSeoulAccidentCases = await SeoulAccidentCases.find().lean();
    return plainSeoulAccidentCases;
  },
};

module.exports = seoulAccidentCasesDAO;
