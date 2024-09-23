import { IsString, IsUUID } from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     createOrderSchema:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the user placing the order
 *           example: "e8a8c619-57e7-4b89-8a95-324f6786da4c"
 *         productId:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the product being ordered
 *           example: "d3f3f0b8-5d8e-4f51-94b5-f2a7cfe6c8d4"
 *     createOrderResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The unique identifier of the order
 *           example: "42f39d8b-fcf9-4350-8a2f-e0b04b26895b"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the order was created
 *           example: "2024-09-23T06:49:15.808Z"
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the order was last updated
 *           example: "2024-09-23T06:49:15.808Z"
 */

export class CreateOrderDTO {
  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @IsUUID()
  productId: string;
}
