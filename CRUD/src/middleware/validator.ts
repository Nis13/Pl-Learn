/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { validationPipe } from "../utilis/validation";

export const validationMiddleware =
  (validationSchema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await validationPipe(validationSchema, {
      ...req.body,
      ...req.params,
    });
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        ...result,
      });
    }
    next();
  };
