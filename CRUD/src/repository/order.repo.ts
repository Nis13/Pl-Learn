import AppDataSource from "../typeORMfile";
import { Order, Order as OrderEntity } from "../entities/order.entity";
import {
  ENTITY_DELETED,
  ENTITY_NOT_FOUND,
} from "../constants/exceptionMessage";
import { ENTITY_NAME } from "../constants/entityName";
import { NotFoundError } from "../error/NotFoundError";
import { Equal } from "typeorm";
import { Product } from "../entities/product.entity";

const OrderRepo = AppDataSource.getRepository(OrderEntity);

export async function getAll(): Promise<OrderEntity[]> {
  return await OrderRepo.find();
}

export async function getById(id: string): Promise<OrderEntity | null> {
  return await OrderRepo.findOne({
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
  productStock: number
): Promise<OrderEntity> {
  return AppDataSource.transaction(async (TransactionalEntityManager) => {
    if (orderDetails.product) {
      await TransactionalEntityManager.update(
        Product,
        {
          id: orderDetails.product.id,
        },
        { stock: productStock }
      );
    }
    const order = TransactionalEntityManager.create(Order, orderDetails);
    const createdOrder = await TransactionalEntityManager.save(Order, order);

    return createdOrder;
  });
}

export async function updateById(
  id: string,
  orderDetail: Partial<OrderEntity>,
  productStock?: number
): Promise<OrderEntity | null> {
  return AppDataSource.transaction(async (transactionalEntityManger) => {
    await transactionalEntityManger.update(Order, id, orderDetail);
    const updatedOrder = await transactionalEntityManger.findOne(Order, {
      where: { id: Equal(id) },
      relations: [ENTITY_NAME.PRODUCT],
    });
    const productToupdate = {
      stock: productStock,
    };
    await transactionalEntityManger.update(
      Product,
      { id: updatedOrder?.product.id },
      productToupdate
    );
    return await transactionalEntityManger.findOne(Order, {
      where: { id: Equal(id) },
      relations: [ENTITY_NAME.PRODUCT],
    });
  });
}

export async function deleteById(id: string): Promise<string> {
  const result = await OrderRepo.delete(id);
  if (result.affected == 0) {
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.ORDER, id));
  }
  return ENTITY_DELETED(ENTITY_NAME.ORDER, id);
}
