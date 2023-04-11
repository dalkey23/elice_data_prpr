const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const Joi = require("joi");

//이름은 최소 2자, 최대 10자, 한글, 영문으로 구성
const namePattern = "^[가-힣a-zA-Z]{2,10}$";
// 이메일
const emailPattern =
  "^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$";
// 비밀번호는 최소 8자, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자로 구성
const passwordPattern = "^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$";
// 휴대폰 번호는 2 or 3자리 숫자 - 3 or 4자리 숫자 - 4자리 숫자로 구성
const phoneNumberPattern = "^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$";
// 닉네임은 최소 2자 최대 10자, 한글, 알파벳 대소문자 (a~z, A~Z), 숫자(0~9)로 구성
const nicknamePattern = "^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,10}$";

// 회원가입 스키마
const joinSchema = Joi.object().keys({
  name: Joi.string().pattern(new RegExp(namePattern)).required(),
  email: Joi.string().pattern(new RegExp(emailPattern)).required().messages({
    "string.base": "Email은 문자열이어야 합니다.",
    "any.required": "Email을 입력해주세요.",
    "string.pattern.base": "Email이 형식에 맞지 않습니다.",
  }),
  password: Joi.string().pattern(new RegExp(passwordPattern)).required().messages({
    "string.base": "비밀번호는 문자열이어야 합니다.",
    "any.required": "비밀번호를 입력해주세요.",
    "string.pattern.base": "비밀번호가 형식에 맞지 않습니다.",
  }),
  address: Joi.string().min(1).max(30).required(),
  phoneNumber: Joi.string().pattern(new RegExp(phoneNumberPattern)).required().messages({
    "string.base": "전화번호는 문자열이어야 합니다.",
    "any.required": "전화번호를 입력해주세요.",
    "string.pattern.base": "전화번호가 형식에 맞지 않습니다.",
  }),
  nickname: Joi.string().pattern(new RegExp(nicknamePattern)).required().messages({
    "string.base": "닉네임은 문자열이어야 합니다.",
    "any.required": "닉네임을 입력해주세요.",
    "string.pattern.base": "닉네임이 형식에 맞지 않습니다.",
  }),
});

// 사용자 스키마
const userSchema = Joi.object().keys({
  name: Joi.string().pattern(new RegExp(namePattern)),
  email: Joi.string().pattern(new RegExp(emailPattern)).messages({
    "string.base": "Email은 문자열이어야 합니다.",
    "any.required": "Email을 입력해주세요.",
    "string.pattern.base": "Email이 형식에 맞지 않습니다.",
  }),
  password: Joi.string().pattern(new RegExp(passwordPattern)).messages({
    "string.base": "비밀번호는 문자열이어야 합니다.",
    "any.required": "비밀번호를 입력해주세요.",
    "string.pattern.base": "비밀번호가 형식에 맞지 않습니다.",
  }),
  address: Joi.string().min(1).max(30),
  phoneNumber: Joi.string().pattern(new RegExp(phoneNumberPattern)).messages({
    "string.base": "전화번호는 문자열이어야 합니다.",
    "any.required": "전화번호를 입력해주세요.",
    "string.pattern.base": "전화번호가 형식에 맞지 않습니다.",
  }),
  nickname: Joi.string().pattern(new RegExp(nicknamePattern)).messages({
    "string.base": "닉네임은 문자열이어야 합니다.",
    "any.required": "닉네임을 입력해주세요.",
    "string.pattern.base": "닉네임이 형식에 맞지 않습니다.",
  }),
});

// 회원가입 유효성 검사
const checkJoinFrom = (from) => async (req, res, next) => {
  const {
    name,
    email,
    password,
    address,
    phoneNumber,
    nickname,
  } = req[from];

  try {
    await joinSchema.validateAsync({
      name,
      email,
      password,
      address,
      phoneNumber,
      nickname,
    });
    next();
  } catch(error){
    next(new AppError(
        commonErrors.inputError,
        400,
        `${error}`
    ))
  }
};

// params에 id 값 유무 검사
const checkUserIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  if(id === ":id") {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: id는 필수값입니다.`
        )
    );
    return;
  }
  next();
};

// 사용자 정보 유효성 검사
const checkUserInfoFrom = (from) => async (req, res, next) => {
  const {
    name,
    email,
    password,
    address,
    phoneNumber,
    nickname,
  } = req[from];
  try {
    await userSchema.validateAsync({
      name,
      email,
      password,
      address,
      phoneNumber,
      nickname,
    });
    next();
  } catch(error){
    next(new AppError(
        commonErrors.inputError,
        400,
        `${error}`
    ))
  }
};

module.exports = {
  checkJoinFrom,
  checkUserIdFrom,
  checkUserInfoFrom,
};
