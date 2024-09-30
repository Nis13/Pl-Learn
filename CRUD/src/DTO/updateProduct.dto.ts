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
 *     updateProductResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier of the product (UUID)
 *           example: "6c5af005-1303-431f-b7a9-d5616f18e1d4"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was created
 *           example: "2024-09-26T08:07:26.700Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the product was last updated
 *           example: "2024-09-26T08:07:26.700Z"
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: "Mobile"
 *           minLength: 1
 *           maxLength: 200
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 20000
 */

export class UpdateProductDTO extends CreateProductDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  price: number;

  @IsOptional()
  stock: number;

  @IsOptional()
  category?: string[];
}
