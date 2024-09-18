import express from "express";
import userRouter from "./route.user";
import productRouter from "./route.product";

const router = express.Router();

router.use("/user", userRouter);
router.use("/product", productRouter);

export default router;
