const { SeoulCarAndPeoCases } = require("./model");

const seoulCarAndPeoCasesDAO = {
  async findAll() {
    const plainSeoulCarAndPeoCases = await SeoulCarAndPeoCases.find().lean();
    return plainSeoulCarAndPeoCases;
  },
};

module.exports = seoulCarAndPeoCasesDAO;
