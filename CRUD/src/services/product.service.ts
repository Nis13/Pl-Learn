import { PRODUCT_NOT_FOUND } from "../constants/EXCEPTIONERROR";
import { CreateProductDTO } from "../DTO/createProduct.dto";
import { Product as ProductEntity } from "../entities/product.entity";
import { NotFoundError } from "../error/NotFoundError";
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
  productDetail: CreateProductDTO
): Promise<ProductEntity> {
  return ProductRepo.create(productDetail);
}

export async function updateByIdService(
  id: string,
  productDetail: Partial<CreateProductDTO>
): Promise<ProductEntity | null> {
  await getByIdService(id);
  return ProductRepo.update(id, productDetail);
}

export async function deleteService(id: string): Promise<string> {
  await getByIdService(id);
  return ProductRepo.deleteById(id);
}
