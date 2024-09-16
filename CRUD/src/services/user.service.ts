import { User } from "../interface/user.interface";
import { createUser, deleteUserById, getAllUsersModel, getUserById, updateUser } from "../model/model.user";

export function getAllUsersService(): User[]{
    return getAllUsersModel();
}

export function getUserByIdService(id:number): User | undefined{
    return getUserById(id);
}

export function createUserService(userDetail: Pick<User, 'name'|'email'>): string{
    return createUser(userDetail);
}

export function updateUserService(id:number,userDetail: Pick<User, 'name'|'email'>): User | undefined {
    getUserById(id);
    return updateUser(id,userDetail);
}

export function deleteUserService(id:number): string{
    return deleteUserById(id);
}