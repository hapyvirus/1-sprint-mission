import { ErrorRequestHandler, RequestHandler } from "express";
import BadRequestError from "../lib/error/BadReqestError";

export const defaultNotFoundHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  res.status(404).send({ message: "해당 경로를 찾을 수 없습니다." });
};

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  if (err instanceof BadRequestError) {
    res.status(400).send({ message: err.message });
  }

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ message: "휴요하지 않은 JSON 입니다." });
  }

  if (err.code) {
    console.log(err);
    res.status(500).send({ message: "데이터 생성이 실패하였습니다." });
  } else err;
  console.log(err);
  res.status(500).send({ message: "서버에 문제가 발생했습니다." });
  next(err);
};
