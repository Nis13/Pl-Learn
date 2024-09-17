import{ NextFunction, Request, Response } from"express";
import* as UserService from"../services/user.service";

export async function  getAllUsersController(req: Request, res:Response, next:NextFunction) : Promise<void>{
    const users= await UserService.getAllUsersService();
    console.log(users);
    res.json(users);
}

export async function getUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const{ id } = req.params;
    const user = await UserService.getUserByIdService(+id);
    res.json(user);
}

export async function createUserController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const{name,email,...userProfile} = req.body;
    const userdetail = {
        name:name,
        email:email,
        profile:userProfile
    };
    const createdUser = await UserService.createUserService(userdetail);
    res.json(createdUser);
}

export async function updateUserController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const user = req.body;
    const{ id } = req.params;
    const updatedUser = await UserService.updateUserService(+id,user);
    res.json(updatedUser);
}

export async function deleteUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const{ id } = req.params;
    const message = await UserService.deleteUserService(+id);
    res.json(message);
}

