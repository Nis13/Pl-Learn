import { NotFoundError } from "../error/NotFoundError";
import { User } from "../interface/user.interface";
import * as UserRepo from "../repository/repo.user";
import {v4 as uuidv4} from "uuid";


export async function getAllService(): Promise<User[]>{
    const users = await UserRepo.getAll();
    if (users.length == 0) throw (new NotFoundError("No Users are available"));
    return users;
}

export async function getByIdService(id:string): Promise<User>{
    const user = await UserRepo.getById(id);
    if (!user) throw (new NotFoundError(`User of id ${id} not found`));
    return user;
}

export function createService(userDetail: User): Promise<User>{
    const id = uuidv4();
    console.log(id);
    userDetail.id = id;
    return UserRepo.create(userDetail);
}

export async function updateByIdService(id:string,userDetail: Pick<User, 'name'|'email'>): Promise<User|null>{
    await getByIdService(id);
    return UserRepo.updateById(id,userDetail);
}

export async function deleteService(id:string): Promise<string>{
    await getByIdService(id);
    return UserRepo.deleteById(id);
}