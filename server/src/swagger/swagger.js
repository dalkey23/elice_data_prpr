const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    openapi: "3.0.3",
    info: {
      title: "파릇파릇",
      version: "1.0.0",
      description:
        "청소년 교통사고 취약 지역을 대상으로 교통 봉사 모임의 모집을 중개해주는 서비스",
    },
    servers: [
      {
        url: "http://localhost:3000", //요청 url
      },
    ],
  },
  apis: ["src/**/**/*.js"], //Swagger 파일 연동
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
