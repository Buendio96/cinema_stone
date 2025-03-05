export interface IUser {
	id: string
	isActivated: boolean
	email: string
}

export type UserDto = {
	id: string
	login: string
	password: string
}
