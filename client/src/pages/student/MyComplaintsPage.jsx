import { useEffect, useState } from "react";
import api from "../../services/api.js";
import ComplaintCard from "../../components/ComplaintCard.jsx";

const MyComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/complaints");
        setComplaints(data.data || []);
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-slate-50">My complaints</h2>
      {complaints.length === 0 ? (
        <p className="text-xs text-slate-400 bg-slate-900 border border-slate-800 p-6 rounded-xl text-center">No complaints found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {complaints.map((c) => (
            <ComplaintCard
              key={c._id}
              complaint={c}
              basePath="/student/complaints"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaintsPage;
