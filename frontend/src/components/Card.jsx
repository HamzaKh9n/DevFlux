function Card({ title, children, className = '' }) {
    return (
        <section className={`rounded-[28px] border border-white/10 bg-slate-900/85 p-6 shadow-2xl shadow-slate-950/20 ${className}`}>
            {title && <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>}
            <div className="space-y-4 text-slate-300">{children}</div>
        </section>
    )
}

export default Card
