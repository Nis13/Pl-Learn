import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { BadRequestError } from "../error/BadRequestError";

export async function  getAllUsersController(req: Request, res:Response, next:NextFunction) : Promise<void>{
    try{
        const users= await UserService.getAllUsersService();
        res.json(users);
    } catch(err){
        next(err);
    }
}

export async function getUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
        const { id } = req.params;
        const user = await UserService.getUserByIdService(+id);
        res.json(user);
    } catch(err){
        next(err);
    }
}

export async function createUserController(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
        const user = req.body;
        if (!user.name || !user.email) throw(new BadRequestError("name and email are required"));
        const createdUser = await UserService.createUserService(user);
        res.json(createdUser);
    } catch (err){
        next(err);
    }
}

export async function updateUserController(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
        const user = req.body;
        const { id } = req.params;
        const updatedUser = await UserService.updateUserService(+id,user);
        res.json(updatedUser);
    } catch(err){
        next(err);
    }
}

export async function deleteUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
        const { id } = req.params;
        const message = await UserService.deleteUserService(+id);
        res.json(message);
    } catch(err){
        next(err);
    }
}

