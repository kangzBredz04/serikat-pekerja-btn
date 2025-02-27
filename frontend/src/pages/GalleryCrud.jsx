import { useState } from "react";

function GalleryCrud() {
  const [images, setImages] = useState([
    {
      id: 1,
      created_at: "2023-10-01",
      url_image:
        "https://signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png",
      description: "Gambar 1",
    },
    {
      id: 2,
      created_at: "2023-10-02",
      url_image:
        "https://signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png",
      description: "Gambar 2",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [newImage, setNewImage] = useState({ description: "" });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSaveImage = () => {
    if (currentImage) {
      setImages(
        images.map((img) =>
          img.id === currentImage.id
            ? { ...img, ...newImage, url_image: URL.createObjectURL(imageFile) }
            : img
        )
      );
    } else {
      setImages([
        ...images,
        {
          id: images.length + 1,
          created_at: new Date().toISOString(),
          url_image: URL.createObjectURL(imageFile),
          ...newImage,
        },
      ]);
    }
    setShowModal(false);
    setNewImage({ description: "" });
    setImageFile(null);
    setCurrentImage(null);
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
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
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="relative group">
            {image.url_image && (
              <img
                src={image.url_image}
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
                  onClick={() => handleDeleteImage(image.id)}
                  className="mt-2 bg-red-500 p-1 rounded ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h2 className="text-xl font-bold mb-4">
              {currentImage ? "Edit Image" : "Add Image"}
            </h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="p-2 border rounded w-full mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newImage.description}
              onChange={(e) =>
                setNewImage({ ...newImage, description: e.target.value })
              }
              className="p-2 border rounded w-full mb-2"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white p-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveImage}
                className="bg-blue-500 text-white p-2 rounded"
              >
                {currentImage ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryCrud;
