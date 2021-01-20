import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = Router();

router.post('/users', UserController.store);
router.post('/session', SessionController.authenticate);

export default router;