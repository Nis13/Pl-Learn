import express from "express";
import {
  createController,
  getAllController,
} from "../controller/product.controller";
const router = express();

router.get("/", getAllController);
router.post("/", createController);

export default router;
