import { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
  user?: JWTPayload;
}

export interface JWTPayload {
  id?: string;
  role?: string;
}
