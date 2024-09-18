import cors from "cors";
import { NextFunction, Request, Response } from "express";

const corsOptions = {
  origin: "http://localhost:3000",
};

export const corsMiddleware = cors(corsOptions);

//응답을 가로채서 응답에 문자열을 추가하는 미들웨어
export const helloWorldMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  // res.send를 재정의하여 응답에 문자열을 추가
  res.send = function (body) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (typeof body === "string") {
        body += " hello world!";
      }
    }
    // 원래 res.send 호출하고 this는 res를 가리키므로 call 메서드를 사용하여 this를 명시적으로 지정
    return originalSend.call(this, body);
  };
  // 다음 미들웨어로 이동
  next();
};
