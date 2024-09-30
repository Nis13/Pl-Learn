import express from "express";
import * as CategoryController from "../controller/category.controller";
import { Role } from "../constants/role.enum";
import { authorize } from "../middleware/auth";
const router = express();

router.post("/", authorize(Role.Admin), CategoryController.create);

export default router;
