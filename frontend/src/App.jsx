import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem('devfluxUser')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const auth = useMemo(
    () => ({
      user,
      login: (data) => {
        window.localStorage.setItem('devfluxUser', JSON.stringify(data.user))
        window.localStorage.setItem('devfluxAccessToken', data.access)
        window.localStorage.setItem('devfluxRefreshToken', data.refresh)
        setUser(data.user)
      },
      logout: () => {
        window.localStorage.removeItem('devfluxUser')
        window.localStorage.removeItem('devfluxAccessToken')
        window.localStorage.removeItem('devfluxRefreshToken')
        setUser(null)
      },
    }),
    [user],
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard auth={auth} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
