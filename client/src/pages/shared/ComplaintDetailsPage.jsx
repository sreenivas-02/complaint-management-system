import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api.js";
import StatusBadge from "../../components/StatusBadge.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const resolveAttachmentUrl = (url) => {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/uploads/")) return `/api${url}`;
  return url;
};

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        const path =
          user?.role === "admin"
            ? `/admin/complaints/${id}`
            : `/complaints/${id}`;
        const { data } = await api.get(path);
        setComplaint(data);
      } catch {
        // ignore
      }
    };
    load();
  }, [id, user?.role]);

  if (!complaint) {
    return <p className="text-xs text-slate-500">Loading complaint...</p>;
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">{complaint.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{complaint.category}</p>
        </div>
        <StatusBadge status={complaint.status} />
      </div>
      <p className="text-sm text-slate-300 whitespace-pre-line leading-relaxed bg-slate-900 border border-slate-800 p-4 rounded-xl">
        {complaint.description}
      </p>
      {complaint.attachments && complaint.attachments.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <h3 className="text-xs font-semibold mb-2 text-slate-50">Attachments</h3>
          <ul className="space-y-1 text-xs">
            {complaint.attachments.map((url, idx) => (
              <li key={idx}>
                <a
                  href={resolveAttachmentUrl(url)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  PDF {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {complaint.comments && complaint.comments.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <h3 className="text-xs font-semibold mb-3 text-slate-50">Comments</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            {complaint.comments.map((c) => (
              <li
                key={c._id}
                className="border border-slate-800 bg-slate-950 rounded-lg p-3"
              >
                <p>{c.message}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComplaintDetailsPage;
