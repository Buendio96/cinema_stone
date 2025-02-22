import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { UserDto } from '../dtos/user-dto.js'
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
			throw new Error(`User with this Email: ${email} already exists`)
		}

		// хешируем пароль
		const hashPassword = await bcrypt.hash(password, 10)

		// генерация ссылки активации
		const activationLink = uuidv4()

		//Создаем User
		const user = await userModel.create({ email, password: hashPassword, activationLink })
		await isMailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

		const userDto = new UserDto(user)
		const tokens = isTokenService.generateTokens({ ...userDto })

		await isTokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	}
}
export const isUserService = new UserService()
