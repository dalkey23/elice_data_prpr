const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { recruitmentService } = require("../service");

const schema = Joi.object({
  borough: JoiObjectId().required(),
  title: Joi.string().required(),
  author: JoiObjectId(),
  comment: Joi.string(),
  volunteerTime: Joi.string().required(),
  recruitments: Joi.number().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
  address: Joi.string().required(),
  image: Joi.string().allow(""),
  meetingStatus: Joi.string(),
  participants: Joi.array().items(JoiObjectId()).default([]),
});

const checkCompleteRecruitmentFrom = (from) => async (req, res, next) => {
  const {
    borough,
    title,
    comment,
    volunteerTime,
    recruitments,
    content,
    image,
    address,
    category,
    meetingStatus,
    participants,
  } = req[from];
  try {
    await schema.validateAsync({
      borough,
      title,
      comment,
      volunteerTime,
      recruitments,
      content,
      image,
      address,
      category,
      meetingStatus,
      participants,
    });
    next();
  } catch (error) {
    const result = Object.entries(req[from]).reduce((map, [key, value]) => {
      map += `[${key} : ${value}] `;
      return map;
    }, "");
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${result}: 유효한 데이터 셋이 아닙니다.`
      )
    );
  }
};

const checkRecruitmentIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  try {
    if (id === undefined) {
      throw new AppError(
        commonErrors.inputError,
        400,
        `${from}: id는 필수값입니다.`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkMinRecruitmentConditionFrom = (from) => (req, res, next) => {
  const {
    borough,
    title,
    comment,
    volunteerTime,
    recruitments,
    content,
    author,
    image,
    address,
    category,
    meetingStatus,
    participation,
  } = req[from];
  try {
    if (
      borough === undefined &&
      title === undefined &&
      content === undefined &&
      author === undefined &&
      comment === undefined &&
      volunteerTime === undefined &&
      recruitments === undefined &&
      image === undefined &&
      address === undefined &&
      category === undefined &&
      meetingStatus === undefined &&
      participation === undefined
    ) {
      throw new AppError(
        commonErrors.inputError,
        400,
        `${from}: 값이 최소 하나는 필요합니다.`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkCommentFrom = (from) => (req, res, next) => {
  const { content } = req[from];
  if (content === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: content는 필수값입니다.`
      )
    );
  }
  next();
};

const checkCommentIdFrom = (from) => (req, res, next) => {
  const { commentId } = req[from];
  if (commentId === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: commentId는 필수값입니다.`
      )
    );
  }
  next();
};

const checkRecruitment = (from) => async (req, res, next) => {
  const { recruitmentId } = req[from];
  const existRecruitment = await recruitmentService.getRecruitment(
    recruitmentId
  );
  if (!existRecruitment.plainRecruitment) {
    next(
      new AppError(
        commonErrors.resourceNotFoundError,
        404,
        "게시글을 찾을 수 없습니다."
      )
    );
  }
  next();
};

module.exports = {
  checkCompleteRecruitmentFrom,
  checkRecruitmentIdFrom,
  checkMinRecruitmentConditionFrom,
  checkCommentFrom,
  checkCommentIdFrom,
  checkRecruitment,
};
