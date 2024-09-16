import express from 'express';
import { createUserController, deleteUserByIdController, getAllUsersController, getUserByIdController, updateUserController } from '../controller/user.controller';
const router = express();

router.get('/', getAllUsersController);
router.get('/:id',getUserByIdController);

router.post('/', createUserController);
router.put('/:id', updateUserController);

router.delete('/:id', deleteUserByIdController);

export default router;
