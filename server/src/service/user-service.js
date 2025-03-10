import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '../dtos/user-dto.js'
import { ApiError } from '../exceptions/api-error.js'
import { userModel } from '../models/user-model.js'
import { isMailService } from './mail-service.js'
import { isTokenService } from './token-service.js'

class UserService {
	async registration(
		email,
		password
	) {
		//Проверка или есть такой User по Email
		const candidate = await userModel.findOne({ email })

		//Создания ошибки для обработки в контролере
		if (candidate) {
			throw ApiError.BadRequest(`User with this Email: ${email} already exists`)
		}

		// хешируем пароль
		const hashPassword = await bcrypt.hash(password, 10)

		// генерация ссылки активации
		const activationLink = uuidv4()

		//Создаем User
		const user = await userModel.create({ email, password: hashPassword, activationLink })


		//Создаем токены для User
		const userDto = new UserDto(user)
		const tokens = isTokenService.generateTokens({ ...userDto })

		await isTokenService.saveToken(userDto.id, tokens.refreshToken)

		//Отправляем письмо с активцией
		await isMailService.sendActivationMail(email, `${process.env.CLIENT_URL}/api/activate/${activationLink}`)

		return { ...tokens, user: userDto }
	}

	async activate(activationLink) {
		const user = await userModel.findOne({ activationLink })
		if (!user) {
			throw ApiError.BadRequest('Link is uncorrected')
		}

		user.isActivated = true

		await user.save()
	}

	async login(email, password) {
		//Проверка на наличия емейла и проброс ошибки
		const user = await userModel.findOne({ email })
		if (!user) {
			throw ApiError.BadRequest(`There is no user with this email address: ${email}`)
		}

		//Проверка пароль с базой данных
		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) {
			throw ApiError.BadRequest('The password is incorrect')
		}

		const userDto = new UserDto(user)
		const tokens = isTokenService.generateTokens({ ...userDto })

		await isTokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}


	async logout(refreshToken) {
		const token = await isTokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		//Если нету токена ошибка
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}

		//Валидируем рефреш токен и проверяем или он есть БД, если нет, пользователь не авторизован и ошибка
		const userData = isTokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await isTokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		//Ищем пользователя по ID и достаем нужны поля с помощью userDto для клиента
		const user = await userModel.findById(userData.id)
		const userDto = new UserDto(user)

		//Создаем пару токенов для пользователя
		const tokens = isTokenService.generateTokens({ ...userDto })

		//Сохраняем на БД и возвращаем обьект, пользователь и токены
		await isTokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async getAllUsers() {
		const users = await userModel.find()
		return users
	}
}
export const isUserService = new UserService()
