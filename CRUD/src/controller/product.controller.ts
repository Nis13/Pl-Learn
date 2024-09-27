import { NextFunction, Request, Response } from "express";
import * as ProductService from "../services/product.service";
import { UserRequest } from "../interface/userRequest";

export async function getAll(
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const allProducts = await ProductService.getAll();
    res.json(allProducts);
  } catch (err) {
    next(err);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const productById = await ProductService.getById(id);
    res.json(productById);
  } catch (err) {
    next(err);
  }
}

export async function getBySellerId(
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = req.user?.id;
    const productById = await ProductService.getByUserId(id!);
    res.json(productById);
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.id;
    const productDetail = req.body;
    const createdProduct = await ProductService.create(userId!, productDetail);
    res.json(createdProduct);
  } catch (err) {
    next(err);
  }
}

export async function updateById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const product = req.body;
    const updatedUser = await ProductService.updateById(id, product);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export async function deleteById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const message = await ProductService.deleteById(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}

export async function addCategoryToProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const { categoryId } = req.body;
    const message = await ProductService.addCategoryToProduct(id, categoryId);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
