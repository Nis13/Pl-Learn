import { NotFoundError } from "../error/NotFoundError";
import { User } from "../interface/user.interface";
import { createUser, deleteUserById, getAllUsersModel, getUserById, updateUser } from "../model/model.user";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("UserService");
export async function getAllUsersService(): Promise<User[]>{
    logger.info("called getAllUsers By Service");
    const users = await getAllUsersModel();
    if (users.length == 0) throw(new NotFoundError("No Users are available"));
    return users;
}

export async function getUserByIdService(id:number): Promise<User>{
    logger.info("called getUserByID By Service");
    const user = await getUserById(id);
    if (!user) throw(new NotFoundError(`User of id ${id} not found`));
    return user;
}

export function createUserService(userDetail: Pick<User, 'name'|'email'>): Promise<User>{
    logger.info("called createUser By Service");
    return createUser(userDetail);
}

export async function updateUserService(id:number,userDetail: Pick<User, 'name'|'email'>): Promise<User|null>{
    logger.info("called updateUser By Service");
    const user = await getUserById(id);
    if (!user) throw(new NotFoundError(`User of id ${id} not found`));
    return updateUser(id,userDetail);
}

export async function deleteUserService(id:number): Promise<string>{
    logger.info("called deleteUser By Service");
    const user = await getUserById(id);
    if (!user) throw(new NotFoundError(`User of id ${id} not found`));
    return deleteUserById(id);
}