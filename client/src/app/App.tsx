import { useUser } from '@/modules/auth/hooks/use-user'
import Login from '@/modules/auth/Login'

export default function App() {
	const user = useUser()

	if (user.isLoading) {
		return <div className='text-xl text-fuchsia-900'>Loading....</div>
	}

	if (user.data) {
		return (
			<div className='flex flex-col min-h-[100vh] gap-y-20 px-3 pt-6 justify-center gap-x-5 text-white bg-slate-950'>
				<span className='text-2xl font-bold'>{}</span>Lorem ipsum, dolor sit
				amet consectetur adipisicing elit. Id rem ea labore doloribus pariatur,
				eligendi odio a esse neque optio repellendus, qui laudantium modi. Nemo
				enim id doloribus culpa ducimus hic sapiente aut similique odio mollitia
				facere cumque vitae fugiat sed ea, at ipsum. Vero pariatur quasi non
				laboriosam molestiae.
			</div>
		)
	}
	if (user.isError) {
		console.log(user.error)
	}
	return (
		<>
			{/* <Registration /> */}
			<Login />
		</>
	)
}
