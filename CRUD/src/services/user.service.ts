import { NO_USERS_MESSAGE, USER_NOT_FOUND } from "../constants/EXCEPTIONERROR";
import { NotFoundError } from "../error/NotFoundError";
import { UserUpdateInfo } from "../interface/user.interface";
import * as UserRepo from "../repository/user.repo";
import { User as UserEntity } from "../entities/user.entity";
import loggerWithNameSpace from "../utilis/logger";
import { CreateUserDTO } from "../DTO/createUser.dto";

const logger = loggerWithNameSpace("UserService");

export async function getAllService(): Promise<UserEntity[]> {
  logger.info("called getAllUsers By Service");
  const users = await UserRepo.getAll();
  if (users.length == 0) throw new NotFoundError(NO_USERS_MESSAGE());
  return users;
}

export async function getByIdService(id: string): Promise<UserEntity> {
  logger.info("called getUserByID By Service");
  const user = await UserRepo.getById(id);
  if (!user) throw new NotFoundError(USER_NOT_FOUND(id));
  return user;
}

export function createService(userDetail: CreateUserDTO): Promise<UserEntity> {
  logger.info("called createUser By Service");
  return UserRepo.create(userDetail);
}

export async function updateByIdService(
  id: string,
  userDetail: UserUpdateInfo
): Promise<UserEntity | null> {
  logger.info("called updateUser By Service");
  await getByIdService(id);
  return UserRepo.updateById(id, userDetail);
}

export async function deleteService(id: string): Promise<string> {
  logger.info("called deleteUser By Service");
  await getByIdService(id);
  return UserRepo.deleteById(id);
}
