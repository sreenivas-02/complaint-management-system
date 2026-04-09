import { useEffect, useState } from "react";
import api from "../../services/api.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const statuses = ["All", "Pending", "In Progress", "Resolved", "Rejected"];
const updateStatuses = ["Pending", "In Progress", "Resolved", "Rejected"];
const resolveAttachmentUrl = (url) => {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/uploads/")) return `/api${url}`;
  return url;
};

const ManageComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [draftStatusById, setDraftStatusById] = useState({});
  const [savingById, setSavingById] = useState({});
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    const params = {};
    if (statusFilter !== "All") params.status = statusFilter;
    if (search) params.search = search;
    try {
      const { data } = await api.get("/admin/complaints", { params });
      const rows = data.data || [];
      setComplaints(rows);
      setDraftStatusById((prev) => {
        const next = { ...prev };
        for (const c of rows) {
          if (!next[c._id]) next[c._id] = c.status;
        }
        return next;
      });
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load complaints.");
    }
  };

  const updateStatus = async (id, status) => {
    setError("");
    setSavingById((m) => ({ ...m, [id]: true }));
    try {
      const { data } = await api.put(`/admin/complaints/${id}/status`, {
        status,
      });
      setComplaints((rows) => rows.map((c) => (c._id === id ? data : c)));
      setDraftStatusById((m) => ({ ...m, [id]: data.status }));
    } catch (e) {
      setError(e.response?.data?.message || "Failed to update status.");
    } finally {
      setSavingById((m) => ({ ...m, [id]: false }));
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  return (
    <div className="space-y-4 text-xs">
      <h2 className="text-sm font-semibold text-slate-50">Manage complaints</h2>
      {error && (
        <p className="text-xs text-rose-400 bg-rose-900/40 border border-rose-800 px-3 py-2 rounded-md">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="inline-flex rounded-lg border border-slate-800 bg-slate-900 p-1">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md ${
                statusFilter === s
                  ? "bg-slate-800 text-slate-50 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          placeholder="Search by title or student name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={load}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
        >
          Apply
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-900">
            <tr className="text-left text-[11px] text-slate-400">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Attachments</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950">
            {complaints.map((c) => (
              <tr key={c._id} className="hover:bg-slate-900/60 transition-colors text-slate-300">
                <td className="px-4 py-3 text-slate-50 font-medium">{c.title}</td>
                <td className="px-4 py-3">{c.studentId?.name}</td>
                <td className="px-4 py-3">{c.category}</td>
                <td className="px-4 py-3 max-w-[320px]">
                  <div className="text-slate-300 whitespace-pre-wrap break-words">
                    {c.description}
                  </div>
                </td>
                <td className="px-4 py-3">{c.priority}</td>
                <td className="px-4 py-3">
                  {c.attachments?.length ? (
                    <div className="space-y-1">
                      {c.attachments.map((url, idx) => (
                        <a
                          key={`${c._id}-pdf-${idx}`}
                          href={resolveAttachmentUrl(url)}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-blue-400 hover:underline"
                        >
                          PDF {idx + 1}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-500">No file</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={c.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={draftStatusById[c._id] || c.status}
                      onChange={(e) =>
                        setDraftStatusById((m) => ({
                          ...m,
                          [c._id]: e.target.value,
                        }))
                      }
                      className="rounded-md border border-slate-700 bg-slate-900 text-slate-100 px-2 py-1 flex-1 min-w-[100px] focus:border-blue-500"
                    >
                      {updateStatuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => updateStatus(c._id, draftStatusById[c._id] || c.status)}
                      disabled={!!savingById[c._id]}
                      className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-50 font-medium disabled:opacity-50 transition-colors"
                    >
                      {savingById[c._id] ? "Saving..." : "Update"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {complaints.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageComplaintsPage;
