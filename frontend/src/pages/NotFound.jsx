import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import PageLayout from '../components/PageLayout.jsx'

function NotFound() {
    return (
        <PageLayout
            title="Page not found"
            intro="The route you requested does not exist. Use the button below to return to the login page and continue."
        >
            <div className="mx-auto w-full max-w-xl">
                <div className="rounded-[32px] border border-white/10 bg-slate-900/90 p-10 text-center shadow-2xl shadow-slate-950/20">
                    <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">404</p>
                    <h2 className="mt-6 text-4xl font-semibold text-white">We can’t find that page</h2>
                    <p className="mt-4 text-slate-400">If you typed the address manually, double-check the spelling or go back to the application home.</p>
                    <Link to="/login" className="mt-8 inline-block w-full sm:w-auto">
                        <Button>Return to login</Button>
                    </Link>
                </div>
            </div>
        </PageLayout>
    )
}

export default NotFound
