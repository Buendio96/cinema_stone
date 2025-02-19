import { NextFunction, Request, Response } from 'express'

class AuthController {
	async registration(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
		} catch (e) {
			console.log(e)
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

export const authController = new AuthController()
