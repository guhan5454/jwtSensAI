import Router from 'express'
const authUserRoutes = Router();
import { signup_get , signup_post , login_post} from '../controller/authUserController.js';
// import verifyToken from '../middleware/authMiddleware.js';

authUserRoutes.get('/signup', signup_get)
authUserRoutes.post('/signup', signup_post)
authUserRoutes.post('/login', login_post)



// authRoutes.get('./logout', logout_post)

export default authUserRoutes;