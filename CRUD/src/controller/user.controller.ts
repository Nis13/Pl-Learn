import { NextFunction, Response } from "express";
import * as UserService from "../services/user.service";
import { Request } from "../interface/userRequest";
import { UpdateUserDTO } from "../DTO/updateUser.dto";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const userById = await UserService.getById(id);
    res.json(userById);
  } catch (error) {
    next(error);
  }
}

export async function getMyDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.user?.id;
    const userById = await UserService.getById(id!);
    res.json(userById);
  } catch (error) {
    next(error);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userDetail = req.body;
    const createdUser = await UserService.create(userDetail);
    res.json(createdUser);
  } catch (error) {
    next(error);
  }
}

export async function updateById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const user: UpdateUserDTO = req.body;
    const updatedUser = await UserService.updateById(id, user);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function updateMyDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.user?.id;
    const user = req.body;
    const updatedUser = await UserService.updateById(id!, user);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function deleteById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const message = await UserService.deleteById(id);
    res.json(message);
  } catch (error) {
    next(error);
  }
}
