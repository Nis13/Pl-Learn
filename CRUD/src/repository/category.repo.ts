import { Category } from "../entities/category.entity";
import AppDataSource from "../typeORMfile";
import { ENTITY_DELETED } from "../constants/Exception";

const CatergoryRepo = AppDataSource.getRepository(Category);

export async function getAll(): Promise<Category[]> {
  return CatergoryRepo.find();
}

export async function getById(id: string): Promise<Category | null> {
  return CatergoryRepo.findOneBy({ id: id });
}

export async function create(category: Category): Promise<Category> {
  const categoryCreate = CatergoryRepo.create(category);
  return CatergoryRepo.save(categoryCreate);
}

export async function updateById(
  id: string,
  category: Partial<Category>
): Promise<Category | null> {
  await getById(id);
  await CatergoryRepo.update(id, category);
  return getById(id);
}

export async function deleteById(id: string): Promise<string> {
  await CatergoryRepo.delete(id);
  return ENTITY_DELETED("Category", id);
}
