const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const schema = Joi.object({
  recruitmentId: JoiObjectId().required(),
  participantId: JoiObjectId(),
});

const checkCompleteParticipantsFrom = (from) => async (req, res, next) => {
  const { recruitmentId, participantId } = req[from];
  try {
    await schema.validateAsync({
      recruitmentId,
      participantId,
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
  const { recruitmentId } = req[from];
  try {
    if (recruitmentId === undefined) {
      throw new AppError(
        commonErrors.inputError,
        400,
        `${from}: recruitmentId값은 필수값입니다.`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkMinParticipantIdConditionFrom = (from) => (req, res, next) => {
  const { recruitmentId, participantId } = req[from];
  try {
    if (recruitmentId === undefined && participantId === undefined) {
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

module.exports = {
  checkCompleteParticipantsFrom,
  checkRecruitmentIdFrom,
  checkMinParticipantIdConditionFrom,
};
