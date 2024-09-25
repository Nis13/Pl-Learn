import { ENTITY_NAME } from "../constants/entityName";
import {
  ENTITY_NOT_FOUND,
  NO_ENTITIES_FOUND,
} from "../constants/exceptionMessage";
import { CreateProductDTO } from "../DTO/createProduct.dto";
import { Product as ProductEntity } from "../entities/product.entity";
import { NotFoundError } from "../error/NotFoundError";
import * as ProductRepo from "../repository/product.repo";
import * as CategoryService from "../services/category.service";
import * as UserService from "../services/user.service";
import loggerWithNameSpace from "../utilis/logger";
import { Category } from "../entities/category.entity";

const logger = loggerWithNameSpace(`${ENTITY_NAME.PRODUCT}Service`);

export async function getAll(): Promise<ProductEntity[]> {
  logger.info("Fetching all products.");
  const products = await ProductRepo.getAll();
  if (products.length == 0) {
    logger.warn(NO_ENTITIES_FOUND(ENTITY_NAME.PRODUCT));
    throw new NotFoundError(NO_ENTITIES_FOUND(ENTITY_NAME.PRODUCT));
  }
  return products;
}

export async function getById(id: string): Promise<ProductEntity> {
  logger.info(`Fetching product with ID: ${id}`);
  const product = await ProductRepo.getById(id);
  if (!product) {
    logger.error(ENTITY_NOT_FOUND(ENTITY_NAME.PRODUCT, id));
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.PRODUCT, id));
  }
  return product;
}

export async function getByUserId(id: string): Promise<ProductEntity[]> {
  logger.info(`Fetching products of user of ID: ${id}`);
  const product = await ProductRepo.getByUserId(id);
  if (!product) {
    logger.error(ENTITY_NOT_FOUND(ENTITY_NAME.PRODUCT, id));
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.PRODUCT, id));
  }
  return product;
}

/**
 * takes productdetails with array of category ids and convert the category ids to their respective Category Entity
 *
 * @export
 * @async
 * @param {CreateProductDTO} productDetail
 * @returns {Promise<ProductEntity>}
 */
export async function create(
  userId: string,
  productDetail: CreateProductDTO
): Promise<ProductEntity> {
  logger.info(
    `Creating ${ENTITY_NAME.PRODUCT} with name: ${productDetail.name}`
  );
  const { category, ...product } = productDetail;
  const categoryArray: Category[] = [];
  const seller = await UserService.getById(userId);
  if (category) {
    for (const categoryId of category) {
      const categoryItem = await CategoryService.getById(categoryId);
      categoryArray.push(categoryItem);
    }
  }
  const productCreate = { category: categoryArray, ...product, seller: seller };

  return ProductRepo.create(productCreate);
}

export async function updateById(
  id: string,
  productDetail: Partial<ProductEntity>
): Promise<ProductEntity | null> {
  await getById(id);
  logger.info(`Updating ${ENTITY_NAME.PRODUCT} with ID: ${id}`);
  return ProductRepo.updateById(id, productDetail);
}

export async function deleteById(id: string): Promise<string> {
  logger.info(`Deleting ${ENTITY_NAME.PRODUCT} with ID: ${id}`);
  return ProductRepo.deleteById(id);
}

export async function addCategoryToProduct(
  productId: string,
  categoryId: string
) {
  logger.info(`Adding category ID: ${categoryId} to product ID: ${productId}`);
  const product = await getById(productId);
  const category = await CategoryService.getById(categoryId);
  product.category.push(category);
  return updateById(productId, product);
}
