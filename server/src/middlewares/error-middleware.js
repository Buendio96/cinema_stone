import { ApiError } from '../exceptions/api-error.js'

export function errorMiddleware(err, req, res, next) {
	if (err instanceof ApiError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors })
	}

	return res.status(500).json({ message: 'An unexpected error occurred' })
}