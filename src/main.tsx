import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/shared/contexts/themeContext'
import { UserProvider } from './shared/contexts/userContext'
import '@/api/interceptors/forbidden-interceptor'
import '@/assets/index.css'
import App from '@/App'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)