import jwt from 'jsonwebtoken'
import { tokenModel } from '../models/token-model.js'

export class TokenService {
	generateTokens(payload) {
		const accessSecret = process.env.JWT_ACCESS_SECRET
		const refreshSecret = process.env.JWT_REFRESH_SECRET

		if (!accessSecret || !refreshSecret) {
			throw new Error(
				'JWT_ACCESS_SECRET or JWT_REFRESH_SECRET are not defined in environment variables'
			)
		}

		//Создаем два токена
		const accessToken = jwt.sign(payload, accessSecret, {
			expiresIn: '30m',
		})

		const refreshToken = jwt.sign(payload, refreshSecret, {
			expiresIn: '30d',
		})

		return { accessToken, refreshToken }
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (e) {
			return null
		}
	}

	async saveToken(userId, refreshToken) {
		//Есть ли такой токен у какого то пользователя
		const tokenData = await tokenModel.findOne({ user: userId })

		//Если да то перезаписуем на новый токен
		if (tokenData) {
			tokenData.refreshToken = refreshToken

			//И сохраняем в БД
			return tokenData.save()
		}

		//Создаем токен для нового юзера
		const token = await tokenModel.create({ user: userId, refreshToken })

		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({ refreshToken })
		return tokenData
	}

	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({ refreshToken })
		return tokenData
	}
}

export const isTokenService = new TokenService()
