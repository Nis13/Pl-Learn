import express from "express";
import * as ProductController from "../controller/product.controller";
import { validationMiddleware } from "../middleware/validator";
import { CreateProductDTO } from "../DTO/createProduct.dto";
import { UpdateProductDTO } from "../DTO/updateProduct.dto";
const router = express();

/**
 * @openapi
 * /product:
 *   get:
 *     summary: Returns all products
 *     responses:
 *       200:
 *         description: A successful response
 *       404:
 *         description: No products available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are no Products available"
 */
router.get("/", ProductController.getAllController);

/**
 * @openapi
 * /product/{id}:
 *   get:
 *     summary: Returns product by ID
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
 *               $ref: '#/components/schemas/createProductResponse'
 *       404:
 *          description: Not found
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product of ID: 3fa85f64-5717-4562-b3fc-2c963f66afa6 not found"
 */
router.get("/:id", ProductController.getByIdController);

/**
 * @openapi
 * /product:
 *   post:
 *     summary: Creates a new product and returns the info of the created product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/createProductSchema"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createProductResponse'
 *       400:
 *         description: Bad Request Error
 */
router.post(
  "/",
  validationMiddleware(CreateProductDTO),
  ProductController.createController
);

/**
 * @openapi
 * /product/{id}:
 *   put:
 *     summary: updates the existing product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/updateProductSchema"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createProductResponse'
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
router.put(
  "/:id",
  validationMiddleware(UpdateProductDTO),
  ProductController.updateByIdController
);

/**
 * @openapi
 * /product/{id}:
 *   delete:
 *     summary: delete the product by Id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
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
 *                   example: "Product of ID: c6cc6f98-cdda-45ba-a20e-6a033cb778d4 successfully deleted"
 *       404:
 *          description: Product not found
 */
router.delete("/:id", ProductController.deleteByIdController);

/**
 * @openapi
 * /products/category/{id}:
 *   put:
 *     summary: Add a category to a product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to which the category will be added
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "dbbde99c-03a9-4884-ac3a-d9d8270a1edb"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the category to be added to the product
 *                 example: "67e27f08-7709-4d04-ae36-76f85bdf888c"
 *     responses:
 *       200:
 *         description: Category successfully added to the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createProductResponse'
 *       404:
 *         description: Product or category not found
 */

router.put("/category/:id", ProductController.addCategoryToProduct);

export default router;
