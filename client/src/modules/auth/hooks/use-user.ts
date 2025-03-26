import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useAppSelector } from '../../../shared/store/store'
import { authApi } from '../api/api'
import { authSlice } from '../services/auth.slice'

export function useUser() {
	const token = useAppSelector(authSlice.selectors.token)
	return useQuery({
		...authApi.getUser(),
		enabled: Boolean(token),
		staleTime: 1000 * 60 * 5,
		retry: false,
	})
}

export function useSuspenseUser() {
	return useSuspenseQuery({
		...authApi.getUser(),
	})
}
