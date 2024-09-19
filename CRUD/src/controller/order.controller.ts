import { NextFunction, Request, Response } from "express";
import * as OrderService from "../services/order.service";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("OrderService");

export async function getAllController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    logger.info(`Called getAllController`);
    const orders = await OrderService.getAllService();
    res.json(orders);
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
    logger.info(`Called getByIdController to get the Order by ID : ${id}`);
    const user = await OrderService.getByIdService(id);
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
    const { userId, productId } = req.body;
    logger.info(
      `Called createController to create the Order by User of ID : ${userId}`
    );
    const createdOrder = await OrderService.createService(userId, productId);
    res.json(createdOrder);
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
    const { id } = req.params;
    logger.info(
      `Called updateByIdController to update the Order of ID : ${id}`
    );
    const order = req.body;
    const updatedUser = await OrderService.updateByIdService(id, order);
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
      `Called deleteByIdController to delete the Order of Id : ${id}`
    );
    const message = await OrderService.deleteService(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
