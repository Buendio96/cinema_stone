import { ObjectId } from 'mongodb'

export interface IUserDto {
	email: string
	_id: ObjectId
	isActivated: boolean
}

export class UserDto {
	email: string
	id: ObjectId
	isActivated: boolean

	constructor(model: IUserDto) {
		this.email = model.email
		this.id = model._id
		this.isActivated = model.isActivated
	}
}
