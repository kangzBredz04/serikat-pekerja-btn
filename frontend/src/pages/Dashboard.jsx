import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaNewspaper, FaUsers, FaImages } from "react-icons/fa";
import { api } from "../utils";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    newsCount: 10,
    usersCount: 10,
    galleryCount: 10,
  });
  const [orgImage, setOrgImage] = useState(
    localStorage.getItem("orgImage") || ""
  );

  useEffect(() => {
    const adminId = localStorage.getItem("id_admin");
    const fullName = localStorage.getItem("full_name");

    if (!adminId || !fullName) {
      navigate("/unauthorized");
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOrgImage(reader.result);
        localStorage.setItem("orgImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setOrgImage("");
    localStorage.removeItem("orgImage");
  };

  return (
    <div className="min-h-[80vh] bg-gray-100 p-6 mx-auto max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Dashboard Admin
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* News Card */}
        <div className="bg-white p-5 rounded-lg shadow-lg border-b-4 border-red-500 transition transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaNewspaper className="text-red-600 text-5xl" />
            <div>
              <p className="text-gray-600">Total News</p>
              <h2 className="text-3xl font-bold">{stats.newsCount}</h2>
            </div>
          </div>
          <a
            href="/news"
            className="text-red-500 text-sm mt-4 block hover:underline"
          >
            Read More →
          </a>
        </div>

        {/* Users Card */}
        <div className="bg-white p-5 rounded-lg shadow-lg border-b-4 border-blue-500 transition transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaUsers className="text-blue-600 text-5xl" />
            <div>
              <p className="text-gray-600">Total Users</p>
              <h2 className="text-3xl font-bold">{stats.usersCount}</h2>
            </div>
          </div>
          <a
            href="/users"
            className="text-blue-500 text-sm mt-4 block hover:underline"
          >
            Read More →
          </a>
        </div>

        {/* Gallery Card */}
        <div className="bg-white p-5 rounded-lg shadow-lg border-b-4 border-green-500 transition transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <FaImages className="text-green-600 text-5xl" />
            <div>
              <p className="text-gray-600">Total Gallery</p>
              <h2 className="text-3xl font-bold">{stats.galleryCount}</h2>
            </div>
          </div>
          <a
            href="/gallery"
            className="text-green-500 text-sm mt-4 block hover:underline"
          >
            Read More →
          </a>
        </div>
      </div>

      {/* Struktur Organisasi */}
      <div className="mt-8 p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Struktur Organisasi</h2>
        {orgImage ? (
          <div>
            <img
              src={orgImage}
              alt="Struktur Organisasi"
              className="mx-auto max-w-full h-auto rounded-lg shadow"
            />
            <button
              onClick={handleRemoveImage}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700"
            >
              Hapus Gambar
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
