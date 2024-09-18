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

export async function getByIdController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const user = await ProductService.getByIdService(id);
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
    const productDetail = req.body;
    const createdProduct = await ProductService.createService(productDetail);
    res.json(createdProduct);
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
    const product = req.body;
    const { id } = req.params;
    const updatedUser = await ProductService.updateByIdService(id, product);
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
    const message = await ProductService.deleteService(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
