import { IUser } from '@/types'
import { makeAutoObservable } from 'mobx'
import AuthService from './services/AuthService'

export default class Store {
	user = {} as IUser
	isAuth = false
	constructor() {
		makeAutoObservable(this)
	}
	setAuth(bool: boolean) {
		this.isAuth = bool
	}
	setUser(user: IUser) {
		this.user = user
	}

	async login(email: string, password: string) {
		try {
			const res = await AuthService.login(email, password)
			console.log(res)

			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (error) {
			console.log(error)
		}
	}
	async registration(email: string, password: string) {
		try {
			const res = await AuthService.registration(email, password)
			console.log(res)

			localStorage.setItem('token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (error) {
			console.log(error)
		}
	}
	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token ')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (error) {
			console.log(error)
		}
	}
}
