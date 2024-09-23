import { NotFoundError } from "../error/NotFoundError";
import { Order as OrderEntity } from "../entities/order.entity";
import * as OrderRepo from "../repository/order.repo";
import * as UserService from "../services/user.service";
import * as ProductService from "../services/product.service";
import loggerWithNameSpace from "../utilis/logger";
import { ENTITY_NOT_FOUND } from "../constants/Exception";

const logger = loggerWithNameSpace("OrderService");

export function getAllService(): Promise<OrderEntity[]> {
  logger.info(`Called getAllService of Order`);
  return OrderRepo.getAll();
}

export async function getByIdService(id: string): Promise<OrderEntity> {
  logger.info(`Called getById to get the Order of ID: ${id}`);
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
export async function createService(
  userId: string,
  productId: string
): Promise<OrderEntity> {
  logger.info(
    `Called createService to create Order by user of Id: ${userId} to place order for produst of Id:${productId}`
  );
  const user = await UserService.getByIdService(userId);
  const product = await ProductService.getByIdService(productId);
  const orderDetail = { user: user, product: product };
  return OrderRepo.create(orderDetail);
}

export async function updateByIdService(
  id: string,
  orderDetail: Partial<OrderEntity>
): Promise<OrderEntity | null> {
  logger.info(`Called uodateByIdService to update the Order with Id: ${id}`);
  await getByIdService(id);
  return OrderRepo.update(id, orderDetail);
}

export async function deleteService(id: string): Promise<string> {
  logger.info(`Called deleteService to delete the Order with ID: ${id}`);
  await getByIdService(id);
  return OrderRepo.deleteById(id);
}
