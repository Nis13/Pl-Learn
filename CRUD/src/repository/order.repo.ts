import AppDataSource from "../typeORMfile";
import { Order as OrderEntity } from "../entities/order.entity";
import { ORDER_DELETE_MESSAGE } from "../constants/EXCEPTIONERROR";
import { Order } from "../interface/order.interface";

const OrderRepo = AppDataSource.getRepository(OrderEntity);

export async function getAll(): Promise<OrderEntity[]> {
  const allOrders = await OrderRepo.find();
  return allOrders;
}

export async function getById(id: string): Promise<OrderEntity | null> {
  const orderDetail = await OrderRepo.findOneBy({ id: id });
  return orderDetail;
}

export async function create(orderDetails: Order): Promise<OrderEntity> {
  const order = await OrderRepo.create(orderDetails);
  const orderCreated = await OrderRepo.save(order);
  return orderCreated;
}

export async function update(
  id: string,
  productDetails: Partial<OrderEntity>
): Promise<OrderEntity | null> {
  await OrderRepo.update(id, productDetails);
  return await OrderRepo.findOneBy({ id: id });
}

export async function deleteById(id: string): Promise<string> {
  await OrderRepo.delete(id);
  return ORDER_DELETE_MESSAGE(id);
}
