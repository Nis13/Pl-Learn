import express from "express";
import * as userRoutes from "../controller/user.controller";
import { validationMiddleware } from "../middleware/validator";
import { CreateUserDTO } from "../DTO/createUser.dto";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
const router = express();

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Returns all users
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: Users not found
 */
router.get("/", userRoutes.getAll);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Returns all user by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createUserResponse'
 *       404:
 *          description: Not found
 */

router.get("/:id", userRoutes.getById);

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Creates a new user and returns the info of the created user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/createUserSchema"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createUserResponse'
 *       400:
 *         description: Bad Request Error
 */
router.post("/", validationMiddleware(CreateUserDTO), userRoutes.create);

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: updates the existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/updateUserSchema"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createUserResponse'
 *       400:
 *         description: Bad Request Error
 */
router.put("/:id", validationMiddleware(UpdateUserDTO), userRoutes.updateById);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: delete the user by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: A successful deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User of ID: c6cc6f98-cdda-45ba-a20e-6a033cb778d4 successfully deleted"
 *       404:
 *          description: User not found
 */
router.delete("/:id", userRoutes.deleteById);

export default router;
