import { queryClient } from '@/shared/api/query-client'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useAppSelector } from '../../../shared/redux'
import { authApi } from '../api/api'
import { authSlice } from '../services/auth.slice'

export function useUser() {
	const data = queryClient.getQueryData(authApi.getUser().queryKey)
	console.log(data)

	const token = useAppSelector(authSlice.selectors.token)
	return useQuery({
		...authApi.getUser(),
		enabled: Boolean(token),
	})
}

export function useSuspenseUser() {
	return useSuspenseQuery({
		...authApi.getUser(),
	})
}
