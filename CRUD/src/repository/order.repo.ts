import AppDataSource from "../typeORMfile";
import { Order as OrderEntity } from "../entities/order.entity";
import {
  ENTITY_DELETED,
  ENTITY_NOT_FOUND,
} from "../constants/exceptionMessage";
import { ENTITY_NAME } from "../constants/entityName";
import { NotFoundError } from "../error/NotFoundError";

const OrderRepo = AppDataSource.getRepository(OrderEntity);

export async function getAll(): Promise<OrderEntity[]> {
  return await OrderRepo.find();
}

export async function getById(id: string): Promise<OrderEntity | null> {
  return await OrderRepo.findOneBy({ id: id });
}

export async function create(
  orderDetails: Partial<OrderEntity>
): Promise<OrderEntity> {
  const order = OrderRepo.create(orderDetails);
  return await OrderRepo.save(order);
}

export async function updateById(
  id: string,
  productDetails: Partial<OrderEntity>
): Promise<OrderEntity | null> {
  await OrderRepo.update(id, productDetails);
  return await OrderRepo.findOneBy({ id: id });
}

export async function deleteById(id: string): Promise<string> {
  const result = await OrderRepo.delete(id);
  if (result.affected == 0) {
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.ORDER, id));
  }
  return ENTITY_DELETED(ENTITY_NAME.ORDER, id);
}
