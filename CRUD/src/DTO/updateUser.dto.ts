import { IsEnum, IsOptional } from "class-validator";
import { UserDTO } from "./user.dto";
import { Role } from "../constants/role.enum";

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
 *         role:
 *           type: string
 *           description: User or Admin
 *           example: "Admin"
 */

export class UpdateUserDTO extends UserDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
