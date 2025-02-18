import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const galleryData = [
  { title: "Fun Football SP-BTN Jakarta" },
  { title: "Muswil SP-BTN Medan" },
  { title: "SP-BTN Kanpus-KCK Berbagi 2022" },
  { title: "Rakernas 1 SP-BTN 2022" },
  { title: "Muswil SP-BTN Denpasar" },
  { title: "Muswil SP-BTN Banjarmasin" },
  { title: "Muswil SP-BTN Surabaya" },
  { title: "SP-BTN Charity Event 2023" },
  { title: "Pelatihan Kepemimpinan SP-BTN" },
  { title: "Family Gathering SP-BTN" },
  { title: "Seminar Nasional SP-BTN" },
  { title: "Workshop SP-BTN 2023" },
];

const itemsPerPage = 6;

function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(galleryData.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galleryData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
          >
            <img
              src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
              alt={item.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute bottom-0 text-gray-800 font-bold text-lg p-2 w-full text-left bg-opacity-0">
              {item.title}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-blue-700 text-white rounded-md disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-700 text-white"
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
          className="p-2 bg-blue-700 text-white rounded-md disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Gallery;
