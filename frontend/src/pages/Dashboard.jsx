import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaNewspaper, FaUsers, FaImages } from "react-icons/fa";
import { AllContext } from "../App";

function Dashboard() {
  const navigate = useNavigate();
  const { news, gallery, users, organizationalImage } = useContext(AllContext);

  const [stats, setStats] = useState({
    newsCount: 0,
    usersCount: 0,
    galleryCount: 0,
  });

  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageId, setImageId] = useState("");
  const [fetchedImage, setFetchedImage] = useState(null);

  const backendUrl = "http://localhost:3000/api";

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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `${backendUrl}/organizational-structure/image`,
        {
          method: "POST",
          body: formData,
        }
      );

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

  const handleFetchImage = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/organizational-structure/get-image-organizational-structure`
      );

      if (!response.ok) {
        alert("Gagal mengambil gambar!");
        return;
      }

      const imageUrl = URL.createObjectURL(await response.blob());
      setFetchedImage(imageUrl);
    } catch (error) {
      console.error("Gagal mengambil gambar", error);
      alert("Gagal mengambil gambar!");
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
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Upload Gambar ke Database</h2>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
            Upload
          </button>

          {uploadedImage && (
            <div style={{ marginTop: "20px" }}>
              <h3>Gambar Terupload</h3>
              <p>ID: {uploadedImage.id}</p>
              <p>Nama File: {uploadedImage.filename}</p>
            </div>
          )}

          <hr />

          <h2>Ambil Gambar dari Database</h2>
          <input
            type="text"
            placeholder="Masukkan ID gambar"
            value={imageId}
            onChange={(e) => setImageId(e.target.value)}
          />
          <button onClick={handleFetchImage} style={{ marginLeft: "10px" }}>
            Ambil Gambar
          </button>

          {fetchedImage && (
            <div style={{ marginTop: "20px" }}>
              <h3>Gambar yang Diambil</h3>
              <img
                src={fetchedImage}
                alt="Fetched"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
