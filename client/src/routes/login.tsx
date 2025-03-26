import LoginForm from '@/modules/auth/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
	component: Login,
})

export default function Login() {
	return (
		<>
			{/* <Registration /> */}
			<LoginForm />
		</>
	)
}
