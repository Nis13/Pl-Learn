/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const validationMiddleware =
  (validationSchema: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const transformedClass = plainToInstance(validationSchema, req.body);
    const result = await validate(transformedClass, {
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    });
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        ...result,
      });
    }
    next();
  };
