import { Context } from '@/app/main'
import { FC, useContext, useState } from 'react'
const Login2: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		store.login(email, password)
	}

	const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		store.registration(email, password)
	}

	return (
		<section className='flex min-h-[100vh] justify-center items-center bg-slate-950'>
			<form
				className='flex flex-col w-1/3 gap-y-5 px-3 pt-6'
				onSubmit={handleSubmit}
			>
				<h2 className='text-3xl text-white text-center uppercase'>Login</h2>
				<input
					onChange={(e) => setEmail(e.target.value)}
					className='rounded-xl bg-white px-4 py-1'
					placeholder='email'
					value={email}
					type='text'
					name='email'
				/>
				<input
					onChange={(e) => setPassword(e.target.value)}
					className='rounded-xl bg-white px-4 py-1'
					placeholder='password'
					value={password}
					type='password'
					name='password'
				/>

				<button
					type='submit'
					className='bg-amber-900 text-white font-semibold uppercase rounded border disabled:text-gray-400'
				>
					Enter
				</button>
				<button
					type='button'
					onClick={handleRegister}
					className='bg-amber-900 text-white font-semibold uppercase rounded border disabled:text-gray-400'
				>
					Reg
				</button>
			</form>
		</section>
	)
}

export default Login2
