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
  logger.info("Fetching all orders");
  const products = await OrderRepo.getAll();
  if (products.length == 0) {
    logger.warn(NO_ENTITIES_FOUND("Order"));
    throw new NotFoundError(NO_ENTITIES_FOUND("Order"));
  }
  return products;
}

export async function getById(id: string): Promise<OrderEntity> {
  logger.info(`Fetching order with ID: ${id}`);
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
    `Creating order for user ID: ${userId} and product ID: ${productId}`
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
  logger.info(`Updating order with ID: ${id}`);
  await getById(id);
  return OrderRepo.updateById(id, orderDetail);
}

export async function deleteById(id: string): Promise<string> {
  logger.info(`Deleting order with ID: ${id}`);
  await getById(id);
  return OrderRepo.deleteById(id);
}
