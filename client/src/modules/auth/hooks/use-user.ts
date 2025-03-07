import { useAppSelector } from '@/shared/redux'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { authApi } from '../api/api'
import { authSlice } from '../services/auth.slice'

export function useUser() {
	const accessToken = useAppSelector(authSlice.selectors.token)

	return useQuery({
		...authApi.getUserById(accessToken!),
		enabled: Boolean(accessToken),
	})
}

export function useSuspenseUser() {
	const userId = useAppSelector(authSlice.selectors.userId)

	return useSuspenseQuery({
		...authApi.getUserById(userId!),
	})
}
