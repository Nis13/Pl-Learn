import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";

export async function getAllController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
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
    const message = await UserService.deleteService(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
