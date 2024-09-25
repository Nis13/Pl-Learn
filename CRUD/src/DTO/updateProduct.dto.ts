import { IsOptional } from "class-validator";
import { CreateProductDTO } from "./createProduct.dto";

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

export class UpdateProductDTO extends CreateProductDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  category?: string[];
}
