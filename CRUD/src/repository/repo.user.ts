import { USER_DELETE_MESSAGE } from "../constants/returnmessage";
import { User as UserEntity } from "../entities/user";
import { User } from "../interface/user.interface";
import AppDataSource from "../typeORMfile";

const UserRepo = AppDataSource.getRepository(UserEntity);

export async function getAll(): Promise<User[]> {
  const allUsers = await UserRepo.find();
  return allUsers;
}

export async function getById(id: string): Promise<User | null> {
  const userDetail = await UserRepo.findOneBy({ id: id });
  return userDetail;
}

export async function create(userDetails: User): Promise<User> {
  const userInserted = await UserRepo.save(userDetails);
  return userInserted;
}

export async function updateById(
  id: string,
  updateUserDetails: Partial<User>
): Promise<User | null> {
  await UserRepo.update(id, updateUserDetails);
  return await UserRepo.findOneBy({ id: id });
}

export async function deleteById(id: string): Promise<string> {
  await UserRepo.delete(id);
  return USER_DELETE_MESSAGE(id);
}
