const { AllAccidentType } = require("./model");

const allAccidentTypeDAO = {
  async findAll() {
    const plainAllAccidentType = await AllAccidentType.find().lean();
    return plainAllAccidentType;
  },
};

module.exports = allAccidentTypeDAO;
