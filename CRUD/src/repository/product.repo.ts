import AppDataSource from "../typeORMfile";
import { Product as ProductEntity } from "../entities/product.entity";
import { ENTITY_DELETED } from "../constants/exceptionMessage";

const ProductRepo = AppDataSource.getRepository(ProductEntity);

export async function getAll(): Promise<ProductEntity[]> {
  return await ProductRepo.find();
}

export async function getById(id: string): Promise<ProductEntity | null> {
  return await ProductRepo.findOne({
    where: { id: id },
    relations: ["category"],
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
  // await ProductRepo.update(id, productDetails);
  await ProductRepo.save(productDetails);
  return await ProductRepo.findOne({
    where: { id: id },
    relations: ["category"],
  });
}

export async function deleteById(id: string): Promise<string> {
  await ProductRepo.delete(id);
  return ENTITY_DELETED("Product", id);
}
