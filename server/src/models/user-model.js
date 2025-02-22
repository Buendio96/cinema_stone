import mongoose, { Schema } from 'mongoose'



const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String, required: false },
})

export const userModel = mongoose.model('User', UserSchema)
