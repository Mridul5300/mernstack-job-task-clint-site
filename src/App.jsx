import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './Pages/Navbar/Navbar'

function App() {
  const location = useLocation()
  const hideNavbarRoutes = ['/login', '/signin'] 

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname)

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
