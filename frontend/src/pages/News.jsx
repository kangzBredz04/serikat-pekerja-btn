import { useContext, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { AllContext } from "../App";

const News = () => {
  const { news } = useContext(AllContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  console.log(news);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg h-96">
            {item.image_url ? (
              <img
                src={item.image_url}
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
              className="flex items-center text-blue-600 mt-4 font-medium"
              // onClick={() => alert(item.content)}
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
