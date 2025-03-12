import { store } from '@/shared/redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '../styles/index.css'
import App from './App'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<ReactQueryDevtools initialIsOpen={false} />
				<App />
			</Provider>
		</QueryClientProvider>
	</StrictMode>
)
