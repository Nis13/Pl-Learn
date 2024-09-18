import AppDataSource from "../typeORMfile";
import { Product as ProductEntity } from "../entities/product.entity";
import { Product } from "../interface/product.interface";
import { PRODUCT_DELETE_MESSAGE } from "../constants/EXCEPTIONERROR";

const ProductRepo = AppDataSource.getRepository(ProductEntity);

export async function getAll(): Promise<ProductEntity[]> {
  const allProducts = await ProductRepo.find();
  return allProducts;
}

export async function getById(id: string): Promise<ProductEntity | null> {
  const userDetail = await ProductRepo.findOneBy({ id: id });
  return userDetail;
}

export async function create(productDetails: Product): Promise<ProductEntity> {
  const userInserted = await ProductRepo.save(productDetails);
  return userInserted;
}

export async function update(
  id: string,
  productDetails: Partial<ProductEntity>
): Promise<ProductEntity | null> {
  await ProductRepo.update(id, productDetails);
  return await ProductRepo.findOneBy({ id: id });
}

export async function deleteById(id: string): Promise<string> {
  await ProductRepo.delete(id);
  return PRODUCT_DELETE_MESSAGE(id);
}
