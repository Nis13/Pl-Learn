import { NotFoundError } from "../error/NotFoundError";
import { Order as OrderEntity } from "../entities/order.entity";
import * as OrderRepo from "../repository/order.repo";
import { ORDER_NOT_FOUND } from "../constants/EXCEPTIONERROR";
import * as UserService from "../services/user.service";
import * as ProductService from "../services/product.service";

export function getAllService(): Promise<OrderEntity[]> {
  return OrderRepo.getAll();
}

export async function getByIdService(id: string): Promise<OrderEntity> {
  const order = await OrderRepo.getById(id);
  if (!order) throw new NotFoundError(ORDER_NOT_FOUND(id));
  return order;
}

export async function createService(
  userId: string,
  productId: string
): Promise<OrderEntity> {
  const user = await UserService.getByIdService(userId);
  const product = await ProductService.getByIdService(productId);
  const orderDetail = { user: user, product: product };
  return OrderRepo.create(orderDetail);
}

export async function updateByIdService(
  id: string,
  orderDetail: Partial<OrderEntity>
): Promise<OrderEntity | null> {
  await getByIdService(id);
  return OrderRepo.update(id, orderDetail);
}

export async function deleteService(id: string): Promise<string> {
  await getByIdService(id);
  return OrderRepo.deleteById(id);
}
