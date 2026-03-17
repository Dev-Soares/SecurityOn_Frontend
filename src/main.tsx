import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './shared/contexts/themeContext'
import '@/api/interceptors/forbidden-interceptor'
import './assets/index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)