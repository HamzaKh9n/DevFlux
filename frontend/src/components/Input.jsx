function Input({ label, id, className = '', ...props }) {
    return (
        <label className="space-y-3 text-sm text-slate-200">
            {label && <span className="block font-medium text-slate-100">{label}</span>}
            <input
                id={id}
                className={`w-full rounded-3xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${className}`}
                {...props}
            />
        </label>
    )
}

export default Input
