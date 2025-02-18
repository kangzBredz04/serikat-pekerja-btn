import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

const newsItems = [
  {
    title: "Silver Run SP-BTN x BTN Runners Community (HUT ke-25 SP-BTN)",
    category: "Event",
    image:
      "https://btn.co.id/-/media/Images/Corporate/Promotion/2025/Jan/Awareness-BTN-Run-2025-843x474.png?h=474&w=843&hash=500B4D1D44C8E68E71406CDD8607F4E5",
  },
  {
    title: "Video Content Competition (HUT ke-25 SP-BTN)",
    category: "Competition",
    image:
      "https://www.btn.co.id/-/media/Images/Corporate/Promotion/2025/Feb/main-banner.png?h=474&w=843&hash=8123CDB2667542DAB35E29116FD23E55",
  },
  {
    title: "Essay Competition (HUT ke-25 SP-BTN)",
    category: "Competition",
    image: "",
  },
  {
    title: "HUT ke-25 SP-BTN: Kolaboratif, Sehat, dan Produktif",
    category: "Anniversary",
    image: "",
  },
  {
    title:
      "Ketahui dan Pahami, Ini Hak-hak Pekerja Perempuan yang Dijamin Negara",
    category: "Education",
    image:
      "https://www.btn.co.id/-/media/Images/Corporate/Promotion/2025/Jan/HUT-CB-75-Banner-LP-843x474.png?h=474&w=843&hash=27A85271C982A572B16C4216FAA4BAAF",
  },
  {
    title: "Role Pengurus SP-BTN",
    category: "Organization",
    image: "",
  },
  {
    title: "Silver Run SP-BTN x BTN Runners Community (HUT ke-25 SP-BTN)",
    category: "Event",
    image:
      "https://www.btn.co.id/-/media/Images/Corporate/Promotion/2025/Feb/bale-festival-banner-festive-copy.jpg",
  },
  {
    title: "Video Content Competition (HUT ke-25 SP-BTN)",
    category: "Competition",
    image:
      "https://btn.co.id/-/media/Images/Corporate/Promotion/2025/Feb/balepont-makassar.png?h=356&w=632&hash=F5FF9D2F022F053BEEAD68EB22F313E9",
  },
  {
    title: "Essay Competition (HUT ke-25 SP-BTN)",
    category: "Competition",
    image: "",
  },
];

const News = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg h-96">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover rounded-t-lg"
              />
            ) : (
              <div className="h-48 bg-gradient-to-r from-blue-500 to-red-500 rounded-t-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {item.category}
                </span>
              </div>
            )}
            <h3 className="text-lg font-semibold mt-4 text-gray-900">
              {item.title}
            </h3>
            <a
              href="#"
              className="flex items-center text-blue-600 mt-4 font-medium"
            >
              Read More <FaArrowRight className="ml-2" />
            </a>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6 space-x-4 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className={`p-2 rounded-lg font-semibold text-lg ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:cursor-pointer"
          }`}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-lg font-semibold text-lg ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            } hover:cursor-pointer`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className={`p-2 rounded-lg font-semibold text-lg ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:cursor-pointer"
          }`}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default News;
