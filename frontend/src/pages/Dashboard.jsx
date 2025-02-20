import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaNewspaper, FaUsers, FaImages } from "react-icons/fa";
import { api } from "../utils";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    newsCount: 0,
    usersCount: 0,
    galleryCount: 0,
  });

  // Cek apakah user terotorisasi
  useEffect(() => {
    const adminId = localStorage.getItem("id_admin");
    const fullName = localStorage.getItem("full_name");

    if (!adminId || !fullName) {
      navigate("/unauthorized");
    } else {
      fetchStats();
    }
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const newsRes = await api.get("/news/count");
      const usersRes = await api.get("/users/count");
      const galleryRes = await api.get("/gallery/count");

      setStats({
        newsCount: newsRes.data.count || 0,
        usersCount: usersRes.data.count || 0,
        galleryCount: galleryRes.data.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* News Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaNewspaper className="text-red-600 text-4xl" />
          <div>
            <p className="text-gray-600">Total News</p>
            <h2 className="text-2xl font-bold">{stats.newsCount}</h2>
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaUsers className="text-blue-600 text-4xl" />
          <div>
            <p className="text-gray-600">Total Users</p>
            <h2 className="text-2xl font-bold">{stats.usersCount}</h2>
          </div>
        </div>

        {/* Gallery Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaImages className="text-green-600 text-4xl" />
          <div>
            <p className="text-gray-600">Total Gallery</p>
            <h2 className="text-2xl font-bold">{stats.galleryCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
