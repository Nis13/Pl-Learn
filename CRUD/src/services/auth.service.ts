import bcrypt from "bcrypt";
import { loginDTO } from "../DTO/login.dto";
import * as UserRepo from "./user.service";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { LOGIN_MESSAGE, NOT_VALID } from "../constants/exceptionMessage";
import { sign } from "jsonwebtoken";
import config from "../config";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("AuthService");

export async function login(loginCredential: loginDTO) {
  logger.info(`Calling login service with email ${loginCredential.email}`);
  const existingUser = await UserRepo.getByEmail(loginCredential.email);
  const isValidPassword = await bcrypt.compare(
    loginCredential.password,
    existingUser.password
  );
  if (!isValidPassword) {
    logger.info("Password doesnot match");
    throw new UnauthenticatedError(NOT_VALID("Password"));
  }

  const payload = {
    id: existingUser.id,
    email: existingUser.email,
  };
  const accessToken = sign(payload, config.jwt.secret);

  return {
    message: LOGIN_MESSAGE(),
    accessToken,
  };
}
