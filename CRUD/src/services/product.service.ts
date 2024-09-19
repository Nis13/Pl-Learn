import { ENTITY_NOT_FOUND } from "../constants/Exception";
import { CreateProductDTO } from "../DTO/createProduct.dto";
import { Product as ProductEntity } from "../entities/product.entity";
import { NotFoundError } from "../error/NotFoundError";
import * as ProductRepo from "../repository/product.repo";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("ProductService");

export function getAllService(): Promise<ProductEntity[]> {
  logger.info(`Called getAllService`);
  return ProductRepo.getAll();
}

export async function getByIdService(id: string): Promise<ProductEntity> {
  logger.info(`Called getByIdService to get Product info of ID: ${id}`);
  const user = await ProductRepo.getById(id);
  if (!user) {
    logger.error(ENTITY_NOT_FOUND("Product", id));
    throw new NotFoundError(ENTITY_NOT_FOUND("Product", id));
  }
  return user;
}

export async function createService(
  productDetail: CreateProductDTO
): Promise<ProductEntity> {
  logger.info(
    `Called createService to create Product with name: ${productDetail.name}`
  );
  return ProductRepo.create(productDetail);
}

export async function updateByIdService(
  id: string,
  productDetail: Partial<CreateProductDTO>
): Promise<ProductEntity | null> {
  logger.info(`Called updateService to update Product with ID : ${id}`);
  await getByIdService(id);
  return ProductRepo.update(id, productDetail);
}

export async function deleteService(id: string): Promise<string> {
  logger.info(`Called deleteService to delete product of Id: ${id}`);
  await getByIdService(id);
  return ProductRepo.deleteById(id);
}
