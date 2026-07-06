import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const Login = ({ auth }) => {
    const navigate = useNavigate();
    const { user, setUser } = auth
    const [mode, setMode] = useState('login')
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (mode === 'signup' && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        try {
            const endpoint = mode === 'login' ? `http://localhost:8000/auth/login/` : `http://localhost:8000/auth/signup/`
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed')
            }

            localStorage.setItem('accessToken', data.access)
            document.cookie = `refreshToken=${data.refresh}; path=/; max-age=86400; SameSite=Lax`

            const meResponse = await fetch(`http://localhost:8000/auth/me`, {
                headers: {
                    Authorization: `Bearer ${data.access}`
                }
            })

            const meData = await meResponse.json()

            if (!meResponse.ok) {
                throw new Error(meData.error || 'Could not fetch user info')
            }

            // console.log(meData, auth)
            setUser({
                username: meData.username,
                access: data.access,
            })
            navigate('/')
            // console.log(user)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#f6fff8_0%,#ebfdf2_45%,#ffffff_100%)] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-[0_20px_80px_rgba(16,185,129,0.12)]">
                <div className="grid md:grid-cols-[1.05fr_0.95fr]">
                    <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 p-8 md:p-10 text-white flex flex-col justify-between">
                        <div>
                            <div className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
                                Welcome back
                            </div>
                            <h1 className="mt-6 text-3xl md:text-4xl font-semibold leading-tight">
                                Grow your workspace with a calm, modern sign-in experience.
                            </h1>
                            <p className="mt-4 max-w-md text-sm md:text-base text-emerald-50/90">
                                Access your dashboard securely with a fresh green-and-white interface designed to feel bright and effortless.
                            </p>
                        </div>

                        <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-emerald-50/90">
                            <p className="font-medium">Why users love it</p>
                            <ul className="mt-2 space-y-1">
                                <li>• Simple toggle between login and signup</li>
                                <li>• Clean, airy layout with soft green accents</li>
                                <li>• Friendly, modern feel without being too dark</li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-8 md:p-10">
                        <div className="flex rounded-full border border-emerald-100 bg-emerald-50 p-1">
                            <button
                                type="button"
                                onClick={() => setMode('login')}
                                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-700'}`}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode('signup')}
                                className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-emerald-600 text-white shadow-sm' : 'text-emerald-700'}`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <form className="mt-8 space-y-4" onSubmit={handleFormSubmit}>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Username</label>
                                <input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                />
                            </div>

                            {mode === 'signup' && (
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                    />
                                </div>
                            )}

                            {error && (
                                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-600">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                {mode === 'login' ? 'Login' : 'Create Account'}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
                            <button
                                type="button"
                                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                className="font-semibold text-emerald-600 hover:text-emerald-700"
                            >
                                {mode === 'login' ? 'Create an account' : 'Sign in instead'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login