import express from "express";
import * as ProductController from "../controller/product.controller";
import { validationMiddleware } from "../middleware/validator";
import { CreateProductDTO } from "../DTO/createProduct.dto";
import { UpdateProductDTO } from "../DTO/updateProduct.dto";
const router = express();

router.get("/", ProductController.getAllController);
router.get("/:id", ProductController.getByIdController);
router.post(
  "/",
  validationMiddleware(CreateProductDTO),
  ProductController.createController
);
router.put(
  "/:id",
  validationMiddleware(UpdateProductDTO),
  ProductController.updateByIdController
);
router.delete("/:id", ProductController.deleteByIdController);

router.put("/category/:id", ProductController.addCategoryToProduct);

export default router;
