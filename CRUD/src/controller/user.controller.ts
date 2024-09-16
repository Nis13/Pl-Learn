
import { NextFunction, Request, Response } from "express";
import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../services/user.service";

export async function  getAllUsersController(req: Request, res:Response, next:NextFunction){
    const users= getAllUsersService();
    res.json(users);
}

export async function getUserByIdController(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;
    const user = getUserByIdService(+id);
    res.json(user);
}

export async function createUserController(req:Request, res:Response, next:NextFunction){
    const user = req.body;
    const message = createUserService(user);
    res.json(message);
}

export async function updateUserController(req:Request, res:Response, next:NextFunction){
    const user = req.body;
    const { id } = req.params;
    const message = updateUserService(+id,user);
    res.json(message);
}

export async function deleteUserByIdController(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;
    const user = deleteUserService(+id);
    res.json(user);
}

