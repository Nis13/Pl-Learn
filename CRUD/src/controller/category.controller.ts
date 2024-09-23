import { NextFunction, Request, Response } from "express";
import * as CategoryService from "../services/category.service";

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const category = req.body;
    const createdCategory = await CategoryService.create(category);
    res.json(createdCategory);
  } catch (err) {
    next(err);
  }
}
