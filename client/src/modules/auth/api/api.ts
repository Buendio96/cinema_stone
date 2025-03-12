import { queryOptions } from '@tanstack/react-query'
import { jsonApiInstance } from '../../../shared/api/api-instance'

export type UserDto = {
	id: string
	login: string
	password: string
}
export interface IUser {
	id: string
	isActivated: boolean
	email: string
}
export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}
export const authApi = {
	baseKey: 'user',
	getUser: () => {
		return queryOptions({
			queryKey: [authApi.baseKey, 'byToken'],
			queryFn: (meta) =>
				jsonApiInstance<IAuthResponse>(`/refresh`, {
					method: 'GET',
					signal: meta.signal,
					credentials: 'include',
				}),
		})
	},
	loginUser: async ({
		email,
		password,
	}: {
		email: string
		password: string
	}) => {
		return jsonApiInstance<IAuthResponse>(`/login`, {
			method: 'POST',
			json: {
				email: email,
				password: password,
			},
			credentials: 'include',
		})
	},
}
