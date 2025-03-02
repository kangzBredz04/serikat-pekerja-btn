/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { MdImageNotSupported } from "react-icons/md";
import { AllContext } from "../App";
import { api } from "../utils";
import { FaPlus } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";

function GalleryCrud() {
  const { gallery } = useContext(AllContext);
  const [images, setImages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState({ id: null, description: "" });
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [image, setImage] = useState(null);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (gallery?.length > 0) {
      setImages(gallery);
      setLoading(false);
    }
  }, [gallery]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);

    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsImageSelected(true);
    }
  };

  const handleUpload = async () => {
    // Validasi input
    if (!image) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }
    if (!newImage.description) {
      alert("Masukkan deskripsi gambar!");
      return;
    }

    setLoading(true);

    // Buat FormData untuk mengirim file dan data
    const formData = new FormData();
    formData.append("image", image); // File gambar
    formData.append("description", newImage.description);

    // Jika ada ID, tambahkan ke FormData untuk update
    if (newImage.id) {
      formData.append("id", newImage.id);
    }

    try {
      // Tentukan endpoint dan method berdasarkan apakah ada ID
      const endpoint = newImage.id
        ? "https://serikat-pekerja-btn-api.vercel.app/api/gallery/update-image" // Endpoint untuk update
        : "https://serikat-pekerja-btn-api.vercel.app/api/gallery/add-image"; // Endpoint untuk upload

      const method = newImage.id ? "PUT" : "POST"; // Method PUT untuk update, POST untuk upload

      // Kirim request ke backend
      const response = await fetch(endpoint, {
        method: method,
        body: formData, // Mengirim FormData yang berisi file dan deskripsi
      });

      const result = await response.json();

      if (result.success) {
        alert(
          newImage.id
            ? "Gambar berhasil diupdate!"
            : "Gambar berhasil diunggah!"
        );
        window.location.reload(); // Refresh halaman setelah upload/update berhasil
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert(
        newImage.id ? "Gagal mengupdate gambar!" : "Gagal mengunggah gambar!"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images
    .filter((image) =>
      image.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at);
    });

  const handleViewImage = (image) => {
    setCurrentImage(image);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    // Tampilkan konfirmasi
    const isConfirmed = confirm("Apakah anda akan menghapus gambar ini?");
    if (!isConfirmed) return; // Jika pengguna membatalkan, hentikan proses

    try {
      // Kirim request DELETE ke backend
      const response = api.delete(`/gallery/delete-image/${id}`);

      const result = await response.json();

      if (result.success) {
        alert("Gambar berhasil dihapus!");
        window.location.reload(); // Refresh halaman setelah penghapusan berhasil
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus gambar!");
    }
  };

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="p-4  mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64 transition-all"
        />

        {/* Sort Dropdown */}
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

        {/* Add Image Button */}
        <button
          onClick={() => {
            setCurrentImage(null);
            setShowModal(true);
          }}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 w-full md:w-auto"
        >
          <FaPlus />
          <span>Add Image</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-red-600 rounded-lg overflow-hidden">
          <thead className="text-center bg-red-600 text-white">
            <tr>
              <th className="p-3 border-r border-red-700">No</th>
              <th className="p-3 border-r border-red-700 w-1/6">Image</th>
              <th className="p-3 border-r border-red-700 w-1/3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse bg-red-50">
                  <td className="p-3 text-center border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-10 mx-auto"></div>
                  </td>
                  <td className="p-3 border-r border-red-200 flex justify-center">
                    <div className="w-40 h-24 bg-red-300 rounded-lg"></div>
                  </td>
                  <td className="p-3 border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-full mb-2"></div>
                    <div className="h-4 bg-red-300 rounded w-2/3"></div>
                  </td>
                  <td className="p-3 flex items-center justify-center gap-3">
                    <div className="w-16 h-8 bg-yellow-300 rounded"></div>
                    <div className="w-16 h-8 bg-red-300 rounded"></div>
                  </td>
                </tr>
              ))
            ) : paginatedImages.length > 0 ? (
              paginatedImages.map((image, index) => (
                <tr
                  key={image.id}
                  className="hover:bg-red-50 transition-colors"
                >
                  <td className="p-3 text-center border-r border-red-200">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td className="p-3 border-r border-red-200 flex justify-center">
                    <img
                      src={image.image}
                      alt={image.description}
                      className="w-40 h-24 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="p-3 border-r border-red-200">
                    {image.description}
                  </td>
                  <td className="p-3 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setCurrentImage(image);
                        setImage(image);
                        setShowModal(true);
                        setPreviewImage(image.image);
                        setNewImage({
                          id: image.id,
                          description: image.description,
                        });
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  <div className="flex flex-col items-center justify-center text-red-600">
                    <FaExclamationCircle className="text-6xl mb-2" />
                    <p className="text-xl font-semibold">No Images Found</p>
                    <p className="text-sm text-gray-500">
                      Try adjusting your search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 p-4 bg-red-50 rounded-lg shadow-sm">
        {/* Dropdown untuk jumlah item per halaman */}
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="cursor-pointer border border-red-200 p-2 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={filteredImages.length}>Show All</option>
        </select>

        {/* Pagination */}
        <div className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(filteredImages.length / perPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 border border-red-200 rounded-lg transition-colors cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-red-600 hover:bg-red-50"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              {currentImage ? "Edit Image" : "Add Image"}
            </h2>
            <div className="space-y-6">
              {/* Preview Image */}
              {previewImage && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition duration-200 ease-in-out w-full text-gray-500 focus:outline-none"
                />
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter a description for the image..."
                  value={newImage.description}
                  onChange={(e) =>
                    setNewImage({ ...newImage, description: e.target.value })
                  }
                  className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end mt-8 space-x-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setImage(null);
                  setPreviewImage(null);
                  setIsImageSelected(false);
                  setNewImage({ description: "" });
                }}
                className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {currentImage ? "Save Changes" : "Add Image"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal untuk menampilkan gambar */}
      {/* {showModal && currentImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg max-w-[90vw] max-h-[80vh] overflow-auto">
            <img
              src={currentImage.image}
              alt={currentImage.description}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 text-center">
              <p className="text-sm sm:text-lg font-semibold">
                {currentImage.description}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white text-sm sm:text-base font-semibold py-2 px-3 sm:py-2 sm:px-4 rounded transition-colors duration-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default GalleryCrud;
