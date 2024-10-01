import AppDataSource from "../typeORMfile";
import { Order, Order as OrderEntity } from "../entities/order.entity";
import {
  ENTITY_DELETED,
  ENTITY_NOT_FOUND,
} from "../constants/exceptionMessage";
import { ENTITY_NAME } from "../constants/entityName";
import { NotFoundError } from "../error/NotFoundError";
import { EntityManager, Equal } from "typeorm";

const OrderRepo = AppDataSource.getRepository(OrderEntity);

export async function getAll(): Promise<OrderEntity[]> {
  return await OrderRepo.find();
}

export async function getById(
  id: string,
  manager?: EntityManager
): Promise<OrderEntity | null> {
  const repository = manager?.getRepository(Order) || OrderRepo;
  return await repository.findOne({
    where: { id: Equal(id) },
    relations: [ENTITY_NAME.PRODUCT],
  });
}

export async function getByUserId(id: string): Promise<OrderEntity[] | null> {
  return await OrderRepo.find({
    where: { user: { id: Equal(id) } },
  });
}

export async function create(
  orderDetails: Partial<OrderEntity>,
  manager?: EntityManager
): Promise<OrderEntity> {
  const repository = manager?.getRepository(Order) || OrderRepo;
  const order = repository.create(orderDetails);
  const createdOrder = await repository.save(order);
  return createdOrder;
}

export async function updateById(
  id: string,
  orderDetail: Partial<OrderEntity>,
  manager?: EntityManager
): Promise<OrderEntity | null> {
  const repository = manager || OrderRepo;
  await repository.update(Order, id, orderDetail);
  return await repository.findOne(Order, {
    where: { id: Equal(id) },
    relations: [ENTITY_NAME.PRODUCT],
  });
}

export async function deleteById(id: string): Promise<string> {
  const result = await OrderRepo.delete(id);
  if (result.affected == 0) {
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.ORDER, id));
  }
  return ENTITY_DELETED(ENTITY_NAME.ORDER, id);
}
