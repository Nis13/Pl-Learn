import { IsNumber, IsString, Length, IsPositive } from "class-validator";

export class CreateProductDTO {
  @IsString()
  @Length(1, 200, { message: "Name must be between 1 and 200 characters" })
  name: string;

  @IsNumber({}, { message: "Price must be a number" })
  @IsPositive({ message: "Price must be a positive number" })
  price: number;
}
