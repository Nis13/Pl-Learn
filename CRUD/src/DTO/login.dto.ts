import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email should not be empty" })
  email: string;

  @IsString()
  password: string;
}
