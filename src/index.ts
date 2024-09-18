import express from "express";
import { corsMiddleware, helloWorldMiddleware } from "./middlewares/middleware.js"; //node.js(require) 환경에서는 확장자를 생략해도 되지만 es6(import)로 변환하였으므로 확장자를 붙여주어야 한다.
import router from "./routes/route.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(corsMiddleware); //cors 정책을 적용하는 미들웨어
app.use(express.json()); //JSON 형식의 요청을 파싱할 수 있도록 설정
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 형식의 요청을 파싱할 수 있도록 설정
app.use(helloWorldMiddleware); //send 메서드를 재정의하여 응답에 문자열을 추가하는 미들웨어
app.use(router);

// 로깅 미들웨어
app.use((req, _res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.use((_req, res) => {
  res.status(404).json({ error: "존재하지 않는 요청입니다" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
