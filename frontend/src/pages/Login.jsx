import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import Input from '../components/Input.jsx'
import PageLayout from '../components/PageLayout.jsx'

function Login({ auth }) {
    const [mode, setMode] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password.')
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch(`/auth/${mode === 'login' ? 'login' : 'signup'}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username.trim(), password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed.')
            }

            auth.login(data)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageLayout
            title="Secure access for your DevFlux workspace"
            intro="Sign in or create an account to access the dashboard and your live system insights."
        >
            <div className="mx-auto w-full max-w-md">
                <Card>
                    <div className="mb-6 flex rounded-full border border-white/10 bg-slate-950/70 p-1">
                        <button
                            type="button"
                            onClick={() => {
                                setMode('login')
                                setError('')
                            }}
                            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'login' ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:text-white'}`}
                        >
                            Sign in
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setMode('signup')
                                setError('')
                            }}
                            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'signup' ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:text-white'}`}
                        >
                            Create account
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Input
                                id="username"
                                label="Username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="Choose a username"
                            />
                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                        {error && <p className="rounded-3xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}

                        <Button type="submit" className="mt-1" disabled={loading}>
                            {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
                        </Button>
                    </form>

                    <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-400">
                        <p className="font-medium text-slate-100">Simple JWT auth</p>
                        <p>Use any username and password to sign in or create a new account. The backend will issue access and refresh tokens automatically.</p>
                    </div>
                </Card>
            </div>
        </PageLayout>
    )
}

export default Login
