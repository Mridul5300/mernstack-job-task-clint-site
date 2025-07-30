import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import MainRoute from './Routes/MainRoute.jsx'
import { AuthProvider } from './Auth/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MainRoute />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
