import AppDataSource from "../typeORMfile";
import { Order as OrderEntity } from "../entities/order.entity";
import { ENTITY_DELETED } from "../constants/Exception";

const OrderRepo = AppDataSource.getRepository(OrderEntity);

export async function getAll(): Promise<OrderEntity[]> {
  const allOrders = await OrderRepo.find();
  return allOrders;
}

export async function getById(id: string): Promise<OrderEntity | null> {
  const orderDetail = await OrderRepo.findOneBy({ id: id });
  return orderDetail;
}

export async function create(
  orderDetails: Partial<OrderEntity>
): Promise<OrderEntity> {
  const order = OrderRepo.create(orderDetails);
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
  return ENTITY_DELETED("Order", id);
}
