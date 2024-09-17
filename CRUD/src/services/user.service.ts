import { NO_USERS_MESSAGE, USER_NOT_FOUND } from "../constants/returnmessage";
import { NotFoundError } from "../error/NotFoundError";
import { User, UserUpdateInfo } from "../interface/user.interface";
import * as UserRepo from "../repository/repo.user";

export async function getAllService(): Promise<User[]> {
  const users = await UserRepo.getAll();
  if (users.length == 0) throw new NotFoundError(NO_USERS_MESSAGE());
  return users;
}

export async function getByIdService(id: string): Promise<User> {
  const user = await UserRepo.getById(id);
  if (!user) throw new NotFoundError(USER_NOT_FOUND(id));
  return user;
}

export function createService(userDetail: User): Promise<User> {
  return UserRepo.create(userDetail);
}

export async function updateByIdService(
  id: string,
  userDetail: UserUpdateInfo
): Promise<User | null> {
  await getByIdService(id);
  return UserRepo.updateById(id, userDetail);
}

export async function deleteService(id: string): Promise<string> {
  await getByIdService(id);
  return UserRepo.deleteById(id);
}
