import { useContext, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { AllContext } from "../App";

const itemsPerPage = 6;

function Gallery() {
  const { gallery } = useContext(AllContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const totalPages = Math.ceil(gallery.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gallery.slice(indexOfFirstItem, indexOfLastItem);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {gallery.length === 0
          ? [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-300 animate-pulse h-72 w-full rounded-xl"
              ></div>
            ))
          : currentItems.map((item, index) => (
              <div
                key={index}
                className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                onClick={() => handleImageClick(indexOfFirstItem + index)}
              >
                <img
                  src={item.image}
                  alt={item.description}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 hover:opacity-80 transition-opacity duration-300">
                  <span className="text-white text-lg font-extrabold">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-red-700 text-white rounded-md disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md cursor-pointer ${
              currentPage === index + 1
                ? "bg-red-700 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 bg-red-700 text-white rounded-md disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
      {selectedImage !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
          >
            <FaTimes />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-3xl cursor-pointer"
          >
            <FaChevronLeft />
          </button>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <img
              src={gallery[selectedImage].image}
              alt={gallery[selectedImage].description}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <p className="text-center text-xl font-semibold mt-4">
              {gallery[selectedImage].description}
            </p>
          </div>
          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-3xl cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
