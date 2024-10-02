import {
  IsNumber,
  IsString,
  Length,
  IsPositive,
  IsOptional,
  IsUUID,
  IsArray,
} from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     createProductSchema:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Sample Product"
 *           minLength: 1
 *           maxLength: 200
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 29.99
 *         category:
 *           type: array
 *           description: An optional array of category IDs (UUIDs)
 *           items:
 *             type: string
 *             format: uuid
 *           example: ["2b62730d-c8fa-4993-b0f7-73e661ca23ac"]
 *     createProductResponse:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *         - id
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               name:
 *                 type: string
 *         id:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export class CreateProductDTO {
  @IsString()
  @Length(1, 200, { message: "Name must be between 1 and 200 characters" })
  name: string;

  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  price: number;

  @IsNumber({}, { message: "Stock must be a number" })
  @IsPositive({ message: "Stock must be a positive number" })
  stock: number;

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  category?: string[];
}
