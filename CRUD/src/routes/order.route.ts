import express from "express";
import * as OrderController from "../controller/order.controller";
import { validationMiddleware } from "../middleware/validator";
import { CreateOrderDTO } from "../DTO/createOrder.dto";
import { authorize } from "../middleware/auth";
import { Role } from "../constants/role.enum";
import { UpdateOrderDTO } from "../DTO/updateOrder.dto";

const router = express();

/**
 * @openapi
 * /order:
 *   get:
 *     summary: Returns all orders
 *     tags:
 *       - Order
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/createOrderResponse'
 *       404:
 *         description: No orders available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are no Products available"
 *       401:
 *         description: Unauthorized
 */
router.get("/", authorize(Role.Admin), OrderController.getAll);

/**
 * @openapi
 * /order/{id}:
 *   get:
 *     summary: Returns Order by ID
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createOrderResponse'
 *       404:
 *          description: Not found
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order of ID: 3fa85f64-5717-4562-b3fc-2c963f66afa6 not found"
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authorize(Role.Admin), OrderController.getById);

/**
 * @openapi
 * /order:
 *   post:
 *     summary: Creates a new order and returns the info of the created order
 *     tags:
 *       - Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/createOrderSchema"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createOrderResponse'
 *       400:
 *         description: Bad Request Error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authorize(Role.Admin, Role.Admin),
  validationMiddleware(CreateOrderDTO),
  OrderController.create
);

/**
 * @openapi
 * /order:
 *   put:
 *     summary: Updates the order
 *     tags:
 *       - Order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/createOrderSchema"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createOrderResponse'
 *       400:
 *         description: Bad Request Error
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  authorize(Role.Admin, Role.Admin),
  validationMiddleware(UpdateOrderDTO),
  OrderController.updateById
);

/**
 * @openapi
 * /order/{id}:
 *   delete:
 *     summary: delete the order by Id
 *     tags:
 *       - Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to delete
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
 *                   example: "Order of ID: c6cc6f98-cdda-45ba-a20e-6a033cb778d4 successfully deleted"
 *       404:
 *          description: Order not found
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order of ID: 3fa85f64-5717-4562-b3fc-2c963f66afa6 not found"
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  authorize(Role.Admin, Role.Admin),
  OrderController.deleteById
);

export default router;
