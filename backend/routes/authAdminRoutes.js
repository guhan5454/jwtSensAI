import Router from 'express'
const authAdminRoutes = Router();
import {  admin_login_post, admin_signup } from '../controller/authAdminController.js';
import verifyTokenAdmin from '../middleware/authAdminMiddleware.js';
import { admin_dashboard } from '../controller/adminController.js';


authAdminRoutes.post('/login',  admin_login_post)
authAdminRoutes.get('/dashboard', verifyTokenAdmin, admin_dashboard)
authAdminRoutes.post('/register', admin_signup)

// authAdminRoutes.get('./logout', logout_post)

export default authAdminRoutes;