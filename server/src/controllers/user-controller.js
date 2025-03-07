import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-error.js'
import {
	isUserService,
} from '../service/user-service.js'

class UserController {
	async registration(
		req,
		res,
		next
	) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest('Validation`s error', errors.array()))
			}

			const { email, password } = req.body
			const userData = await isUserService.registration(email, password)

			// Устанавливаем refreshToken в куки
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (e) {
			next(e)


		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await isUserService.login(email, password)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			})

			return res.json(userData)
		} catch (e) {
			next(e)

		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await isUserService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)

		} catch (e) {
			next(e)

		}
	}

	async activate(
		req,
		res,
		next
	) {
		try {
			const activationLink = req.params.link
			await isUserService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e)

		}
	}

	async refresh(
		req,
		res,
		next
	) {
		try {
			const { refreshToken } = req.cookies
			const userData = await isUserService.refresh(refreshToken)
			res.cookie(
				'refreshToken',
				userData.refreshToken,
				{ maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }
			)
			return res.json(userData)
		} catch (e) {
			next(e)

		}
	}

	async getUsers(
		req,
		res,
		next
	) {
		try {
			const users = await isUserService.getAllUsers()
			return res.json(users)
		} catch (e) {
			next(e)

		}
	}
}

export const isUserController = new UserController()
