import express from "express";
import * as userRoutes from "../controller/user.controller";
import { validationMiddleware } from "../middleware/validator";
import { CreateUserDTO } from "../DTO/createUser.dto";
import { UpdateUserDTO } from "../DTO/updateUser.dto";
const router = express();

router.get("/", userRoutes.getAllController);
router.get("/:id", userRoutes.getByIdController);

router.post(
  "/",
  validationMiddleware(CreateUserDTO),
  userRoutes.createController
);
router.put(
  "/:id",
  validationMiddleware(UpdateUserDTO),
  userRoutes.updateByIdController
);

router.delete("/:id", userRoutes.deleteByIdController);

export default router;
