import { ApiError } from '@/shared/api/api-instance'
import { MutationObserver } from '@tanstack/react-query'
import { queryClient } from '../../../shared/api/query-client'
import { AppThunk } from '../../../shared/store/store'
import { authApi } from '../api/api'
import { authSlice } from './auth.slice'

export const loginThunk =
	(email: string, password: string): AppThunk =>
	async (dispatch) => {
		try {
			const response = await new MutationObserver(queryClient, {
				mutationKey: ['login'],
				mutationFn: authApi.loginUser,
			}).mutate({
				email,
				password,
			})

			if (response) {
				dispatch(
					authSlice.actions.authUser({
						token: response.accessToken,
						isAuth: true,
					})
				)
				queryClient.setQueryData(authApi.getUser().queryKey, response)
				localStorage.setItem('token', response.accessToken)
			}
		} catch (error) {
			if (error instanceof ApiError) {
				dispatch(
					authSlice.actions.setError(
						error.message || 'An unexpected error occurred'
					)
				)
			} else {
				dispatch(authSlice.actions.setError('An unexpected error occurred'))
			}
		}
	}
