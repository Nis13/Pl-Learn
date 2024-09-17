import { NotFoundError } from "../error/NotFoundError";
import { User } from "../interface/user.interface";
import { createUser, deleteUserById, getAllUsersModel, getUserById, updateUser } from "../model/model.user";

export async function getAllUsersService(): Promise<User[]>{
    const users = await getAllUsersModel();
    if (users.length == 0) throw(new NotFoundError("No Users are available"));
    return users;
}

export async function getUserByIdService(id:number): Promise<User>{
    const user = await getUserById(id);
    if (!user) throw(new NotFoundError(`User of id ${id} not found`));
    return user;
}

export function createUserService(userDetail: Pick<User, 'name'|'email'>): Promise<User>{
    return createUser(userDetail);
}

export async function updateUserService(id:number,userDetail: Pick<User, 'name'|'email'>): Promise<User|null>{
    const user = await getUserById(id);
    if (!user) throw(new NotFoundError(`User of id ${id} not found`));
    return updateUser(id,userDetail);
}

export async function deleteUserService(id:number): Promise<string>{
    const user = await getUserById(id);
    if (!user) throw(new NotFoundError(`User of id ${id} not found`));
    return deleteUserById(id);
}