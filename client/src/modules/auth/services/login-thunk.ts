import { MutationObserver, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../../shared/api/query-client'
import { AppThunk } from '../../../shared/redux'
import { authApi } from '../api/api'
import { authSlice } from './auth.slice'

export const loginThunk =
	(email: string, password: string): AppThunk =>
	async (dispatch) => {
		try {
			const user = await new MutationObserver(queryClient, {
				mutationKey: ['login'],
				mutationFn: authApi.loginUser,
			}).mutate({
				email,
				password,
			})
			if (user) {
				dispatch(
					authSlice.actions.authUser({
						token: user.accessToken,
						isAuth: true,
					})
				)
				queryClient.setQueryData(authApi.getUser().queryKey, user)
				localStorage.setItem('token', user.accessToken)
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
