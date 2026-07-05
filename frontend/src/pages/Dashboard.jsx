import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import PageLayout from '../components/PageLayout.jsx'

function Dashboard({ auth }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.logout()
        navigate('/login')
    }

    return (
        <PageLayout
            title="Dashboard overview"
            intro="Welcome back. Your DevFlux dashboard brings key metrics and quick actions into one polished workspace."
        >
            <div className="mx-auto w-full max-w-6xl space-y-6">
                <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-indigo-300/80">Welcome</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">Hi, {auth.user?.username ?? auth.user?.name ?? 'User'}</h2>
                        <p className="mt-2 max-w-2xl text-slate-400">Your current session is active. Use the navigation below to explore logs, alerts, and environment controls.</p>
                    </div>
                    <Button variant="secondary" onClick={handleLogout} className="max-w-xs">
                        Log out
                    </Button>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                    <Card title="Quick actions">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <NavLink
                                to="/dashboard/streams"
                                className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 text-left transition hover:border-indigo-500/30 hover:bg-slate-900/95"
                            >
                                <p className="text-sm font-semibold text-white">Stream health</p>
                                <p className="mt-2 text-sm text-slate-400">Review load, traffic, and uptime status.</p>
                            </NavLink>
                            <NavLink
                                to="/dashboard/settings"
                                className="rounded-3xl border border-slate-700/80 bg-slate-950/80 p-5 text-left transition hover:border-indigo-500/30 hover:bg-slate-900/95"
                            >
                                <p className="text-sm font-semibold text-white">Workspace settings</p>
                                <p className="mt-2 text-sm text-slate-400">Adjust your visual theme and alerts quickly.</p>
                            </NavLink>
                        </div>
                    </Card>

                    <Card title="Live metrics">
                        <div className="space-y-4">
                            <div className="rounded-3xl bg-slate-950/80 px-5 py-4">
                                <p className="text-sm text-slate-400">Active pipelines</p>
                                <p className="mt-2 text-3xl font-semibold text-white">24</p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl bg-slate-950/80 px-5 py-4">
                                    <p className="text-sm text-slate-400">Pending alerts</p>
                                    <p className="mt-2 text-2xl font-semibold text-white">3</p>
                                </div>
                                <div className="rounded-3xl bg-slate-950/80 px-5 py-4">
                                    <p className="text-sm text-slate-400">Response time</p>
                                    <p className="mt-2 text-2xl font-semibold text-white">182ms</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </PageLayout>
    )
}

export default Dashboard
