import { PRODUCT_NOT_FOUND } from "../constants/EXCEPTIONERROR";
import { Product as ProductEntity } from "../entities/product.entity";
import { NotFoundError } from "../error/NotFoundError";
import { Product } from "../interface/product.interface";
import * as ProductRepo from "../repository/product.repo";

export function getAllService(): Promise<ProductEntity[]> {
  return ProductRepo.getAll();
}

export async function getByIdService(id: string): Promise<ProductEntity> {
  const user = await ProductRepo.getById(id);
  if (!user) throw new NotFoundError(PRODUCT_NOT_FOUND(id));
  return user;
}

export async function createService(
  productDetail: Product
): Promise<ProductEntity> {
  return ProductRepo.create(productDetail);
}

export async function updateByIdService(
  id: string,
  productDetail: Partial<Product>
): Promise<ProductEntity | null> {
  await getByIdService(id);
  return ProductRepo.update(id, productDetail);
}

export async function deleteService(id: string): Promise<string> {
  await getByIdService(id);
  return ProductRepo.deleteById(id);
}
