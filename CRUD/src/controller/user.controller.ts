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
    logger.info("called getAllUsers By Controller");
    const users = await UserService.getAllService();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function getByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    logger.info("called getUserByID By Controller");
    const user = await UserService.getByIdService(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function createController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, ...userProfile } = req.body;
    logger.info("called createUser By Controller");
    const userdetail = {
      name: name,
      email: email,
      profile: userProfile,
    };
    const createdUser = await UserService.createService(userdetail);
    res.json(createdUser);
  } catch (err) {
    next(err);
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
    logger.info("called updateUser By Controller");
    const updatedUser = await UserService.updateByIdService(id, user);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    logger.info("called deleteUser By Controller");
    const message = await UserService.deleteService(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
