import { Router } from 'express';
const adminRoutes = Router()
import { admin_dashboard } from '../controller/adminController.js';
import verifyTokenAdmin from '../middleware/authAdminMiddleware.js';

adminRoutes.get('/dashboard', verifyTokenAdmin, admin_dashboard)


export default  adminRoutes;