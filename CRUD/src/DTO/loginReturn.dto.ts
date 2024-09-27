import { IsNotEmpty, IsString } from "class-validator";

/**
 * @openapi
 * components:
 *   schemas:
 *     loginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Successfully logged in!"
 *         accessToken:
 *           type: string
 *           description: "JWT AccessToken"
 */
export class LoginReturnDTO {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
