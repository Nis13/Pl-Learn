import { NotFoundError } from "../error/NotFoundError";
import * as UserRepo from "../repository/user.repo";
import { User as UserEntity } from "../entities/user.entity";
import loggerWithNameSpace from "../utilis/logger";
import { CreateUserDTO } from "../DTO/createUser.dto";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
import {
  ENTITY_NOT_FOUND,
  NO_ENTITIES_FOUND,
} from "../constants/exceptionMessage";
import { ENTITY_NAME } from "../constants/entityName";
import bcrypt from "bcrypt";

const logger = loggerWithNameSpace(`${ENTITY_NAME.USER}Service`);

/**
 * function to get all users from repo to service
 *
 * @export
 * @async
 * @returns {Promise<UserEntity[]>}
 */
export async function getAll(): Promise<UserEntity[]> {
  logger.info("Fetching all users");
  const users = await UserRepo.getAll();
  if (users.length == 0) {
    logger.warn(NO_ENTITIES_FOUND(ENTITY_NAME.USER));
    throw new NotFoundError(NO_ENTITIES_FOUND(ENTITY_NAME.USER));
  }
  return users;
}

export async function getById(id: string): Promise<UserEntity> {
  logger.info(`Fetching user with ID: ${id}`);
  const user = await UserRepo.getById(id);
  if (!user) {
    logger.error(ENTITY_NOT_FOUND(ENTITY_NAME.USER, id));
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.USER, id));
  }
  return user;
}

export async function getByEmail(email: string): Promise<UserEntity> {
  logger.info(`Fetching ${ENTITY_NAME.USER} with email: ${email}`);
  const user = await UserRepo.getByEmail(email);
  if (!user) {
    logger.error(ENTITY_NOT_FOUND(ENTITY_NAME.USER, email));
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.USER, email));
  }
  return user;
}

export async function create(userDetail: CreateUserDTO): Promise<UserEntity> {
  logger.info(
    `Creating a new ${ENTITY_NAME.USER} with email: ${userDetail.email}`
  );
  const password = await bcrypt.hash(userDetail.password, 10);
  userDetail.password = password;
  return UserRepo.create(userDetail);
}

export async function updateById(
  id: string,
  userDetail: UpdateUserDTO
): Promise<UserEntity | null> {
  logger.info(`Updating ${ENTITY_NAME.USER} with ID: ${id}`);
  await getById(id);
  return UserRepo.updateById(id, userDetail);
}

export async function deleteById(id: string): Promise<string> {
  logger.info(`Deleting ${ENTITY_NAME.USER} with ID: ${id}`);
  return UserRepo.deleteById(id);
}
