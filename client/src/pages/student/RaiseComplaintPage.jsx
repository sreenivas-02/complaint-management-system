import { useState } from "react";
import api from "../../services/api.js";

const categories = ["Hostel", "Academics", "Infrastructure", "Library", "Others"];
const priorities = ["Low", "Medium", "High"];

const RaiseComplaintPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState("Medium");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("priority", priority);
      Array.from(files).forEach((file) => {
        formData.append("attachments", file);
      });
      await api.post("/complaints", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setDescription("");
      setFiles([]);
      setMessage("Complaint submitted successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-sm font-semibold mb-3 text-slate-50">Raise a new complaint</h2>
      {message && (
        <p className="mb-2 text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-800 px-3 py-2 rounded-md">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-2 text-xs text-rose-400 bg-rose-900/30 border border-rose-800 px-3 py-2 rounded-md">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block text-slate-300 mb-1">
            Title
          </label>
          <input
            className="w-full rounded-md border border-slate-700 bg-slate-900 text-slate-100 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows="4"
            className="w-full rounded-md border border-slate-700 bg-slate-900 text-slate-100 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-300 mb-1">
              Category
            </label>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-900 text-slate-100 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 mb-1">
              Priority
            </label>
            <select
              className="w-full rounded-md border border-slate-700 bg-slate-900 text-slate-100 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-slate-300 mb-1">
            Attachments (PDF only, optional)
          </label>
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 transition"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white px-4 py-2 disabled:opacity-60 transition"
        >
          {loading ? "Submitting..." : "Submit complaint"}
        </button>
      </form>
    </div>
  );
};

export default RaiseComplaintPage;
