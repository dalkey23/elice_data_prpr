const { userDAO } = require("../data-access");
const util = require("../misc/util");
const bcrypt = require("bcrypt");

const userService = {
  async createUser({ name, email, password, address, phoneNumber, nickname }) {
    const existedEmail = await userDAO.findOne({ email });
    if (existedEmail) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const existedNickname = await userDAO.findOne({ nickname });
    if (existedNickname) {
      throw new Error("중복되는 닉네임입니다.");
    }
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userDAO.create({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      nickname,
    });
    return createdUser;
  },

  async getUser(id) {
    const user = await userDAO.findOne({ id });
    const servedUser = util.removePassword(user);
    return servedUser;
  },

  async getAllUsers(page, perPage) {
    const { users, total, totalPage } = await userDAO.findAll(page, perPage);
    const sanitzedUsers = users.map(object => util.removePassword(object));
    return { sanitzedUsers, total, totalPage };
  },

  async updateUser(
    id,
    { name, email, password, address, phoneNumber, nickname, profileImage, userType }
  ) {
    // email 수정하는 경우 이메일 중복 검사
    if (email !== undefined) {
      const existedEmail = await userDAO.findOne({ email });
      if (existedEmail) {
        throw new Error("이미 가입된 이메일입니다.");
      }
    }

    // nickname 수정하는 경우 닉네임 중복 검사
    if(nickname !== undefined) {
      const existedNickname = await userDAO.findOne({ nickname });
      if (existedNickname) {
        throw new Error("중복되는 닉네임입니다.");
      }
    }

    //userType 수정하는 경우 유효값 검사
    if(userType !== undefined){
      if(userType !== 'user' && userType !== 'admin') {
        throw new Error("userType은 user 혹은 admin만 가능합니다.");
      }
    }
    
    // password 수정하는 경우 해싱
    const hashedPassword = password !== undefined ? await bcrypt.hash(password, 10) : await Promise.resolve(undefined);

    const updatedUser = await userDAO.updateOne(id, {
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      nickname,
      profileImage,
      userType,
    });
    const servedUser = util.removePassword(updatedUser);
    return servedUser;
  },

  async deleteUser(id) {
    const deletedUser = await userDAO.deleteOne(id);
    if(!deletedUser) {
      throw new Error(`탈퇴할 사용자가 존재하지 않습니다.`);
    }
    return deletedUser;
  },
};

module.exports = userService;
