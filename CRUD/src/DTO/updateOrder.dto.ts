import { IsOptional } from "class-validator";
import { CreateOrderDTO } from "./createOrder.dto";

export class UpdateOrderDTO extends CreateOrderDTO {
  @IsOptional()
  productId: string;

  @IsOptional()
  quantity: number;
}
