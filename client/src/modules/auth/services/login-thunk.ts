import { queryClient } from '@/shared/api/query-client'
import { AppThunk } from '@/shared/redux'
import { MutationObserver, useMutation } from '@tanstack/react-query'
import { authApi } from '../api/api'
import { authSlice } from './auth.slice'

export const loginThunk =
	(login: string, password: string): AppThunk =>
	async (dispatch) => {
		try {
			const user = await new MutationObserver(queryClient, {
				mutationKey: ['login'],
				mutationFn: authApi.login,
			}).mutate({
				login,
				password,
			})
			if (user) {
				dispatch(
					authSlice.actions.setAuth({
						token: user.data.accessToken,
					})
				)
				//queryClient.setQueryData(authApi.getUserById(user.id).queryKey, user)
				localStorage.setItem('token', user.data.accessToken)
			}
			dispatch(
				authSlice.actions.setError(
					'Password or Login is not correct, please try again'
				)
			)
		} catch (e) {
			console.log(e)
		}
	}

export const useLoginLoading = () =>
	useMutation({ mutationKey: ['login'] }).isPending
