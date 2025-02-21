import { NextFunction, Request, Response } from 'express'
import {
	IResponseRegistration,
	isUserService,
} from '../service/user-service.js'

class UserController {
	async registration(
		req: Request,
		res: Response<IResponseRegistration>
	): Promise<Response<IResponseRegistration>> {
		try {
			const { email, password } = req.body
			const userData = await isUserService.registration(email, password)

			// Устанавливаем refreshToken в куки
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (e) {
			console.log(e)

			return res.status(500).json()
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async activate(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async refresh(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async getUsers(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			res.json(['123', '456', '789', '123414'])
		} catch (e) {
			console.log(e)
		}
	}
}

export const isUserController = new UserController()
