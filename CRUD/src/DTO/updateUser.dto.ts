import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsString({ message: "Name must be a string" })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: "Invalid email format" })
  email?: string;
}
