import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaNewspaper, FaUsers, FaImages, FaUpload } from "react-icons/fa";
import { AllContext } from "../App";

function Dashboard() {
  const navigate = useNavigate();
  const { news, gallery, users } = useContext(AllContext);

  const [stats, setStats] = useState({
    newsCount: 0,
    usersCount: 0,
    galleryCount: 0,
  });

  const [orgImage, setOrgImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    setStats({
      newsCount: news?.length || 0,
      usersCount: users?.length || 0,
      galleryCount: gallery?.length || 0,
    });
  }, [news, users, gallery]);

  useEffect(() => {
    const adminId = localStorage.getItem("id_admin");
    const fullName = localStorage.getItem("full_name");

    if (!adminId || !fullName) {
      navigate("/unauthorized");
    }
  }, [navigate, orgImage]);

  const backendUrl = "http://localhost:3000";

  const handleImageChange = (event) => {
    setOrgImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!orgImage) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("image", orgImage);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadedImage(result.data);
        alert("Gambar berhasil diunggah!");
      } else {
        alert("Upload gagal!");
      }
    } catch (error) {
      console.error("Upload gagal", error);
      alert("Gagal mengunggah gambar!");
    }
  };

  const handleRemoveImage = () => {
    setOrgImage("");
    localStorage.removeItem("orgImage");
  };

  return (
    <div className="min-h-[80vh] p-6 mx-auto max-w-6xl">
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
            href="/admin-news"
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
            href="/admin-users"
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
            href="/admin-gallery"
            className="text-green-500 text-sm mt-4 block hover:underline"
          >
            Read More →
          </a>
        </div>
      </div>

      {/* Struktur Organisasi */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg text-center border border-gray-200">
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
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center">
            <FaUpload className="text-gray-400 text-6xl mb-4" />
            <p className="text-gray-600 mb-2">Upload Struktur Organisasi</p>
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              Pilih Gambar
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple={false}
              />
            </label>
            <button
              // onClick={handleUploadImage}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700"
            >
              Upload Gambar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
