import { IsOptional } from "class-validator";
import { UserDTO } from "./user.dto";

/**
 * @openapi
 * components:
 *   schemas:
 *     updateUserSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: "Name of the user"
 *           minLength: 3
 *           maxLength: 50
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: "Email address of the user"
 *           example: "john.doe@example.com"
 */

// export class UpdateUserDTO extends CreateUserDTO{
//   @IsOptional()
//   @IsString({ message: "Name must be a string" })
//   @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
//   name?: string;

//   @IsOptional()
//   @IsEmail({}, { message: "Invalid email format" })
//   email?: string;
// }

export class UpdateUserDTO extends UserDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;
}
