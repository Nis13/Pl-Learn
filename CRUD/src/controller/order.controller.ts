import { NextFunction, Response } from "express";
import * as OrderService from "../services/order.service";
import { Request } from "../interface/userRequest";

export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const allOrders = await OrderService.getAll();
    res.json(allOrders);
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
    const orderById = await OrderService.getById(id);
    res.json(orderById);
  } catch (err) {
    next(err);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.id;
    const { productId } = req.body;
    const createdOrder = await OrderService.create(userId!, productId);
    res.json(createdOrder);
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
    const order = req.body;
    const updatedOrder = await OrderService.updateById(id, order);
    res.json(updatedOrder);
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
    const message = await OrderService.deleteById(id);
    res.json(message);
  } catch (err) {
    next(err);
  }
}
