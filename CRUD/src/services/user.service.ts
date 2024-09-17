import{ User } from"../interface/user.interface";
import{ createUser, deleteUserById, getAllUsersModel, getUserById, updateUser } from"../model/model.user";

export function getAllUsersService(): Promise<User[]>{
    return getAllUsersModel();
}

export function getUserByIdService(id:number): Promise<User | null>{
    return getUserById(id);
}

export function createUserService(userDetail: User): Promise<User>{
    return createUser(userDetail);
}

export async function updateUserService(id:number,userDetail: Pick<User, 'name'|'email'>): Promise<User|null>{
    await getUserById(id);
    return updateUser(id,userDetail);
}

export function deleteUserService(id:number): Promise<string>{
    return deleteUserById(id);
}