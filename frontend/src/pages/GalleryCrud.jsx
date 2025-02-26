import { useState } from "react";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function GalleryCrud() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        id: Date.now(),
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setImages([...images, newImage]);
    }
  };

  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleEdit = (id, newName) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, name: newName } : img))
    );
  };

  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentImages = filteredImages.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleAddImage}
          className="border p-2 rounded-lg"
        />
        <div className="relative">
          <input
            type="text"
            placeholder="Search by image name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentImages.map((img) => (
          <div key={img.id} className="relative border p-2 rounded-lg shadow">
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-32 object-cover rounded"
            />
            <p className="mt-2 text-center">{img.name}</p>
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => setSelectedImage(img)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(img.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2">Rows per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border p-2 rounded-lg"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={filteredImages.length}>All</option>
          </select>
        </div>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-gray-300" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Edit Image</h2>
              <button onClick={() => setSelectedImage(null)}>
                <MdClose className="text-xl" />
              </button>
            </div>
            <input
              type="text"
              value={selectedImage.name}
              onChange={(e) => handleEdit(selectedImage.id, e.target.value)}
              className="border p-2 w-full rounded-lg mt-2"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryCrud;
