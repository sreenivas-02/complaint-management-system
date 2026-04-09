import { useEffect, useState } from "react";
import api from "../../services/api.js";

const ManageStudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/admin/students");
        setStudents(data || []);
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-3 text-xs">
      <h2 className="text-sm font-semibold text-slate-50">Students</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-900">
            <tr className="text-left text-[11px] text-slate-400">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-950">
            {students.map((s) => (
              <tr key={s._id} className="hover:bg-slate-900/60 transition-colors text-slate-300">
                <td className="px-3 py-2 text-slate-50">{s.name}</td>
                <td className="px-3 py-2">{s.email}</td>
                <td className="px-3 py-2">{s.department || "-"}</td>
                <td className="px-3 py-2">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-3 py-4 text-center text-slate-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudentsPage;
