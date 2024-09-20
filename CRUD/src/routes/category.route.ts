import express from "express";
import * as CategoryController from "../controller/category.controller";
const router = express();

router.post("/", CategoryController.createController);

export default router;
