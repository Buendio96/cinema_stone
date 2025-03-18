import { queryClient } from '@/shared/api/query-client'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useAppSelector } from '../../../shared/redux'
import { authApi } from '../api/api'
import { authSlice } from '../services/auth.slice'

export function useUser() {
	const token = useAppSelector(authSlice.selectors.token)
	return useQuery({
		...authApi.getUser(),
		enabled: Boolean(token),
		initialData: () => queryClient.getQueryData(authApi.getUser().queryKey),
		staleTime: 1000 * 60 * 5,
		retry: false,
	})
}

export function useSuspenseUser() {
	return useSuspenseQuery({
		...authApi.getUser(),
	})
}
