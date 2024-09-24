import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDTO {
  @IsNotEmpty({ message: "Name should not be empty" })
  @IsString({ message: "Name must be a string" })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email should not be empty" })
  email: string;
}
