import { Equal } from "typeorm";
import { ENTITY_NAME } from "../constants/entityName";
import {
  ENTITY_DELETED,
  ENTITY_NOT_FOUND,
} from "../constants/exceptionMessage";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
import { User } from "../entities/user.entity";
import { NotFoundError } from "../error/NotFoundError";
import AppDataSource from "../typeORMfile";
import { Profile } from "../entities/profile.entity";

const UserRepo = AppDataSource.getRepository(User);

export async function getAll(): Promise<User[]> {
  return await UserRepo.find();
}

export async function getById(id: string): Promise<User | null> {
  return await UserRepo.findOne({ where: { id: Equal(id) } });
}

export async function getByEmail(email: string): Promise<User | null> {
  return await UserRepo.findOne({ where: { email: Equal(email) } });
}

export async function create(userDetails: Partial<User>): Promise<User> {
  const { name, email, password, role, ...userProfile } = userDetails;
  return await AppDataSource.transaction(async (transactionalEntityManager) => {
    const userToCreate = {
      name,
      email,
      password,
      role,
    };
    const createdUser = transactionalEntityManager.create(User, userToCreate);
    const savedUser = await transactionalEntityManager.save(User, createdUser);
    const userProfileToCreate = {
      ...userProfile,
      user: savedUser,
    };
    const createdUserProfile = transactionalEntityManager.create(
      Profile,
      userProfileToCreate
    );
    await transactionalEntityManager.save(Profile, createdUserProfile);
    return savedUser;
  });
}

export async function updateById(
  id: string,
  updateUserDetails: UpdateUserDTO
): Promise<User | null> {
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
