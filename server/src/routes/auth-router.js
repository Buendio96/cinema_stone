import { Router } from 'express'
import { body } from 'express-validator'
import { isUserController } from '../controllers/user-controller.js'
export const router = Router()

router.post('/registration',
	body('email').isEmail(),
	body('password').isLength({ min: 3, max: 32 }),
	isUserController.registration)
router.post('/login', isUserController.login)
router.post('/logout', isUserController.logout)
router.get('/activate/:link', isUserController.activate)
router.get('/refresh', isUserController.refresh)
router.get('/users', isUserController.getUsers)
