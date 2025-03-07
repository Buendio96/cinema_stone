import { IAuthResponse } from '@/types/response/AuthResponse'
import { AxiosResponse } from 'axios'
import $api from '../http'
import { queryOptions } from '@tanstack/react-query'

export const authApi = {
	baseKey: 'users',

	getAccessToken: (token: string) => {
		return queryOptions({
			queryKey: [authApi.baseKey, 'token', token],
			queryFn: (meta) =>
				$api.get<IAuthResponse>(`/refresh`, {
					signal: meta.signal,
				}),
		})
	},
	login: async ({
		login,
		password,
	}: {
		login: string
		password: string
	}): Promise<AxiosResponse<IAuthResponse>> => {
		return $api.post<IAuthResponse>('/login', { login, password })
	},
}
