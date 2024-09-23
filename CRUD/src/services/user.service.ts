import { NotFoundError } from "../error/NotFoundError";
import * as UserRepo from "../repository/user.repo";
import { User as UserEntity } from "../entities/user.entity";
import loggerWithNameSpace from "../utilis/logger";
import { CreateUserDTO } from "../DTO/createUser.dto";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
import { ENTITY_NOT_FOUND, NO_ENTITIES_FOUND } from "../constants/Exception";

const logger = loggerWithNameSpace("UserService");

/**
 * function to get all users from repo to service
 *
 * @export
 * @async
 * @returns {Promise<UserEntity[]>}
 */
export async function getAllService(): Promise<UserEntity[]> {
  logger.info("called getAllUsers By Service");
  const users = await UserRepo.getAll();
  if (users.length == 0) {
    logger.warn(NO_ENTITIES_FOUND("User"));
    throw new NotFoundError(NO_ENTITIES_FOUND("User"));
  }
  return users;
}

export async function getByIdService(id: string): Promise<UserEntity> {
  logger.info(`Called getUserByID By Service to get user of ID : ${id}`);
  const user = await UserRepo.getById(id);
  if (!user) {
    logger.error(ENTITY_NOT_FOUND("User", id));
    throw new NotFoundError(ENTITY_NOT_FOUND("User", id));
  }
  return user;
}

export function createService(userDetail: CreateUserDTO): Promise<UserEntity> {
  logger.info(`Called createUser By Service with email ${userDetail.email}`);
  return UserRepo.create(userDetail);
}

export async function updateByIdService(
  id: string,
  userDetail: UpdateUserDTO
): Promise<UserEntity | null> {
  logger.info(`Called updateUser By Service to update user with ID: ${id}`);
  await getByIdService(id);
  return UserRepo.updateById(id, userDetail);
}

export async function deleteService(id: string): Promise<string> {
  logger.info(`Called deleteUser By Service to delete user of ID: ${id}`);
  await getByIdService(id);
  return UserRepo.deleteById(id);
}
