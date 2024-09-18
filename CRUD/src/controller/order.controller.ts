import { NextFunction, Request, Response } from "express";
import * as OrderService from "../services/order.service";

export async function getAllController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
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
    const order = req.body;
    const { id } = req.params;
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
    const message = await OrderService.deleteService(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
