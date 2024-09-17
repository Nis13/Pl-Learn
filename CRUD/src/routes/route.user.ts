import express from 'express';
import * as userRoutes from '../controller/user.controller';
const router = express();

router.get('/', userRoutes.getAllController);
router.get('/:id',userRoutes.getByIdController);

router.post('/', userRoutes.createController);
router.put('/:id', userRoutes.updateByIdController);

router.delete('/:id', userRoutes.deleteByIdController);

export default router;
