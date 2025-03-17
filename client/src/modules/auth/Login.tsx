import { useAppDispatch, useAppSelector } from '@/shared/redux'
import { authSlice } from './services/auth.slice'
import { loginThunk, useLoginLoading } from './services/login-thunk'

export default function Login() {
	const dispatch = useAppDispatch()
	const loginError = useAppSelector(authSlice.selectors.loginError)
	const isLoading = useLoginLoading()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)

		const email = formData.get('login')?.toString().trim() ?? ''
		const password = formData.get('password')?.toString().trim() ?? ''

		if (email === '' || password === '') return
		dispatch(loginThunk(email, password))
	}
	return (
		<section className='flex min-h-[100vh] justify-center items-center  bg-slate-950'>
			<form
				className='flex flex-col w-1/3  gap-y-5 px-3 pt-6'
				onSubmit={handleSubmit}
			>
				<h2 className='text-3xl text-white text-center uppercase'>Login</h2>
				<input
					className='rounded-xl bg-white px-4 py-1'
					type='text'
					name='login'
				></input>
				<input
					className='rounded-xl bg-white px-4 py-1'
					type='password'
					name='password'
				></input>
				{loginError && (
					<div className='text-rose-900 font-semibold'>{loginError}</div>
				)}
				<button
					disabled={isLoading}
					className='bg-amber-900 text-white font-semibold uppercase rounded border disabled:text-gray-400'
				>
					Enter
				</button>
			</form>
		</section>
	)
}
