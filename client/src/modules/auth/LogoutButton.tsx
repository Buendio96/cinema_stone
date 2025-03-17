export default function LogoutButton() {
	const dispatch = useAppDispatch()
	return (
		<button
			onClick={() => dispatch(logoutThunk())}
			className='mt-2 block rounded   bg-gray-300 text-lg font-semibold text-red-950 py-1 px-3 disabled:opacity-50'
		>
			Logout
		</button>
	)
}
