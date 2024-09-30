import { Router } from "express";
import { login } from "../controller/auth.controller";
import { validationMiddleware } from "../middleware/validator";
import { LoginDTO } from "../DTO/login.dto";

const router = Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: "#/components/schemas/loginSchema"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *              $ref: "#/components/schemas/loginResponse"
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
router.post("/login", validationMiddleware(LoginDTO), login);

export default router;
