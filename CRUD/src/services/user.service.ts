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

const logger = loggerWithNameSpace("UserService");

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
    logger.warn(NO_ENTITIES_FOUND("User"));
    throw new NotFoundError(NO_ENTITIES_FOUND("User"));
  }
  return users;
}

export async function getById(id: string): Promise<UserEntity> {
  logger.info(`Fetching user with ID: ${id}`);
  const user = await UserRepo.getById(id);
  if (!user) {
    logger.error(ENTITY_NOT_FOUND("User", id));
    throw new NotFoundError(ENTITY_NOT_FOUND("User", id));
  }
  return user;
}

export function create(userDetail: CreateUserDTO): Promise<UserEntity> {
  logger.info(`Creating a new user with email: ${userDetail.email}`);
  return UserRepo.create(userDetail);
}

export async function updateById(
  id: string,
  userDetail: UpdateUserDTO
): Promise<UserEntity | null> {
  logger.info(`Updating user with ID: ${id}`);
  await getById(id);
  return UserRepo.updateById(id, userDetail);
}

export async function deleteById(id: string): Promise<string> {
  logger.info(`Deleting user with ID: ${id}`);
  await getById(id);
  return UserRepo.deleteById(id);
}
