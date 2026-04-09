import { useEffect, useState } from "react";
import api from "../../services/api.js";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setProfile(data);
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  if (!profile) {
    return <p className="text-xs text-slate-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-md rounded-xl bg-slate-900 border border-slate-800 p-6 text-sm space-y-4">
      <h2 className="text-base font-semibold mb-2 text-slate-50">Profile</h2>
      <p className="text-slate-300">
        <span className="font-semibold text-slate-50">Name:</span> {profile.name}
      </p>
      <p className="text-slate-300">
        <span className="font-semibold text-slate-50">Email:</span> {profile.email}
      </p>
      <p className="text-slate-300">
        <span className="font-semibold text-slate-50">Role:</span> {profile.role}
      </p>
      <p className="text-slate-300">
        <span className="font-semibold text-slate-50">Department:</span>{" "}
        {profile.department || "-"}
      </p>
      <p className="text-xs text-slate-500 pt-2">
        Member since {new Date(profile.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProfilePage;

