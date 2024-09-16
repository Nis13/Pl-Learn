import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";

export async function  getAllUsersController(req: Request, res:Response, next:NextFunction) : Promise<void>{
    const users= UserService.getAllUsersService();
    res.json(users);
}

export async function getUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const { id } = req.params;
    const user = UserService.getUserByIdService(+id);
    res.json(user);
}

export async function createUserController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const user = req.body;
    const message = UserService.createUserService(user);
    res.json(message);
}

export async function updateUserController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const user = req.body;
    const { id } = req.params;
    const message = UserService.updateUserService(+id,user);
    res.json(message);
}

export async function deleteUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    const { id } = req.params;
    const user = UserService.deleteUserService(+id);
    res.json(user);
}

