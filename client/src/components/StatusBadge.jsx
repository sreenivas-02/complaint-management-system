const statusStyles = {
  Pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  "In Progress": "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Resolved: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  Rejected: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
        statusStyles[status] || "bg-slate-500/10 text-slate-400 border border-slate-500/20"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
