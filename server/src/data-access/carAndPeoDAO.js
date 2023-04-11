const { CarAndPeo } = require("./model");

const carAndPeoDAO = {
  async findAll() {
    const plainCarAndPeo = await CarAndPeo.find().lean();
    return plainCarAndPeo;
  },
};

module.exports = carAndPeoDAO;
