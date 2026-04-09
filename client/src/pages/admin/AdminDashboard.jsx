import { useEffect, useState } from "react";
import api from "../../services/api.js";
import AnalyticsChart from "../../components/AnalyticsChart.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/admin/complaints/stats");
        setStats(data);
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  if (!stats) {
    return <p className="text-xs text-slate-500">Loading analytics...</p>;
  }

  const summary = stats.totals;
  const chartData = stats.byCategory.map((c) => ({
    name: c._id,
    value: c.count,
  }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <p className="text-slate-400 mb-1">Total</p>
          <p className="text-2xl font-semibold text-slate-50">{summary.totalComplaints}</p>
        </div>
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <p className="text-amber-500 mb-1">Pending</p>
          <p className="text-2xl font-semibold text-amber-500">
            {summary.pending}
          </p>
        </div>
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <p className="text-blue-500 mb-1">In Progress</p>
          <p className="text-2xl font-semibold text-blue-500">
            {summary.inProgress}
          </p>
        </div>
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <p className="text-emerald-500 mb-1">Resolved</p>
          <p className="text-2xl font-semibold text-emerald-500">
            {summary.resolved}
          </p>
        </div>
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-3">
          <p className="text-rose-500 mb-1">Rejected</p>
          <p className="text-2xl font-semibold text-rose-500">
            {summary.rejected}
          </p>
        </div>
      </div>
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
        <h2 className="text-sm font-semibold mb-2 text-slate-50">
          Complaints by category
        </h2>
        <AnalyticsChart data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
