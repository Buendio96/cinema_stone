import { Link, useLocation } from '@tanstack/react-router'

export const Navigation = () => {
	const location = useLocation()

	if (location.pathname === '/login') {
		return null
	}

	return (
		<div className='p-2 flex gap-2'>
			<Link to='/login'>Login</Link>
			<Link to='/home'>Home</Link>
		</div>
	)
}
