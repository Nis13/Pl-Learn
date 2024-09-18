import { IsString, IsUUID } from "class-validator";

export class CreateOrderDTO {
  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @IsUUID()
  productId: string;
}
