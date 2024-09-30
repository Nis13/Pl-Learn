import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     loginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: "Email address of the user"
 *           example: "User@mail.com"
 *         password:
 *           type: string
 *           description: "Password of user"
 *           example: "User@123"
 */
export class LoginDTO {
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email should not be empty" })
  email: string;

  @IsString()
  password: string;
}
