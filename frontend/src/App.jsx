import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoutes from './utilities/ProtectedRoutes.jsx'

function App() {

  const backendUrl = 'http://localhost:8000'

  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  // console.log('Logged IN.. ', loggedIn)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes auth={{ loggedIn, setLoggedIn, Url: { backendUrl } }} />}>
          <Route path="/" element={<Home Url={backendUrl} user={user} />} />
        </Route>
        <Route path="/login" element={<Login auth={{ user, setUser, Url: { backendUrl } }} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
