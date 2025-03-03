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
}
export const isUserService = new UserService()
