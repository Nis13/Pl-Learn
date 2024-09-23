import { NO_ENTITIES_FOUND } from "../constants/exceptionMessage";
import { Category } from "../entities/category.entity";
import { NotFoundError } from "../error/NotFoundError";
import * as CategoryRepo from "../repository/category.repo";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("CategoryService");

export function getAll(): Promise<Category[]> {
  logger.info("Fetching all categories");
  return CategoryRepo.getAll();
}

export async function getById(id: string): Promise<Category> {
  logger.info(`Fetching category with ID: ${id}`);
  const category = await CategoryRepo.getById(id);
  if (!category) {
    throw new NotFoundError(NO_ENTITIES_FOUND("Category"));
  }
  return category;
}

export function create(category: Category): Promise<Category> {
  logger.info(`Creating a new category with name: ${category.name}`);
  return CategoryRepo.create(category);
}

export function updateById(id: string, category: Category) {
  logger.info(`Updating category with ID: ${id}`);
  return CategoryRepo.updateById(id, category);
}

export function deleteById(id: string) {
  logger.info(`Deleting category with ID: ${id}`);
  return CategoryRepo.deleteById(id);
}
