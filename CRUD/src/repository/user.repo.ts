import { Equal } from "typeorm";
import { ENTITY_NAME } from "../constants/entityName";
import {
  ENTITY_DELETED,
  ENTITY_NOT_FOUND,
} from "../constants/exceptionMessage";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
import { User as UserEntity } from "../entities/user.entity";
import { NotFoundError } from "../error/NotFoundError";
import AppDataSource from "../typeORMfile";

const UserRepo = AppDataSource.getRepository(UserEntity);

export async function getAll(): Promise<UserEntity[]> {
  return await UserRepo.find();
}

export async function getById(id: string): Promise<UserEntity | null> {
  return await UserRepo.findOne({ where: { id: Equal(id) } });
}

export async function getByEmail(email: string): Promise<UserEntity | null> {
  return await UserRepo.findOne({ where: { email: Equal(email) } });
}

export async function create(
  userDetails: Partial<UserEntity>
): Promise<UserEntity> {
  const { name, email, password, role, ...userProfile } = userDetails;
  const userToCreate = {
    name: name,
    email: email,
    password: password,
    role: role,
    profile: userProfile,
  };
  const createdUser = UserRepo.create(userToCreate);
  return await UserRepo.save(createdUser);
}

export async function updateById(
  id: string,
  updateUserDetails: UpdateUserDTO
): Promise<UserEntity | null> {
  await UserRepo.update(id, updateUserDetails);
  return await UserRepo.findOne({ where: { id: Equal(id) } });
}

export async function deleteById(id: string): Promise<string> {
  const result = await UserRepo.delete(id);
  if (result.affected == 0) {
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.USER, id));
  }
  return ENTITY_DELETED(ENTITY_NAME.USER, id);
}
