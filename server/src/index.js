import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { errorMiddleware } from './middlewares/error-middleware.js'
import { router } from './routes/auth-router.js'



const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}))
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL)

		app.listen(PORT, () => console.log('server started, PORT: ' + PORT))
	} catch (e) {
		console.log(e)
	}
}
start()
