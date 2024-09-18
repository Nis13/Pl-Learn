import { IsEmail, IsNotEmpty, IsString, Length, IsEnum } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({ message: "Name should not be empty" })
  @IsString({ message: "Name must be a string" })
  @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
  name: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email should not be empty" })
  email: string;

  @IsEnum(["Male", "Female", "Other"], {
    message: "Gender must be either Male, Female, or Other",
  })
  gender: string;

  @IsString({ message: "Bio must be a string" })
  @Length(10, 200, { message: "Bio must be between 10 and 200 characters" })
  bio: string;
}
