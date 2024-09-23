import express from "express";
import * as OrderController from "../controller/order.controller";

const router = express();

/**
 * @openapi
 * /order:
 *   get:
 *     summary: Returns all orders
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
 */
router.get("/", OrderController.getAllController);

/**
 * @openapi
 * /order/{id}:
 *   get:
 *     summary: Returns Order by ID
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
 */
router.get("/:id", OrderController.getByIdController);

/**
 * @openapi
 * /order:
 *   post:
 *     summary: Creates a new order and returns the info of the created order
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
 */
router.post("/", OrderController.createController);

/**
 * @openapi
 * /order/{id}:
 *   put:
 *     summary: updates the existing order
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
 *       404:
 *         description: Not found Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product of ID: c6cc6f98-cdda-45ba-a20e-6a033cb778d4 notfound"
 */
router.put("/:id", OrderController.updateByIdController);

/**
 * @openapi
 * /order/{id}:
 *   delete:
 *     summary: delete the order by Id
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
 *                   example: "POrder of ID: c6cc6f98-cdda-45ba-a20e-6a033cb778d4 successfully deleted"
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
 */
router.delete("/:id", OrderController.deleteByIdController);

export default router;
