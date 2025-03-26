import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Navigation } from '../shared/components/ui/navigation'

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<Navigation />
				<Outlet />
				<TanStackRouterDevtools />
			</>
		)
	},
})
