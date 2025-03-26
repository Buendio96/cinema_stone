import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { genreFilms } from './list'

interface IRegistrationForm {
	nickname: string
	email: string
	password: string
	passwordConfirm: string
	genre: string[]
}

export default function Registration() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		clearErrors,
	} = useForm<IRegistrationForm>({
		defaultValues: {
			genre: [],
		},
	})

	const submit: SubmitHandler<IRegistrationForm> = (data) => {
		console.log(data)
	}
	const error: SubmitErrorHandler<IRegistrationForm> = (data) => {
		console.log(data)
	}

	return (
		<div>
			<div>
				<h2>Registration Form</h2>
				<form onSubmit={handleSubmit(submit, error)}>
					<label htmlFor='nickname'>Nickname</label>
					<input
						id='nickname'
						type='text'
						placeholder='eg: annihilator3000'
						{...(register('nickname'),
						{
							required: true,
						})}
						aria-invalid={errors.nickname ? true : false}
					/>

					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						placeholder='eg: myTheBestEmail@test.com'
						{...(register('email'),
						{
							required: true,
						})}
					/>

					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						placeholder='A very strong password'
						{...(register('password'),
						{
							required: true,
						})}
					/>

					<label htmlFor='passwordConfirm'>Re-enter the password</label>
					<input
						id='passwordConfirm'
						type='password'
						placeholder='A very strong password once again'
						{...(register('passwordConfirm'),
						{
							required: true,
						})}
					/>

					<fieldset>
						<legend>Choose your favorite movie genre</legend>

						{genreFilms.map((genre, index) => (
							<div key={index}>
								<input
									type='checkbox'
									id={genre}
									value={genre}
									{...register('genre')}
								/>
								<label htmlFor={genre}>
									{genre.charAt(0).toUpperCase() + genre.slice(1)}
								</label>
							</div>
						))}
					</fieldset>

					<button
						type='submit'
						className='bg-amber-900 text-white font-semibold uppercase rounded border disabled:text-gray-400'
					>
						Register me
					</button>
					<button onClick={() => clearErrors()} type='button'>
						clear
					</button>
				</form>
				{watch('nickname')}
			</div>
		</div>
	)
}
