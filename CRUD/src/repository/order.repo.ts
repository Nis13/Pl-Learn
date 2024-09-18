import AppDataSource from "../typeORMfile";
import { Order as OrderEntity } from "../entities/order";
import { Product } from "../interface/product.interface";
import { ORDER_DELETE_MESSAGE } from "../constants/EXCEPTIONERROR";

const OrderRepo = AppDataSource.getRepository(OrderEntity);

export async function getAll(): Promise<OrderEntity[]> {
  const allOrders = await OrderRepo.find();
  return allOrders;
}

export async function getById(id: string): Promise<OrderEntity | null> {
  const orderDetail = await OrderRepo.findOneBy({ id: id });
  return orderDetail;
}

export async function create(orderDetails: Product): Promise<OrderEntity> {
  const orderCreated = await OrderRepo.save(orderDetails);
  return orderCreated;
}

export async function update(
  productDetails: Partial<OrderEntity>
): Promise<OrderEntity> {
  const orderUpdated = await OrderRepo.save(productDetails);
  return orderUpdated;
}

export async function deleteById(id: string): Promise<string> {
  await OrderRepo.delete(id);
  return ORDER_DELETE_MESSAGE(id);
}
