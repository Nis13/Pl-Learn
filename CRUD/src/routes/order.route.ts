import express from "express";
import * as OrderController from "../controller/order.controller";

const router = express();

router.get("/", OrderController.getAllController);
router.get("/:id", OrderController.getByIdController);
router.post("/", OrderController.createController);
router.put("/:id", OrderController.updateByIdController);
router.delete("/:id", OrderController.deleteByIdController);

export default router;
