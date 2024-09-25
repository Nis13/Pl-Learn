import { Category } from "../entities/category.entity";
import AppDataSource from "../typeORMfile";
import {
  ENTITY_DELETED,
  ENTITY_NOT_FOUND,
} from "../constants/exceptionMessage";
import { ENTITY_NAME } from "../constants/entityName";
import { NotFoundError } from "../error/NotFoundError";
import { Equal } from "typeorm";

const CatergoryRepo = AppDataSource.getRepository(Category);

export async function getAll(): Promise<Category[]> {
  return CatergoryRepo.find();
}

export async function getById(id: string): Promise<Category | null> {
  return CatergoryRepo.findOne({ where: { id: Equal(id) } });
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
  const result = await CatergoryRepo.delete(id);
  if (result.affected == 0) {
    throw new NotFoundError(ENTITY_NOT_FOUND(ENTITY_NAME.CATEGORY, id));
  }
  return ENTITY_DELETED(ENTITY_NAME.CATEGORY, id);
}
