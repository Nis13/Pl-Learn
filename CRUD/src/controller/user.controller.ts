import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("UserController");

export async function  getAllUsersController(req: Request, res:Response, next:NextFunction) : Promise<void>{
    try{
        logger.info("called getAllUsers By Controller");
        const users= await UserService.getAllUsersService();
        res.json(users);
    } catch(err){
        next(err);
    }
}

export async function getUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
        const { id } = req.params;
        logger.info("called getUserByID By Controller");
        const user = await UserService.getUserByIdService(+id);
        res.json(user);
    } catch(err){
        next(err);
    }
}

export async function createUserController(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
        const user = req.body;
        logger.info("called createUser By Controller");
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
        logger.info("called updateUser By Controller");
        const updatedUser = await UserService.updateUserService(+id,user);
        res.json(updatedUser);
    } catch(err){
        next(err);
    }
}

export async function deleteUserByIdController(req:Request, res:Response, next:NextFunction): Promise<void>{
    try{
        const { id } = req.params;
        logger.info("called deleteUser By Controller");
        const message = await UserService.deleteUserService(+id);
        res.json(message);
    } catch(err){
        next(err);
    }
}

