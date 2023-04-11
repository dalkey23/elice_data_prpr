const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { recruitmentService, boardService } = require("../service");
const util = require("../misc/util");

// 이메일
const emailPattern =
  "^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$";
// 비밀번호는 최소 8자, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자로 구성
const passwordPattern =
  "^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$";

// 로그인 스키마
const loginSchema = Joi.object().keys({
  email: Joi.string().pattern(new RegExp(emailPattern)).required().messages({
    "string.base": "Email은 문자열이어야 합니다.",
    "any.required": "Email을 입력해주세요.",
    "string.pattern.base": "Email이 형식에 맞지 않습니다.",
  }),
  password: Joi.string()
    .pattern(new RegExp(passwordPattern))
    .required()
    .messages({
      "string.base": "비밀번호는 문자열이어야 합니다.",
      "any.required": "비밀번호를 입력해주세요.",
      "string.pattern.base": "비밀번호가 형식에 맞지 않습니다.",
    }),
});

// 로그인 유효성 검사
const checkLoginFrom = (from) => async (req, res, next) => {
  const { email, password } = req[from];

  try {
    await loginSchema.validateAsync({
      email,
      password,
    });
    next();
  } catch (error) {
    next(new AppError(commonErrors.inputError, 400, `${error}`));
  }
};

// 로그인 시도 시, 이미 로그인된 사용자인지 확인(토큰이 있다면 토큰 유효 검증)
const existsToken = (req, res, next) => {
  try {
    // 토큰이 존재할 경우
    if (req.cookies.accessToken) {
      const user = jwt.verify(
        req.cookies.accessToken,
        process.env.SECRET,
        (err, decode) => {
          return decode;
        }
      );
      // 토큰이 유효한 경우
      if (user) {
        throw new AppError(
          commonErrors.authenticationError,
          400,
          "이미 로그인되어 있습니다."
        );
      }
    }
    next();
  } catch (error) {
    // 토큰이 만료된 경우
    if (error.name == "TokenExpiredError") {
      next(
        new AppError(
          commonErrors.authorizationError,
          401,
          "이전 로그인한 사용자의 토큰 유효기간이 만료되었습니다. 강제 로그아웃 해주세요."
        )
      );
    }
    next(error);
  }
};

// 로그인 상태인지 확인하고 토큰 안의 userId 반환
const verifyLogin = (req, res, next) => {
  try {
    // 토큰이 존재하지 않을 경우
    if (!req.cookies.accessToken) {
      throw new AppError(
        commonErrors.authenticationError,
        401,
        "토큰이 존재하지 않습니다."
      );
    }
    const user = jwt.verify(req.cookies.accessToken, process.env.SECRET);
    req.userId = user.id;
    next();
  } catch (error) {
    // 토큰이 만료된 경우
    if (error.name == "TokenExpiredError") {
      next(
        new AppError(
          commonErrors.authorizationError,
          401,
          "이전 로그인한 사용자의 토큰 유효기간이 만료되었습니다. 강제 로그아웃 해주세요."
        )
      );
    }
    next(error);
  }
};

// 토큰 유효 검증, 로그인된 사용자와 기능 접근 권한을 가진 사용자가 일치하는지 검사
const verifyAuthorizedUser = (from) => (req, res, next) => {
  try {
    // 접근하려는 기능의 권한을 가진 사용자 id
    const { id } = req[from];

    // 로그인한 사용자의 id
    const loginedUser = jwt.verify(
      req.cookies.accessToken,
      process.env.SECRET,
      (err, decoded) => {
        return decoded.id;
      }
    );

    // 각 사용자의 id 비교
    if (id !== loginedUser) {
      next(
        new AppError(
          commonErrors.authorizationError,
          403,
          "권한이 없는 사용자입니다."
        )
      );
    }
    next();
  } catch (error) {
    next(
      new AppError(
        commonErrors.authorizationError,
        401,
        "토큰이 유효하지 않습니다."
      )
    );
  }
};

