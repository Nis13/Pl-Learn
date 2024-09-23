import {
  IsNumber,
  IsString,
  Length,
  IsPositive,
  IsOptional,
  IsArray,
} from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     updateProductSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Updated Product Name"
 *           minLength: 1
 *           maxLength: 200
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 25000
 *         category:
 *           type: array
 *           description: An optional array of category IDs (UUIDs)
 *           items:
 *             type: string
 *           example: ["67e27f08-7709-4d04-ae36-76f85bdf888c"]
 */

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  @Length(1, 200, { message: "Name must be between 1 and 200 characters" })
  name?: string;

  @IsOptional()
  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  price?: number;

  @IsOptional()
  @IsArray()
  category?: string[];
}
