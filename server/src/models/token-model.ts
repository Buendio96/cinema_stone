import mongoose, { Document, Schema } from 'mongoose'

interface IToken extends Document {
	user: mongoose.Types.ObjectId
	refreshToken: string
}

const TokenSchema = new Schema<IToken>({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	refreshToken: { type: String, required: true },
})

export const TokenModel = mongoose.model<IToken>('Token', TokenSchema)
