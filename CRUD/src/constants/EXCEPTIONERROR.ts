export const USER_NOT_FOUND = (id: string): string =>
  `User of ID: ${id} not found`;

export const NO_USERS_MESSAGE = (): string => "There are no users available";

export const REQUIRED_MESSAGE = (attribute: string): string =>
  `${attribute} is required`;

export const USER_DELETE_MESSAGE = (id: string): string =>
  `User of Id: ${id} successfully deleted`;

export const ORDER_DELETE_MESSAGE = (id: string): string =>
  `Order of Id: ${id} successfully deleted`;

export const ORDER_NOT_FOUND = (id: string): string =>
  `Order of ID: ${id} not found`;

export const PRODUCT_DELETE_MESSAGE = (id: string): string =>
  `Product of Id: ${id} successfully deleted`;

export const PRODUCT_NOT_FOUND = (id: string): string =>
  `Product of ID: ${id} not found`;

// // Generic message generator for actions (success, error, etc.)
// const generateMessage = (entity: string, id: string, message: string): string =>
//   `${entity} of ID: ${id} ${message}`;

// // Generic not found message for an entity by ID
// export const ENTITY_NOT_FOUND = (entity: string, id: string): string =>
//   generateMessage(entity, id, "not found");

// // Generic delete success message for an entity
// export const ENTITY_DELETED = (entity: string, id: string): string =>
//   generateMessage(entity, id, "successfully deleted");

// // Generic no entities available message
// export const NO_ENTITIES_FOUND = (entity: string): string =>
//   `There are no ${entity}s available`;

// // Required attribute message
// export const requiredAttributeMessage = (attribute: string): string =>
//   `${attribute} is required`;
