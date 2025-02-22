import {
	Registration,
	isUserService,
} from '../service/user-service.js'

class UserController {
	async registration(
		req,
		res
	) {
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

	async login(req, res, next) {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async logout(req, res, next) {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async activate(
		req,
		res,
		next
	) {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async refresh(
		req,
		res,
		next
	) {
		try {
		} catch (e) {
			console.log(e)
		}
	}

	async getUsers(
		req,
		res,
		next
	) {
		try {
			res.json(['123', '456', '789', '123414'])
		} catch (e) {
			console.log(e)
		}
	}
}

export const isUserController = new UserController()
