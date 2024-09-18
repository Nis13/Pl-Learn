import { Profile } from "../entities/profile.entity";
import { IsInt, IsEmail } from "class-validator";

export class CreateUserDTO {
  @IsInt()
  name: string;

  @IsEmail()
  email: string;

  profile: Profile;
}