// 토큰 유효 검증, 로그인된 사용자와 모집글 접근 권한을 가진 사용자(글 작성자)가 일치하는지 검사
const verifyRecuitmentUser = (from) => async (req, res, next) => {
  try {
    const { id } = req[from];
    // 접근하려는 기능의 권한을 가진 사용자 id
    const author = await recruitmentService.getRecruitment(id);

    // 로그인한 사용자의 id
    const loginedUser = jwt.verify(
      req.cookies.accessToken,
      process.env.SECRET,
      (err, decoded) => {
        return decoded.id;
      }
    );
    // 각 사용자의 id 비교
    if (
      JSON.stringify(author.plainRecruitment.author._id).replace(/"/g, "") !==
      loginedUser
    ) {
      next(
        new AppError(
          commonErrors.authorizationError,
          403,
          "권한이 없는 사용자입니다."
        )
      );
    }
    next();
  } catch (error) {
    console.dir(error);
    next(
      new AppError(
        commonErrors.authorizationError,
        401,
        "토큰이 유효하지 않거나 요청 id가 잘못되었습니다."
      )
    );
  }
};

// 토큰 유효 검증, 로그인된 사용자와 커뮤니티 글 접근 권한을 가진 사용자(글 작성자)가 일치하는지 검사
const verifyBoardUser = (from) => async (req, res, next) => {
  try {
    const { id } = req[from];
    // 접근하려는 기능의 권한을 가진 사용자 id
    const author = await boardService.getBoard(id);

    // 로그인한 사용자의 id
    const loginedUser = jwt.verify(
      req.cookies.accessToken,
      process.env.SECRET,
      (err, decoded) => {
        return decoded.id;
      }
    );
    // 각 사용자의 id 비교
    if (
      JSON.stringify(author.board.author._id).replace(/"/g, "") !== loginedUser
    ) {
      next(
        new AppError(
          commonErrors.authorizationError,
          403,
          "권한이 없는 사용자입니다."
        )
      );
    }
    next();
  } catch (error) {
    next(
      new AppError(
        commonErrors.authorizationError,
        401,
        "토큰이 유효하지 않습니다."
      )
    );
  }
};

// 토큰 유효 검증, 로그인된 사용자와 커뮤니티 글 접근 권한을 가진 사용자(글 작성자)가 일치하는지 검사
const verifyCommentUser = (from) => async (req, res, next) => {
  try {
    const { commentId } = req[from];
    // 접근하려는 기능의 권한을 가진 사용자 id
    const author = await boardService.getComment(commentId);

    // 로그인한 사용자의 id
    const loginedUser = jwt.verify(
      req.cookies.accessToken,
      process.env.SECRET,
      (err, decoded) => {
        return decoded.id;
      }
    );
    // 각 사용자의 id 비교
    if (JSON.stringify(author.writer).replace(/"/g, "") !== loginedUser) {
      next(
        new AppError(
          commonErrors.authorizationError,
          403,
          "권한이 없는 사용자입니다."
        )
      );
    }
    next();
  } catch (error) {
    next(
      new AppError(
        commonErrors.authorizationError,
        401,
        "토큰이 유효하지 않습니다."
      )
    );
  }
};

// 토큰 유효 검증, 관리자 계정인지 검사
const verifyAdmin = (req, res, next) => {
  try {
    const userType = jwt.verify(
      req.cookies.accessToken,
      process.env.SECRET,
      (err, decoded) => {
        return decoded.userType;
      }
    );

    if (userType !== "admin") {
      next(
        new AppError(
          commonErrors.authorizationError,
          403,
          "관리자만 사용 가능합니다."
        )
      );
    }
    next();
  } catch (error) {
    next(
      new AppError(
        commonErrors.authorizationError,
        401,
        "토큰이 유효하지 않습니다."
      )
    );
  }
};

module.exports = {
  checkLoginFrom,
  existsToken,
  verifyLogin,
  verifyAdmin,
  verifyAuthorizedUser,
  verifyRecuitmentUser,
  verifyBoardUser,
  verifyCommentUser,
};
