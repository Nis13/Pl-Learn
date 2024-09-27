import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import * as AuthService from "../services/auth.service";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  try {
    const data = await AuthService.login(body);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
