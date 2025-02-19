import { Router } from 'express'
import { authController } from '../controllers/auth-controller.js'
export const router = Router()

router.post('/registration', authController.registration)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.get('/users', authController.getUsers)
