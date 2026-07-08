import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

const Home = ({ Url, user, getMe }) => {
    const navigate = useNavigate();
    const uname = user ? user.username : "Developer";
    // console.log(Url)
    const getProjects = async () => {
        const response = await fetch(`${Url}/logs/getprojects`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'applications/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        const projects = await response.json()
        console.log(projects)
        setProjects(projects)
    }

    useEffect(() => {
        getProjects();
    }, [])

    // Initial projects data
    const initialProjects = [
        {
            id: "1",
            name: "E-Commerce Webapp",
            createdAt: "2026-06-15T08:30:00Z",
            apiKey: "df_live_a1b2c3d4e5f6g7h8",
            status: "healthy",
            logsCount: 14208,
            errorsCount: 0,
            latency: "24ms"
        },
        {
            id: "2",
            name: "Auth Service API",
            createdAt: "2026-06-20T14:15:00Z",
            apiKey: "df_live_g7h8i9j0k1l2m3n4",
            status: "warning",
            logsCount: 8940,
            errorsCount: 12,
            latency: "118ms"
        },
        {
            id: "3",
            name: "Payment Processor Gateway",
            createdAt: "2026-07-01T10:00:00Z",
            apiKey: "df_live_o5p6q7r8s9t0u1v2",
            status: "healthy",
            logsCount: 2315,
            errorsCount: 0,
            latency: "42ms"
        }
    ];

    // Load from localstorage if available, otherwise use initial
    const [projects, setProjects] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectStatus, setNewProjectStatus] = useState("healthy");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        type: "", // "deleteProject" or "signOut"
        title: "",
        message: "",
        confirmText: "",
        confirmStyle: "primary", // "danger" or "primary"
        data: null,
    });

    // Sync projects to localStorage

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleSignOutClick = () => {
        setConfirmModal({
            isOpen: true,
            type: "signOut",
            title: "Sign Out",
            message: "Are you sure you want to sign out of your account?",
            confirmText: "Sign Out",
            confirmStyle: "primary",
            data: null,
        });
    };

    const createProject = async () => {
        const response = await fetch(`${Url}/logs/createproject/`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            'body': JSON.stringify({
                'name': newProjectName,
            })
        })
        const project = await response.json()
        console.log(project)
        return project
    }

    const handleCreateProject = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!newProjectName.trim()) {
            setFormError("Project name is required");
            return;
        }

        if (projects.some(p => p.name.toLowerCase() === newProjectName.trim().toLowerCase())) {
            setFormError("A project with this name already exists");
            return;
        }

        setIsSubmitting(true);

        // Simulate API network call delay for satisfying UX
        const newProj = await createProject();

        setProjects(newProj);
        setIsSubmitting(false);
        setIsModalOpen(false);
        setNewProjectName("");
        setNewProjectStatus("healthy");
    };

    const handleDeleteProject = (id) => {
        const project = projects.find(p => p.id === id);
        if (!project) return;
        setConfirmModal({
            isOpen: true,
            type: "deleteProject",
            title: "Delete Project",
            message: `Are you sure you want to delete "${project.name}"? This will permanently delete the project and all of its associated logs. This action cannot be undone.`,
            confirmText: "Delete Project",
            confirmStyle: "danger",
            data: id,
        });
    };

    const handleConfirmAction = async () => {
        if (confirmModal.type === "deleteProject") {
            const id = confirmModal.data;
            setIsSubmitting(true);
            try {
                const response = await fetch(`${Url}/logs/deleteproject/${id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                if (response.ok) {
                    setProjects(prev => prev.filter(p => p.id !== id));
                } else {
                    console.error("Failed to delete project on backend");
                }
            } catch (err) {
                console.error("Error deleting project:", err);
            } finally {
                setIsSubmitting(false);
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        } else if (confirmModal.type === "signOut") {
            handleLogout();
            setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
    };

    // Filter projects by search term
    const filteredProjects = projects.length > 0 ? (projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )) : []

    // Statistics calculation
    const totalLogs = 0
    const totalErrors = 0
    const healthyCount = 0

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 font-sans">
            {/* Decorative background glow */}
            <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-900/10 blur-3xl"></div>
            <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-900/10 blur-3xl"></div>

            {/* Navbar */}
            <nav className="border-b border-slate-900 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                                    DevFlux
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/15 font-mono uppercase tracking-wider">
                                    Beta
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-1.5 text-sm text-slate-300">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
                                Signed in as <span className="font-semibold text-white ml-1">{uname}</span>
                            </div>

                            <button
                                onClick={handleSignOutClick}
                                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Container */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Welcome Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{uname}</span>
                    </h1>
                    <p className="mt-2 text-base text-slate-400">
                        Monitor backend events, track errors, and inspect performance latency metrics across your platform.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Total Projects</span>
                        <span className="mt-2 block text-3xl font-bold text-white">{projects.length}</span>
                        <span className="text-xs text-slate-500 mt-1 block">Active across DevFlux</span>
                    </div>

                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Total Events Logged</span>
                        <span className="mt-2 block text-3xl font-bold text-indigo-400">{totalLogs.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 mt-1 block">Logs ingested this month</span>
                    </div>

                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">Total Active Errors</span>
                        <span className={`mt-2 block text-3xl font-bold ${totalErrors > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                            {totalErrors}
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block">Unresolved exceptions</span>
                    </div>

                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-6 backdrop-blur-sm">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">System Status</span>
                        <span className="mt-2 flex items-center gap-2 text-3xl font-bold text-emerald-400">
                            <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></span>
                            {healthyCount === projects.length && projects.length > 0 ? "Optimal" : "Degraded"}
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block">All systems operating normally</span>
                    </div>
                </div>

                {/* Action / Filtering Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-4 py-2 border border-slate-800 rounded-xl bg-slate-900/40 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
                        />
                    </div>

                    {/* Create Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Project
                    </button>
                </div>

                {/* Projects Grid / Empty State */}
                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.key}
                                project={project}
                                onDelete={handleDeleteProject}
                            />
                        ))}

                        {/* Inline Creation Card */}
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/10 p-8 text-center cursor-pointer hover:border-indigo-500/50 hover:bg-slate-900/30 transition-all duration-200"
                        >
                            <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-indigo-650/10 group-hover:text-indigo-400 transition-colors duration-200">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-sm font-semibold text-slate-300 group-hover:text-white">Create New Project</h3>
                            <p className="mt-1 text-xs text-slate-500">Add an environment and generate client logging key.</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center rounded-2xl border border-slate-900 bg-slate-900/20 py-16 px-4">
                        <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto text-slate-500 mb-4">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-300">No Projects Found</h3>
                        <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
                            {searchTerm
                                ? `No projects matched "${searchTerm}". Try resetting your search terms.`
                                : "Get started by creating your first software project for logging events."}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md transition-all duration-200"
                            >
                                Create First Project
                            </button>
                        )}
                    </div>
                )}
            </main>

            {/* Creation Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => {
                            if (!isSubmitting) setIsModalOpen(false);
                        }}
                    ></div>

                    {/* Modal Container */}
                    <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h2 className="text-xl font-semibold text-white">Create New Project</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                disabled={isSubmitting}
                                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleCreateProject} className="mt-4 space-y-4">
                            <div>
                                <label htmlFor="projectName" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    disabled={isSubmitting}
                                    placeholder="e.g. Gateway Service API"
                                    value={newProjectName}
                                    onChange={(e) => {
                                        setNewProjectName(e.target.value);
                                        if (formError) setFormError("");
                                    }}
                                    className="block w-full px-3.5 py-2 border border-slate-800 rounded-lg bg-slate-950 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150 disabled:opacity-50"
                                />
                                {formError && <p className="mt-1.5 text-xs text-rose-400 font-medium">{formError}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Initial Status
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {["healthy", "warning", "inactive"].map((status) => (
                                        <label
                                            key={status}
                                            className={`relative flex items-center justify-center p-3 rounded-lg border text-xs font-medium cursor-pointer uppercase select-none transition-all duration-200 ${newProjectStatus === status
                                                ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                                                : "border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="projectStatus"
                                                value={status}
                                                checked={newProjectStatus === status}
                                                disabled={isSubmitting}
                                                onChange={() => setNewProjectStatus(status)}
                                                className="sr-only"
                                            />
                                            {status}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all duration-150 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all duration-150 disabled:opacity-80"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Project"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal Dialog */}
            {confirmModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                        onClick={() => {
                            if (!isSubmitting) setConfirmModal(prev => ({ ...prev, isOpen: false }));
                        }}
                    ></div>

                    {/* Modal Container */}
                    <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
                        {/* Close Button */}
                        <button
                            onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                            disabled={isSubmitting}
                            className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={`mt-0.5 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                confirmModal.confirmStyle === "danger"
                                    ? "bg-rose-500/10 text-rose-500"
                                    : "bg-indigo-500/10 text-indigo-400"
                            }`}>
                                {confirmModal.confirmStyle === "danger" ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">
                                    {confirmModal.title}
                                </h3>
                                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                                    {confirmModal.message}
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                                className="px-4 py-2 rounded-lg border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold transition-all duration-150 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmAction}
                                disabled={isSubmitting}
                                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold shadow-md transition-all duration-150 disabled:opacity-80 ${
                                    confirmModal.confirmStyle === "danger"
                                        ? "bg-rose-600 hover:bg-rose-500 text-white"
                                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    confirmModal.confirmText
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;