import AppDataSource from "../typeORMfile";
import { Product as ProductEntity } from "../entities/product.entity";
import {
  ENTITY_DELETED,
  ENTITY_NOT_FOUND,
} from "../constants/exceptionMessage";
import { ENTITY_NAME } from "../constants/entityName";
import { NotFoundError } from "../error/NotFoundError";
import { Equal } from "typeorm";

const ProductRepo = AppDataSource.getRepository(ProductEntity);

export async function getAll(): Promise<ProductEntity[]> {
  return await ProductRepo.find();
}

export async function getById(id: string): Promise<ProductEntity | null> {
  return await ProductRepo.findOne({
    where: { id: Equal(id) },
    relations: [ENTITY_NAME.CATEGORY],
  });
}

export async function getByUserId(id: string): Promise<ProductEntity[] | null> {
  return await ProductRepo.find({
    where: { seller: { id: id } },
  });
}

export async function create(
  productDetails: Partial<ProductEntity>
): Promise<ProductEntity> {
  const product = ProductRepo.create(productDetails);
  return await ProductRepo.save(product);
}

export async function updateById(
  id: string,
  productDetails: Partial<ProductEntity>
): Promise<ProductEntity | null> {
  await ProductRepo.update(id, productDetails);
  return await ProductRepo.findOne({
    where: { id: Equal(id) },
    relations: [ENTITY_NAME.CATEGORY],
  });
}

export async function deleteById(id: string): Promise<string> {
  const result = await ProductRepo.delete(id);
  if (result.affected == 0) {
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.PRODUCT, id));
  }
  return ENTITY_DELETED(ENTITY_NAME.PRODUCT, id);
}
