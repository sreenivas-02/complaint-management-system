import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";

const ComplaintCard = ({ complaint, basePath }) => {
  return (
    <Link
      to={`${basePath}/${complaint._id}`}
      className="block rounded-xl border border-slate-800 bg-slate-900 p-4 hover:bg-slate-800/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-50">
            {complaint.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400 line-clamp-2">
            {complaint.description}
          </p>
        </div>
        <StatusBadge status={complaint.status} />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{complaint.category}</span>
        <span className="font-medium">{complaint.priority} priority</span>
      </div>
    </Link>
  );
};

export default ComplaintCard;
