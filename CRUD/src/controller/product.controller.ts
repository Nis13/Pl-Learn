import { NextFunction, Request, Response } from "express";
import * as ProductService from "../services/product.service";

export async function getAllController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const products = await ProductService.getAllService();
    res.json(products);
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
    const productDetail = req.body;
    const createdUser = await ProductService.createService(productDetail);
    res.json(createdUser);
  } catch (err) {
    next(err);
  }
}
