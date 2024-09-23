import {
  IsNumber,
  IsString,
  Length,
  IsPositive,
  IsOptional,
  IsArray,
} from "class-validator";

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
