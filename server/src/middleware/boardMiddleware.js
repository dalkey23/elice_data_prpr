const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { boardService } = require("../service");

const checkCompleteBoardFrom = (from) => (req, res, next) => {
  const { title, content, author } = req[from];
  if (title === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: title은 필수값입니다.`
      )
    );
  }
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

const checkBoardIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkMinBoardConditionFrom = (from) => (req, res, next) => {
  const { title, content, image } = req[from];
  if (title === undefined && content === undefined && image === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: title, content, image 중 최소 하나는 필요합니다.`
      )
    );
  }
  next();
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

const checkBoard = (from) => async (req, res, next) => {
  const { boardId } = req[from];
  const existRecruitment = await boardService.getBoard(boardId);
  console.log(existRecruitment.board);

  if (!existRecruitment.board) {
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
  checkCompleteBoardFrom,
  checkBoardIdFrom,
  checkMinBoardConditionFrom,
  checkCommentFrom,
  checkCommentIdFrom,
  checkBoard,
};
