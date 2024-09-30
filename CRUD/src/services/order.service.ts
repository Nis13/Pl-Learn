import { ENTITY_NAME } from "../constants/entityName";
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
import { BadRequestError } from "../error/BadRequestError";
import { UpdateOrderDTO } from "../DTO/updateOrder.dto";

const logger = loggerWithNameSpace(`${ENTITY_NAME.ORDER}Service`);

export async function getAll(): Promise<OrderEntity[]> {
  logger.info(`Fetching all ${ENTITY_NAME.ORDER}s`);
  const products = await OrderRepo.getAll();
  if (products.length == 0) {
    logger.warn(NO_ENTITIES_FOUND(ENTITY_NAME.ORDER));
    throw new NotFoundError(NO_ENTITIES_FOUND(ENTITY_NAME.ORDER));
  }
  return products;
}

export async function getById(id: string): Promise<OrderEntity> {
  logger.info(`Fetching ${ENTITY_NAME.ORDER} with ID: ${id}`);
  const order = await OrderRepo.getById(id);
  if (!order) {
    logger.error(ENTITY_NOT_FOUND(ENTITY_NAME.ORDER, id));
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.ORDER, id));
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
  productId: string,
  quantity: number
): Promise<OrderEntity> {
  logger.info(
    `Creating order for user ID: ${userId} and product ID: ${productId}`
  );
  const user = await UserService.getById(userId);
  const product = await ProductService.getById(productId);
  if (product.stock < quantity) {
    throw new BadRequestError("Not Enough Product in the stock");
  }
  product.stock -= quantity;
  const orderDetail = { user: user, product: product, quantity: quantity };
  return OrderRepo.create(orderDetail, product.stock);
}

export async function updateById(
  id: string,
  orderDetail: Partial<UpdateOrderDTO>
): Promise<OrderEntity | null> {
  logger.info(`Updating ${ENTITY_NAME.ORDER} with ID: ${id}`);
  const order = await getById(id);
  logger.info(`The requested order quantity is ${orderDetail.quantity}`);
  if (orderDetail.quantity !== undefined) {
    if (order.product.stock + order.quantity < orderDetail.quantity) {
      throw new BadRequestError("Not Enough Product in the stock");
    }
    const productStock =
      order.product.stock + order.quantity - orderDetail.quantity;
    logger.info(`The productStock becomes  ${productStock}`);
    return OrderRepo.updateById(id, orderDetail, productStock);
  } else return OrderRepo.updateById(id, orderDetail);
}

export async function deleteById(id: string): Promise<string> {
  logger.info(`Deleting ${ENTITY_NAME.ORDER} with ID: ${id}`);
  return OrderRepo.deleteById(id);
}
