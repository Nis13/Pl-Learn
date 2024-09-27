import express from "express";
import userRouter from "./user.route";
import productRouter from "./product.route";
import orderRouter from "./order.route";
import categoryRouter from "./category.route";
import authRouter from "./auth.route";
import passport from "../passport";

const router = express.Router();

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use(
  "/product",
  passport.authenticate("jwt", { session: false }),
  productRouter
);
router.use(
  "/order",
  passport.authenticate("jwt", { session: false }),
  orderRouter
);
router.use(
  "/category",
  passport.authenticate("jwt", { session: false }),
  categoryRouter
);

export default router;
