import React, { useState } from 'react';

const ProjectCard = ({ project, onDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(project.apiKey || `df_live_${project.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status colors & labels based on mock states
  const statusConfig = {
    healthy: { bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', label: 'Healthy', pulse: 'bg-emerald-400' },
    warning: { bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', label: 'Warning', pulse: 'bg-amber-400' },
    inactive: { bg: 'bg-slate-500/10 text-slate-400 border-slate-500/20', label: 'Inactive', pulse: 'bg-slate-400' }
  };

  const status = project.status || 'healthy';
  const currentStatus = statusConfig[status] || statusConfig.healthy;

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Decorative Glow */}
      <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20"></div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-indigo-400 transition-colors duration-200">
            {project.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Created on {new Date(project.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        </div>

        {/* Status Badge */}
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${currentStatus.bg}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${currentStatus.pulse} animate-pulse`}></span>
          {currentStatus.label}
        </span>
      </div>

      {/* API Key / Token Section */}
      <div className="mt-5 rounded-lg bg-slate-950/80 p-3 border border-slate-800/80 flex items-center justify-between gap-3">
        <div className="overflow-hidden">
          <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">Client Token</span>
          <span className="font-mono text-xs text-slate-300 truncate block mt-0.5">
            {project.key || `df_live_${project.id}`}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex-shrink-0 p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Copy Token"
        >
          {copied ? (
            <svg className="w-4.5 h-4.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          )}
        </button>
      </div>

      {/* Stats Section */}
      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-800/60 pt-4 text-center">
        <div>
          <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">Logs</span>
          <span className="text-sm font-semibold text-slate-200">{project.logsCount || 0}</span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">Errors</span>
          <span className={`text-sm font-semibold ${project.errorsCount > 0 ? 'text-rose-400' : 'text-slate-200'}`}>
            {project.errorsCount || 0}
          </span>
        </div>
        <div>
          <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">Latency</span>
          <span className="text-sm font-semibold text-slate-200">{project.latency || '--'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <button className="flex-1 text-center py-2 px-3 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-400 hover:text-white font-medium text-xs transition-all duration-200">
          Open Console
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="p-2 rounded-lg border border-slate-800 hover:border-rose-500/30 text-slate-500 hover:text-rose-400 hover:bg-rose-500/5 transition-all duration-200"
          title="Delete Project"
        >
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
