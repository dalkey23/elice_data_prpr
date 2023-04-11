const { User } = require("./model");
const util = require("../misc/util");

const userDAO = {
  // 회원가입
  async create({ name, email, password, address, phoneNumber, nickname }) {
    const user = await User.create({
      name,
      email,
      password,
      address,
      phoneNumber,
      nickname,
    });
    return user;
  },

  // 단일 사용자 조회
  async findOne(filter) {
    const sanitizedFilter = util.sanitizeObject({
      _id: filter.id,
      name: filter.name,
      email: filter.email,
      address: filter.address,
      phoneNumber: filter.phoneNumber,
      nickname: filter.nickname,
      userType: filter.userType,
    });
    const plainUser = await User.findOne(sanitizedFilter).lean();
    return plainUser;
  },

  // 모든 사용자 조회
  async findAll(page, perPage) {
    const [total, users] = await Promise.all([
      User.countDocuments({}),
      User.find()
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { users, total, totalPage };
  },

  // 사용자 정보 수정
  async updateOne(id, toUpdate) {
    // 의도치 않은 값이 저장되지 않도록 소독 
    const sanitizedToUpdate = util.sanitizeObject({
      name: toUpdate.name, 
      email: toUpdate.email,
      password: toUpdate.password,
      address: toUpdate.address, 
      phoneNumber: toUpdate.phoneNumber, 
      nickname: toUpdate.nickname, 
      profileImage: toUpdate.profileImage, 
      userType: toUpdate.userType,
    });
    const user = await User.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true,
        new: true
      }
    ).lean();
    return user;
  },

  // 사용자 정보 삭제
  async deleteOne(id) {
    const user = await User.findByIdAndDelete(id).lean();
    return user;
  },
};

module.exports = userDAO;
