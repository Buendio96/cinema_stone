import { rootReducer } from '@/shared/store/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
	token: string | undefined
	isAuth: boolean
	loginError?: string
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: localStorage.getItem('token'),
		isAuth: false,
	} as AuthState,
	selectors: {
		token: (state) => state.token,
		isAuth: (state) => state.isAuth,
		loginError: (state) => state.loginError,
	},
	reducers: {
		authUser(state, action: PayloadAction<{ token: string; isAuth: boolean }>) {
			state.token = action.payload.token
			state.isAuth = action.payload.isAuth
			state.loginError = undefined
		},
		removeUser(state) {
			state.token = undefined
		},
		setError(state, action: PayloadAction<string | undefined>) {
			state.loginError = action.payload
		},
	},
}).injectInto(rootReducer)
