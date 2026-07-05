function PageLayout({ title, intro, children }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
                <header className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-indigo-300/80">DevFlux interface</p>
                    <div className="space-y-3">
                        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
                        {intro && <p className="max-w-2xl text-slate-400">{intro}</p>}
                    </div>
                </header>
                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}

export default PageLayout
