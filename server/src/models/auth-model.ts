import mongoose, { Document, Schema } from 'mongoose'

export interface IAuthModel extends Document {
	login: string
	password: string
	isActivated: boolean
	activationLink?: string
}

const AuthSchema = new Schema<IAuthModel>({
	login: { type: String, unique: true, require: true },
	password: { type: String, require: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
})

export const AuthModel = mongoose.model<IAuthModel>('Auth', AuthSchema)
