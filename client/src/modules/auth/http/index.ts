import axios from 'axios'
export const BASE_URl = 'http://localhost:4000/api'

const $api = axios.create({
	withCredentials: true,
	baseURL: BASE_URl,
})

$api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default $api
