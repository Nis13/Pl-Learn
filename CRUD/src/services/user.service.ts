import { User } from "../interface/user.interface";
import { createUser, deleteUserById, getAllUsersModel, getUserById, updateUser } from "../model/model.user";

export function getAllUsersService(){
    return getAllUsersModel();
}

export function getUserByIdService(id:number){
    return getUserById(id);
}

export function createUserService(userDetail: Pick<User, 'name'|'email'>){
    return createUser(userDetail);
}

export function updateUserService(id:number,userDetail: Pick<User, 'name'|'email'>){
    return updateUser(id,userDetail);
}

export function deleteUserService(id:number){
    return deleteUserById(id);
}