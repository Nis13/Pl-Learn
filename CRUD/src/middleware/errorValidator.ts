import { Request, Response } from "express";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import HttpStatusCodes from "http-status-codes";

export function errorHandler(error: Error, req: Request, res: Response) {
  if (error instanceof BadRequestError)
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  else if (error instanceof NotFoundError)
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({ message: error.message });
  else
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
}
