import express from "express";
import * as userController from "../controller/user.controller";
import { validationMiddleware } from "../middleware/validator";
import { CreateUserDTO } from "../DTO/createUser.dto";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
import passport from "../passport";
import { authorize } from "../middleware/auth";
import { Role } from "../constants/role.enum";
const router = express();

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Returns all users
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createUserResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Users not found
 */

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin),
  userController.getAll
);

/**
 * @openapi
 * /user/my-detail:
 *   get:
 *     summary: Returns the loggedin user's detail
 *     tags:
 *      - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createUserResponse'
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/my-detail",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.User),
  userController.getMyDetail
);
/**
 * @openapi
 * /user/{id}:
 *   get:
 *     summary: Returns user by Id
 *     tags:
 *      - User
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized
 */

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin),
  userController.getById
);

/**
 * @openapi
 * /user/signup:
 *   post:
 *     summary: Creates a new user and returns the info of the created user
 *     tags:
 *      - Auth
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
router.post(
  "/signup",
  validationMiddleware(CreateUserDTO),
  userController.create
);

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: updates the existing user
 *     tags:
 *      - User
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin),
  validationMiddleware(UpdateUserDTO),
  userController.updateById
);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: delete the user by Id
 *     tags:
 *      - User
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
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin),
  userController.deleteById
);

export default router;
