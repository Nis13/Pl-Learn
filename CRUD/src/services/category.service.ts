import { ENTITY_NAME } from "./../constants/entity";
import { NO_ENTITIES_FOUND } from "../constants/exceptionMessage";
import { Category } from "../entities/category.entity";
import { NotFoundError } from "../error/NotFoundError";
import * as CategoryRepo from "../repository/category.repo";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace(`${ENTITY_NAME.CATEGORY}Service`);

export function getAll(): Promise<Category[]> {
  logger.info(`Fetching all ${ENTITY_NAME.CATEGORY}s`);
  return CategoryRepo.getAll();
}

export async function getById(id: string): Promise<Category> {
  logger.info(`Fetching ${ENTITY_NAME.CATEGORY} with ID: ${id}`);
  const category = await CategoryRepo.getById(id);
  if (!category) {
    throw new NotFoundError(NO_ENTITIES_FOUND(ENTITY_NAME.CATEGORY));
  }
  return category;
}

export function create(category: Category): Promise<Category> {
  logger.info(
    `Creating a new ${ENTITY_NAME.CATEGORY} with name: ${category.name}`
  );
  return CategoryRepo.create(category);
}

export function updateById(id: string, category: Category) {
  logger.info(`Updating ${ENTITY_NAME.CATEGORY} with ID: ${id}`);
  return CategoryRepo.updateById(id, category);
}

export function deleteById(id: string) {
  logger.info(`Deleting ${ENTITY_NAME.CATEGORY} with ID: ${id}`);
  return CategoryRepo.deleteById(id);
}
