import { AuthModel, IAuthModel } from '../models/auth-model.js'

export class AuthService {
	async registration(email: string, password: string): Promise<IAuthModel> {
		//Проверка или есть такой User
		const candidate = await AuthModel.findOne({ email })

		//Создания ошибки для обработки в контролере
		if (candidate) {
			throw new Error(`User with this Email: ${email} already exists`)
		}

		//Создаем User
		const user = await AuthModel.create({ email, password })

		return user
	}
}
