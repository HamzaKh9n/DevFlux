function Button({ children, type = 'button', variant = 'primary', className = '', ...props }) {
    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
        secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600',
        ghost: 'bg-transparent text-slate-100 hover:bg-white/10',
    }

    return (
        <button
            type={type}
            className={`inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${variants[variant] ?? variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
