const express = require("express");
const {
  ageTimeAccidentController,
  allAccidentTypeController,
  carAndPeoController,
  seoulAccidentCasesController,
  seoulCarAndPeoCasesController,
  seoulTeenagerAccidentController,
  teenagerAccidentController,
  teenagerTimeAccidentController,
} = require("../controller");

const dataRouter = express.Router();

// 모든 연령층별 시간대별 사상자
dataRouter.get(
  "/age_time_accident",
  ageTimeAccidentController.getAgeTimeAccident
);
// 사고 유형별 교통사고
dataRouter.get(
  "/all_accident_type",
  allAccidentTypeController.getAllAccidentType
);
// 차대사람 교통사고
dataRouter.get("/car_and_peo", carAndPeoController.getCarAndPeo);
// 서울시 교통사고 유형별 발생건수
dataRouter.get(
  "/seoul_acciden_cases",
  seoulAccidentCasesController.getSeoulAccidentCases
);
// 서울시 차대 사람 교통사고 유형별 발생건수
dataRouter.get(
  "/seoul_car_and_peo_cases",
  seoulCarAndPeoCasesController.getSeoulCarAndPeoCases
);
// 서울시 20세 이하 교통사고
dataRouter.get(
  "/seoul_teenager_accident",
  seoulTeenagerAccidentController.getSeoulTeenagerAccident
);
// 20대 이하 교통사고 사망자 비율
dataRouter.get(
  "/teenager_accidenet",
  teenagerAccidentController.getTeenagerAccident
);
// 20대 이하 시간대별 사상자
dataRouter.get(
  "/teenager_time_accident",
  teenagerTimeAccidentController.getTeenagerTimeAccident
);

module.exports = dataRouter;
