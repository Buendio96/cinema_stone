const BASE_URL = 'http://localhost:4000/api'

export class ApiError extends Error {
	message: string
	status: number
	errors: { field?: string; message: string }[]

	constructor(
		response: Response,
		message: string,
		errors: { field?: string; message: string }[] = []
	) {
		super(message)
		this.message = message
		this.status = response.status
		this.errors = errors
	}

	static async fromResponse(response: Response) {
		const errorData = await response.json().catch(() => ({}))
		return new ApiError(
			response,
			errorData.message || `ApiError: ${response.status}`,
			errorData.errors || []
		)
	}
}

export const jsonApiInstance = async <T>(
	url: string,
	init?: RequestInit & { json?: unknown }
) => {
	let headers = init?.headers ?? {}

	if (init?.json) {
		headers = { 'Content-Type': 'application/json', ...headers }
		init.body = JSON.stringify(init.json)
	}

	const result = await fetch(`${BASE_URL}${url}`, {
		...init,
		headers,
		credentials: 'include',
	})

	if (result.status === 401) {
		localStorage.removeItem('token')

		throw await ApiError.fromResponse(result)
	}

	if (!result.ok) {
		throw await ApiError.fromResponse(result)
	}

	return result.json() as Promise<T>
}
