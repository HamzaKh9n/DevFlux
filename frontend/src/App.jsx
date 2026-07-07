import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoutes from './utilities/ProtectedRoutes.jsx'

function App() {

  const backendUrl = 'http://localhost:8000'

  const [loggedIn, setLoggedIn] = useState(false);

  function getCookie(name) {
    // Decode the cookie string to handle special characters
    const decodedCookie = decodeURIComponent(document.cookie);
    // Split the string into individual cookie pairs (name=value)
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      // Check if this is the cookie we are looking for
      if (cookie.indexOf(name + "=") === 0) {
        return cookie.substring(name.length + 1);
      }
    }
    return "";
  }

  const getMe = async () => {
    let token = localStorage.getItem('accessToken');
    if (!token) {
      console.log("Get A Token Bro")
      return false
    }
    const response = await fetch(`${backendUrl}/auth/me`, {
      'method': 'GET',
      'headers': {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status == 401) {
      console.log("status 401, no token or token expired")
      const refreshToken = getCookie('refreshToken');
      // console.log('refesh', refreshToken)
      const getNewToken = async () => {
        const response = await fetch(`${backendUrl}/auth/token/refresh/`, {
          'method': "POST",
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({
            'refresh': refreshToken
          })
        })
        const data = await response.json();
        if (response.ok) {
          console.log("got token")
          localStorage.removeItem('accessToken')
          localStorage.setItem('accessToken', data.access)
          return true
        }
        else {
          console.log("failed to get")
          return false
        }
      }
      const gotNewToken = getNewToken();
      return gotNewToken
    }
    if (response.ok) {
      return true
    }
  }

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
        <Route element={<ProtectedRoutes auth={{ loggedIn, setLoggedIn, Url: { backendUrl }, getMe: { getMe } }} />}>
          <Route path="/" element={<Home Url={backendUrl} user={user} getMe={getMe} />} />
        </Route>
        <Route path="/login" element={<Login auth={{ user, setUser, Url: { backendUrl }, getMe: { getMe } }} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
