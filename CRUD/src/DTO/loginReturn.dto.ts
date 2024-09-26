import { IsNotEmpty, IsString } from "class-validator";

export class LoginReturnDTO {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
