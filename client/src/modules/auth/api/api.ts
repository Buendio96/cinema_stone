import { jsonApiInstance } from '@/shared/api/api-instance'
import { UserDto } from '@/types'
import { queryOptions } from '@tanstack/react-query'

export const authApi = {
	baseKey: '',

	getUserById: (id: string) => {
		return queryOptions({
			queryKey: [authApi.baseKey, 'byId', id],
			queryFn: (meta) =>
				jsonApiInstance<UserDto>(`/users/${id}`, {
					signal: meta.signal,
				}),
		})
	},

	loginUser: async ({
		login,
		password,
	}: {
		login: string
		password: string
	}) => {
		return jsonApiInstance<UserDto[]>(
			`/users?login=${login}&password=${password}`
		)
	},
}
