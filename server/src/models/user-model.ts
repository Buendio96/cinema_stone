import { ObjectId } from 'mongodb'
import mongoose, { Document, Schema } from 'mongoose'

export interface IUserModel extends Document {
	_id: ObjectId
	email: string
	password: string
	isActivated: boolean
	activationLink?: string
}

const UserSchema = new Schema<IUserModel>({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String, required: false },
})

export const UserModel = mongoose.model<IUserModel>('User', UserSchema)
