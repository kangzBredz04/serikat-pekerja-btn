import { useContext, useEffect, useState } from "react";
import { MdImageNotSupported } from "react-icons/md";
import { AllContext } from "../App";

function GalleryCrud() {
  const { gallery } = useContext(AllContext);
  const [images, setImages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState({ description: "" });
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
    if (!newImage.description) {
      alert("Masukkan deskripsi gambar!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image); // File gambar
    formData.append("description", newImage.description); // Deskripsi gambar

    try {
      const response = await fetch(
        "http://localhost:3000/api/gallery/add-image",
        {
          method: "POST",
          body: formData, // Mengirim FormData yang berisi file dan deskripsi
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Gambar berhasil diunggah!");
        window.location.reload(); // Refresh halaman setelah upload berhasil
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengunggah gambar!");
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

  return (
    <div className="p-4  mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Gallery</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full md:w-auto"
        />
        <select
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
        <button
          onClick={() => {
            setCurrentImage(null);
            setShowModal(true);
          }}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        >
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-48 bg-gray-300 animate-pulse rounded"
            ></div>
          ))
        ) : filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <div key={image.id} className="relative group">
              {image.image && (
                <img
                  src={image.image}
                  alt={image.description}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                <div className="text-white text-center">
                  <p>{image.description}</p>
                  <button
                    onClick={() => {
                      setCurrentImage(image);
                      setNewImage(image);
                      setShowModal(true);
                    }}
                    className="mt-2 bg-yellow-500 p-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      confirm("Apakah anda akan menghapus gambar ini?")
                    }
                    className="mt-2 bg-red-500 p-1 rounded ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center col-span-full text-gray-500 p-6 ">
            <MdImageNotSupported size={48} className="text-gray-400 mb-2" />
            <p className="text-lg font-semibold">No images found</p>
            <p className="text-sm text-gray-600">
              Try adjusting your search criteria.
            </p>
          </div>
        )}
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
    </div>
  );
}

export default GalleryCrud;
