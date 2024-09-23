export const ENTITY_NOT_FOUND = (entity: string, id: string): string =>
  generateMessage(entity, id, "not found");

export const ENTITY_DELETED = (entity: string, id: string): string =>
  generateMessage(entity, id, "successfully deleted");

export const NO_ENTITIES_FOUND = (entity: string): string =>
  `There are no ${entity}s available`;

const generateMessage = (entity: string, id: string, message: string): string =>
  `${entity} of ID: ${id} ${message}`;
