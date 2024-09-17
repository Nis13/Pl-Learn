import express from'express';
import* as userRoutes from'../controller/user.controller';
const router = express();

router.get('/', userRoutes.getAllUsersController);
router.get('/:id',userRoutes.getUserByIdController);

router.post('/', userRoutes.createUserController);
router.put('/:id', userRoutes.updateUserController);

router.delete('/:id', userRoutes.deleteUserByIdController);

export default router;
