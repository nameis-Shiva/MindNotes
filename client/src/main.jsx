import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthContextWrapper } from './context/AuthContext.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthContextWrapper>
         <RouterProvider router={router}/>
      </AuthContextWrapper>
  </StrictMode>,
)
