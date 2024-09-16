import { User as UserEntity } from "../entities/user";
import { User } from "../interface/user.interface";
import AppDataSource from "../typeORMfile";
import loggerWithNameSpace from "../utilis/logger";

const UserRepo = AppDataSource.getRepository(UserEntity);
const logger = loggerWithNameSpace("UserModel");

export async function getAllUsersModel(): Promise<User[]>{
    logger.info("called getAllUsers By Model");
    const allUsers = await UserRepo.find();
    return allUsers;
}

export async function getUserById(id:number): Promise<User|null>{
    logger.info("called getUserByID By Model");
    const userDetail = await UserRepo.findOneBy({id:id});
    return userDetail;
}

export async function createUser(userDetails: Pick<User, 'name'|'email'>):Promise<User>{
    logger.info("called createUser By Model");
    const userInserted = await UserRepo.save(userDetails);
    return userInserted;
}

export async function updateUser(id:number,updateUserDetails: Partial<User>): Promise<User|null>{
    logger.info("called updateUser By Model");
    await UserRepo.update(id, updateUserDetails);
    return await UserRepo.findOneBy({id:id});
}

export async function deleteUserById(id:number): Promise<string>{
    logger.info("called deleteUser By Model");
    await UserRepo.delete(id);
    return "user Successfully deleted";
}

