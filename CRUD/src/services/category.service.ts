import { NO_ENTITIES_FOUND } from "../constants/Exception";
import { Category } from "../entities/category.entity";
import { NotFoundError } from "../error/NotFoundError";
import * as CategoryRepo from "../repository/category.repo";

export function getAll(): Promise<Category[]> {
  return CategoryRepo.getAll();
}

export async function getById(id: string): Promise<string | Category> {
  const category = await CategoryRepo.getById(id);
  if (!category) {
    throw new NotFoundError(NO_ENTITIES_FOUND("Category"));
  }
  return category;
}

export function create(category: Category): Promise<Category> {
  return CategoryRepo.create(category);
}

export function updateById(id: string, category: Category) {
  return CategoryRepo.updateById(id, category);
}

export function deleteById(id: string) {
  return CategoryRepo.deleteById(id);
}
