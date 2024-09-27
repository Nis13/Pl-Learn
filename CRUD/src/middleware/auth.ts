import { NextFunction, Response } from "express";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { Request } from "../interface/userRequest";

export function authorize(...roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthenticatedError("User is not authenticated");
      }
      const user = req.user!;
      if (!roles.includes(user.role!)) {
        throw new UnauthenticatedError("Not authorized");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
