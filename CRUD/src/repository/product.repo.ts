import AppDataSource from "../typeORMfile";
import { Product as ProductEntity } from "../entities/product.entity";
import { CreateProductDTO } from "../DTO/createProduct.dto";
import { ENTITY_DELETED } from "../constants/Exception";

const ProductRepo = AppDataSource.getRepository(ProductEntity);

export async function getAll(): Promise<ProductEntity[]> {
  const allProducts = await ProductRepo.find();
  return allProducts;
}

export async function getById(id: string): Promise<ProductEntity | null> {
  const productDetail = await ProductRepo.findOneBy({ id: id });
  return productDetail;
}

export async function create(
  productDetails: CreateProductDTO
): Promise<ProductEntity> {
  const product = ProductRepo.create(productDetails);
  const productInserted = await ProductRepo.save(product);
  return productInserted;
}

export async function update(
  id: string,
  productDetails: Partial<CreateProductDTO>
): Promise<ProductEntity | null> {
  await ProductRepo.update(id, productDetails);
  return await ProductRepo.findOneBy({ id: id });
}

export async function deleteById(id: string): Promise<string> {
  await ProductRepo.delete(id);
  return ENTITY_DELETED("Product", id);
}
