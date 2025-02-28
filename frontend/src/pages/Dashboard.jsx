import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaNewspaper, FaUsers, FaImages } from "react-icons/fa";
import { AllContext } from "../App";

function Dashboard() {
  const navigate = useNavigate();
  const { news, gallery, users, imageOrganizational } = useContext(AllContext);

  const [stats, setStats] = useState({
    newsCount: 0,
    usersCount: 0,
    galleryCount: 0,
  });

  const [image, setImage] = useState(null);
  const [fetchedImage, setFetchedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

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
  }, [navigate]);

  useEffect(() => {
    if (imageOrganizational) {
      setFetchedImage(imageOrganizational);
      setImageLoading(false);
    }
  }, [fetchedImage, imageOrganizational]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsImageSelected(true);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        // "https://serikat-pekerja-btn-api.vercel.app/api/organizational-structure/image",
        "http://localhost:3000/api/organizational-structure/image",
        { method: "POST", body: formData }
      );
      const result = await response.json();
      if (result.success) {
        alert("Gambar berhasil diunggah!");
        window.location.reload();
      } else alert("Upload gagal!");
    } catch {
      alert("Gagal mengunggah gambar!");
    } finally {
      setLoading(false);
    }
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
        <div className="flex flex-col items-center gap-4">
          {/* Skeleton Loader */}
          {imageLoading && (
            <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md" />
          )}

          {/* Tampilan gambar yang sudah ada */}
          {fetchedImage && !isImageSelected && (
            <img
              src={fetchedImage}
              alt="Organizational Structure"
              className="w-full h-auto rounded-md border border-gray-300"
            />
          )}

          {/* Pratinjau gambar yang dipilih */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-md border border-gray-500"
            />
          )}

          <div className="flex items-center gap-3">
            {/* Tombol Pilih Gambar */}
            {!isImageSelected && (
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Ganti Gambar
              </button>
            )}
            <input
              id="fileInput"
              type="file"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Tombol Batal & Lanjut Ganti */}
            {isImageSelected && (
              <>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  Batal Ganti
                </button>
                <button
                  onClick={handleUpload}
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Lanjut Ganti"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
