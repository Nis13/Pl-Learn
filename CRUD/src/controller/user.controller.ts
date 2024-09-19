import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("UserController");

export async function getAllController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    logger.info("Called getAllUsers By Controller");
    const users = await UserService.getAllService();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    logger.info(`Called getUserByIDController to get User of Id: ${id}`);
    const user = await UserService.getByIdService(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function createController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userDetail = req.body;
    logger.info(
      `Called createUser to create user with name: ${userDetail.name}`
    );
    const createdUser = await UserService.createService(userDetail);
    res.json(createdUser);
  } catch (error) {
    next(error);
  }
}

export async function updateByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = req.body;
    const { id } = req.params;
    logger.info(`Called updateUser to update user of ID: ${id}`);
    const updatedUser = await UserService.updateByIdService(id, user);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function deleteByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    logger.info(`Called deleteUser to delete User of Id : ${id}`);
    const message = await UserService.deleteService(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}
