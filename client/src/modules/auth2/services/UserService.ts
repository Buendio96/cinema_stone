import $api from '@/shared/api/axiosAuth'
import { IUser } from '@/types'
import { AxiosResponse } from 'axios'

export default class AuthService {
	static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
		return $api.get<IUser[]>('/users')
	}
}
