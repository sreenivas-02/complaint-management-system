import { useEffect, useState } from "react";
import api from "../../services/api.js";
import AnalyticsChart from "../../components/AnalyticsChart.jsx";

const ReportsPage = () => {
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
    return <p className="text-xs text-slate-500">Loading reports...</p>;
  }

  const summary = stats.totals;
  const chartData = stats.byCategory.map((c) => ({
    name: c._id,
    value: c.count,
  }));

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 text-xs text-slate-300">
        <h2 className="text-sm font-semibold mb-2 text-slate-50">Summary</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <li>Total complaints: <span className="text-slate-50 font-medium">{summary.totalComplaints}</span></li>
          <li>Pending: <span className="text-amber-500 font-medium">{summary.pending}</span></li>
          <li>In Progress: <span className="text-blue-500 font-medium">{summary.inProgress}</span></li>
          <li>Resolved: <span className="text-emerald-500 font-medium">{summary.resolved}</span></li>
          <li>Rejected: <span className="text-rose-500 font-medium">{summary.rejected}</span></li>
        </ul>
      </div>
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
        <h2 className="text-sm font-semibold mb-2 text-slate-50">By category</h2>
        <AnalyticsChart data={chartData} />
      </div>
    </div>
  );
};

export default ReportsPage;
