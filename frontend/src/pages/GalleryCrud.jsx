import { useContext, useEffect, useState } from "react";
import { MdImageNotSupported } from "react-icons/md";
import { AllContext } from "../App";
import { api } from "../utils";
import { FaPlus } from "react-icons/fa6";

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

  return (
    <div className="p-4  mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Gallery</h1>
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
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              // Skeleton Loading while data is being fetched
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-5">
                    <div className="w-6 h-4 bg-gray-300 animate-pulse rounded"></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-32 h-24 bg-gray-300 animate-pulse rounded-lg"></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-48 h-4 bg-gray-300 animate-pulse rounded"></div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <div className="w-16 h-8 bg-gray-300 animate-pulse rounded"></div>
                      <div className="w-16 h-8 bg-gray-300 animate-pulse rounded"></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : filteredImages.length > 0 ? (
              // Display image data
              filteredImages.map((image, index) => (
                <tr
                  key={image.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-5 text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-5">
                    <img
                      src={image.image}
                      alt={image.description}
                      className="w-32 h-24 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700 max-w-xs">
                    {image.description}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-3 *:cursor-pointer">
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
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Display message if no images are found
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <MdImageNotSupported
                      size={64}
                      className="text-gray-400 mb-4"
                    />
                    <p className="text-xl font-semibold">No images found</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Try adjusting your search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
