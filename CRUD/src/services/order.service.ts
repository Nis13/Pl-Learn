import { NotFoundError } from "../error/NotFoundError";
import { Order as OrderEntity } from "../entities/order.entity";
import * as OrderRepo from "../repository/order.repo";
import * as UserService from "../services/user.service";
import * as ProductService from "../services/product.service";
import loggerWithNameSpace from "../utilis/logger";
import {
  ENTITY_NOT_FOUND,
  NO_ENTITIES_FOUND,
} from "../constants/exceptionMessage";

const logger = loggerWithNameSpace("OrderService");

export async function getAll(): Promise<OrderEntity[]> {
  logger.info(`Calling getAll of Order`);
  const products = await OrderRepo.getAll();
  if (products.length == 0) {
    logger.warn(NO_ENTITIES_FOUND("Order"));
    throw new NotFoundError(NO_ENTITIES_FOUND("Order"));
  }
  return OrderRepo.getAll();
}

export async function getById(id: string): Promise<OrderEntity> {
  logger.info(`Calling getById to get the Order of ID: ${id}`);
  const order = await OrderRepo.getById(id);
  if (!order) {
    logger.error(ENTITY_NOT_FOUND("Order", id));
    throw new NotFoundError(ENTITY_NOT_FOUND("Order", id));
  }
  return order;
}

/**
 * takes userId and productId and use them to get the respective entity
 *
 * @export
 * @async
 * @param {string} userId
 * @param {string} productId
 * @returns {Promise<OrderEntity>}
 */
export async function create(
  userId: string,
  productId: string
): Promise<OrderEntity> {
  logger.info(
    `Calling create to create Order by user of Id: ${userId} to place order for produst of Id:${productId}`
  );
  const user = await UserService.getById(userId);
  const product = await ProductService.getById(productId);
  const orderDetail = { user: user, product: product };
  return OrderRepo.create(orderDetail);
}

export async function updateById(
  id: string,
  orderDetail: Partial<OrderEntity>
): Promise<OrderEntity | null> {
  logger.info(`Calling updateById to update the Order with Id: ${id}`);
  await getById(id);
  return OrderRepo.updateById(id, orderDetail);
}

export async function deleteById(id: string): Promise<string> {
  logger.info(`Calling delete to delete the Order with ID: ${id}`);
  await getById(id);
  return OrderRepo.deleteById(id);
}
