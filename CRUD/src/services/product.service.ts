import { USER_NOT_FOUND } from "../constants/EXCEPTIONERROR";
import { Product as ProductEntity } from "../entities/product";
import { NotFoundError } from "../error/NotFoundError";
import { Product } from "../interface/product.interface";
import * as ProductRepo from "../repository/product.repo";
import * as UserService from "../services/user.service";

export function getAllService(): Promise<ProductEntity[]> {
  return ProductRepo.getAll();
}

export async function getByIdService(id: string): Promise<ProductEntity> {
  const user = await ProductRepo.getById(id);
  if (!user) throw new NotFoundError(USER_NOT_FOUND(id));
  return user;
}

export async function createService(
  productDetail: Product
): Promise<ProductEntity> {
  return ProductRepo.create(productDetail);
}

export async function updateService(
  id: string,
  productDetail: Product
): Promise<ProductEntity> {
  const user = await UserService.getByIdService(id);
  const product = { ...productDetail, user: user };
  return ProductRepo.update(product);
}
