import { NextFunction, Request, Response } from "express";
import * as ProductService from "../services/product.service";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("ProductController");

export async function getAllController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    logger.info(`Called getAllController`);
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
    logger.info(`Called getByIdController to get Product of ID : ${id}`);
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
    logger.info(
      `Called createController to create Product with name : ${productDetail.name}`
    );
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
    logger.info(`Called updateByIdController to update Prodcut of Id : ${id}`);
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
    logger.info(
      `Called deleteByIdController to delete the Product of ID : ${id}`
    );
    const message = await ProductService.deleteService(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
