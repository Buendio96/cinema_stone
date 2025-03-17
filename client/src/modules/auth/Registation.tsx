export default function Registation() {
	return (
		<div>
			<div>
				<h2></h2>
				<form action=''>
					<label htmlFor='nickname'>Email</label>
					<input id='nickname' type='text' placeholder='eg: annihilator3000' />

					<label htmlFor='email'>Email</label>
					<input
						id='email'
						type='email'
						placeholder='eg: myTheBestEmail@test.com'
					/>

					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						placeholder='A very strong password'
					/>
					<label htmlFor='password'>Re-enter the password</label>
					<input
						id='password'
						type='password'
						placeholder='A very strong password once again'
					/>

					<label htmlFor='password'>Email</label>
					<input id='password' />
				</form>
			</div>
		</div>
	)
}
