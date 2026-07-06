import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'

function App() {

  const backendUrl = 'http://localhost:8000'

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user')
    return userData ? JSON.parse(userData) : null
  });


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login auth={{ user, setUser }} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
