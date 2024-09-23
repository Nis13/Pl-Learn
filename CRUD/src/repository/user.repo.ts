import { ENTITY_NAME } from "../constants/entity";
import { ENTITY_DELETED } from "../constants/exceptionMessage";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
import { User as UserEntity } from "../entities/user.entity";
import AppDataSource from "../typeORMfile";

const UserRepo = AppDataSource.getRepository(UserEntity);

export async function getAll(): Promise<UserEntity[]> {
  return await UserRepo.find({
    relations: {
      profile: true,
    },
  });
}

export async function getById(id: string): Promise<UserEntity | null> {
  return await UserRepo.findOneBy({ id: id });
}

export async function create(
  userDetails: Partial<UserEntity>
): Promise<UserEntity> {
  const { name, email, ...userProfile } = userDetails;
  const userToCreate = {
    name: name,
    email: email,
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
  return await UserRepo.findOneBy({ id: id });
}

export async function deleteById(id: string): Promise<string> {
  await UserRepo.delete(id);
  return ENTITY_DELETED(ENTITY_NAME.USER, id);
}
