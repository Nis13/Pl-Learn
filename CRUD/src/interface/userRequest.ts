import { Request } from "express";

export interface UserRequest extends Request {
  user?: JWTPayload;
}

export interface JWTPayload {
  id?: string;
  role?: string;
}
