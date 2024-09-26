import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import HttpStatusCodes from "http-status-codes";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("Error");

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(error.message);
  if (error instanceof BadRequestError) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
  if (error instanceof NotFoundError) {
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ message: error.message });
  }
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: error.message });
}
