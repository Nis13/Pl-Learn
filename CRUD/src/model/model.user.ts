import { User as UserEntity } from "../entities/user";
import { User } from "../interface/user.interface";
import AppDataSource from "../typeORMfile";

const UserRepo = AppDataSource.getRepository(UserEntity);

export async function getAllUsersModel(): Promise<User[]>{
    const allUsers = await UserRepo.find();
    return allUsers;
}

export async function getUserById(id:number): Promise<User|null>{
    const userDetail = await UserRepo.findOneBy({id:id});
    return userDetail;
}

export async function createUser(userDetails: Pick<User, 'name'|'email'>):Promise<User>{
    const userInserted = await UserRepo.save(userDetails);
    return userInserted;
}

export async function updateUser(id:number,updateUserDetails: Partial<User>): Promise<User|null>{
    await UserRepo.update(id, updateUserDetails);
    return await UserRepo.findOneBy({id:id});
}

export async function deleteUserById(id:number): Promise<string>{
    await UserRepo.delete(id);
    return "user Successfully deleted";
}

