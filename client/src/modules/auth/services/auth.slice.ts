import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '../../../shared/redux'

type AuthState = {
	token: string | undefined
	loginError?: string
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: localStorage.getItem('token'),
	} as AuthState,
	selectors: {
		token: (state) => state.token,
		loginError: (state) => state.loginError,
	},
	reducers: {
		setAuth(state, action: PayloadAction<{ token: string }>) {
			state.token = action.payload.token
			state.loginError = undefined
		},
		logout(state) {
			state.token = undefined
		},
		setError(state, action: PayloadAction<string | undefined>) {
			state.loginError = action.payload
		},
	},
}).injectInto(rootReducer)
const access =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBnbWFpbC5jb20iLCJpZCI6IjY3Y2IxNzM3MDJhYzgwODNmNTQ3MDBjYSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzQxMzYyOTk5LCJleHAiOjE3NDEzNjMwMjl9.vKIWgpLdt86PjqKTZHBxra7-ZwpOkTIcp1kCAayxjf8'
const refresh =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZEBnbWFpbC5jb20iLCJpZCI6IjY3Y2IxNzM3MDJhYzgwODNmNTQ3MDBjYSIsImlzQWN0aXZhdGVkIjpmYWxzZSwiaWF0IjoxNzQxMzYyOTk5LCJleHAiOjE3NDM5NTQ5OTl9.6EwIzw4F-eQOk4ed9JJzPG9o7Wrxf1wal8xmQ_SKEwM'
