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
