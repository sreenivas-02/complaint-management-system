import { useEffect, useState } from "react";
import api from "../../services/api.js";
import ComplaintCard from "../../components/ComplaintCard.jsx";

const StudentDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/complaints?limit=5");
        setComplaints(data.data || []);
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <p className="text-xs text-slate-400 mb-2">Recent</p>
          <p className="text-2xl font-bold text-slate-50">
            {complaints.length}
          </p>
          <p className="text-xs text-slate-500 mt-2">Recent complaints</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-sm font-semibold mb-3 text-slate-200">
          Recent complaints
        </h2>
        {complaints.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 py-10 rounded-lg text-center">
            <p className="text-sm text-slate-400">
              You have not raised any complaints yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {complaints.map((c) => (
              <div key={c._id} className="bg-slate-900 border border-slate-800 rounded-lg">
                <ComplaintCard
                  complaint={c}
                  basePath="/student/complaints"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
