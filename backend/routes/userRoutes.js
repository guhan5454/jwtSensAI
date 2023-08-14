import { Router } from 'express';
const userRoutes = Router()
import { dashboard_get, refreshToken } from '../controller/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

userRoutes.get('/dashboard', verifyToken, dashboard_get)
userRoutes.post('/refreshToken', refreshToken )

export default  userRoutes;