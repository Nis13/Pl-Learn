import {
  IsString,
  Length,
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
  IsOptional,
} from "class-validator";
import { UserDTO } from "./user.dto";
import { Role } from "../constants/role.enum";

/**
 * @openapi
 * components:
 *   schemas:
 *     createUserSchema:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - gender
 *         - bio
 *       properties:
 *         name:
 *           type: string
 *           default: Jane Doe
 *         email:
 *           type: string
 *           default: jane.doe@example.com
 *         password:
 *           type: string
 *           default: Janedoe@123
 *         role:
 *           type: string
 *           default: user
 *         gender:
 *           type: string
 *           default: Male
 *         bio:
 *           type: string
 *           default: Here is my short bio
 *     createUserResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         id:
 *           type: string
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

export class CreateUserDTO extends UserDTO {
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsEnum(["Male", "Female", "Other"], {
    message: "Gender must be either Male, Female, or Other",
  })
  gender: string;

  @IsString({ message: "Bio must be a string" })
  @Length(10, 200, { message: "Bio must be between 10 and 200 characters" })
  bio: string;
}
