import express from "express";
import * as ProductController from "../controller/product.controller";
const router = express();

router.get("/", ProductController.getAllController);
router.get("/:", ProductController.getByIdController);
router.post("/", ProductController.createController);
router.put("/:id", ProductController.updateByIdController);
router.delete("/:id", ProductController.deleteByIdController);

export default router;
