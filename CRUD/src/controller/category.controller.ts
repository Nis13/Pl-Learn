import { NextFunction, Request, Response } from "express";
import * as CategoryService from "../services/category.service";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("CategoryController");

export async function createController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const category = req.body;
    logger.info(`Called createController to create Category`);
    const createdCategory = await CategoryService.create(category);
    res.json(createdCategory);
  } catch (err) {
    next(err);
  }
}
