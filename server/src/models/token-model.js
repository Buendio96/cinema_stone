import mongoose, { Schema } from 'mongoose'


const TokenSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	refreshToken: { type: String, required: true },
})

export const TokenModel = mongoose.model('Token', TokenSchema)
