import { Router } from "express";
import authController from '../controllers/auth.controller.js'
import { auth } from "../middleware/auth.middleware.js";

export const authRouter = Router()

authRouter.post('/signup', authController.signup)
authRouter.post('/login', authController.login)
authRouter.get('/user', auth, authController.get_user)
authRouter.put('/update-user', auth, authController.updateUser)
