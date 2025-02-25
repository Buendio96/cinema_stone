import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { router } from './routes/auth-router.js'
import { errorMiddleware } from './middlewares/error-middleware.js'

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.user(errorMiddleware())

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)

		app.listen(PORT, () => console.log('server started, PORT: ' + PORT))
	} catch (e) {
		console.log(e)
	}
}
start()
