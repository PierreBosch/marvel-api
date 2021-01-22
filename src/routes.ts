import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = Router();

router.post('/users', UserController.store);
router.post('/session', SessionController.authenticate);
router.get('/users', authMiddleware, UserController.index);
router.put('/users', authMiddleware, UserController.update);

export default router;