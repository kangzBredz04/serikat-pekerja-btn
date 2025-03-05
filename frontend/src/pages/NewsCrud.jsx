import { useState, useContext, useEffect } from "react";
import { AllContext } from "../App";
import { api } from "../utils";
import { FaEdit, FaExclamationCircle, FaImage } from "react-icons/fa";

export default function NewsCrud() {
  const { news } = useContext(AllContext);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const defaultImage =
    "https://signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";

  const handleOpenModal = (newsItem = null) => {
    setSelectedNews(newsItem);
    setModalOpen(true);
  };

  useEffect(() => {
    if (news?.length > 0) {
      setPerPage(5);
      setCurrentPage(1);
      setLoading(false);
    }
  }, [news]);

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.content.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 bg-red-100 p-4 rounded-lg shadow-md flex-col md:flex-row gap-4 md:gap-0">
        {/* Tombol Add News */}
        <button
          onClick={handleOpenModal}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition cursor-pointer w-full md:w-auto"
        >
          + Add News
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-red-400 focus:ring-2 focus:ring-red-500 focus:outline-none p-2 rounded-lg w-full md:w-1/3 shadow-sm transition"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-red-600 rounded-lg overflow-hidden">
          <thead className="text-center bg-red-600 text-white">
            <tr>
              <th className="p-3 border-r border-red-700">No</th>
              <th className="p-3 border-r border-red-700 w-1/4">Title</th>
              <th className="p-3 border-r border-red-700 w-1/6">Image</th>
              <th className="p-3 border-r border-red-700 w-1/3">Content</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Skeleton Loader
              [...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse bg-red-50">
                  <td className="p-3 text-center border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-10 mx-auto"></div>
                  </td>
                  <td className="p-3 border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-3/4"></div>
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
            ) : paginatedNews.length > 0 ? (
              paginatedNews.map((item, index) => (
                <tr key={item.id} className="hover:bg-red-50 transition-colors">
                  <td className="p-3 text-center border-r border-red-200">
                    {(currentPage - 1) * perPage + index + 1}
                  </td>
                  <td className="p-3 border-r border-red-200 break-words">
                    {item.title}
                  </td>
                  <td className="p-3 border-r border-red-200 flex justify-center">
                    <img
                      src={item.image_url || defaultImage}
                      alt={item.title}
                      className="w-40 h-24 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="p-3 border-r border-red-200">
                    {item.content?.length > 100
                      ? item.content.substring(0, 100) + "..."
                      : item.content}
                  </td>
                  <td className="p-3 h-full flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete the news "${item.title}"?`
                          )
                        ) {
                          api
                            .delete(`/new/delete-by-id/${item.id}`)
                            .then(async (res) => {
                              alert(res.msg);
                              window.location.href = "/admin-news";
                            })
                            .catch((e) => console.log(e));
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  <div className="flex flex-col items-center justify-center text-red-600">
                    <FaExclamationCircle className="text-6xl mb-2" />
                    <p className="text-xl font-semibold">No Data Found</p>
                    <p className="text-sm text-gray-500">
                      Try adding new data or check your filters.
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
          <option value={filteredNews.length}>Show All</option>
        </select>

        {/* Pagination */}
        <div className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(filteredNews.length / perPage) },
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-29 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 shadow-2xl transform transition-all duration-300 ease-in-out">
            {/* Judul Modal dengan Icon */}
            <div className="flex items-center space-x-3 mb-6">
              <FaEdit className="h-6 w-6 text-red-500" />{" "}
              {/* Ikon dari React Icons */}
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedNews ? "Edit Berita" : "Tambah Berita"}
              </h2>
            </div>

            {/* Form Input */}
            <div className="space-y-4">
              {/* Input Judul */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Berita
                </label>
                <input
                  type="text"
                  placeholder="Masukkan judul berita"
                  value={selectedNews?.title || ""}
                  onChange={(e) =>
                    setSelectedNews({ ...selectedNews, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Input Gambar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gambar Berita
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex flex-col items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                    <FaImage className="h-6 w-6 text-gray-400" />{" "}
                    {/* Ikon dari React Icons */}
                    <span className="mt-2 text-sm text-gray-500">
                      {selectedNews?.image_url
                        ? "Ganti Gambar"
                        : "Pilih Gambar"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setSelectedNews({
                              ...selectedNews,
                              // image_url: reader.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  {selectedNews?.image_url && (
                    <img
                      src={selectedNews.image_url}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              {/* Input Konten */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konten Berita
                </label>
                <textarea
                  placeholder="Masukkan konten berita"
                  value={selectedNews?.content || ""}
                  onChange={(e) =>
                    setSelectedNews({
                      ...selectedNews,
                      content: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                  rows={4}
                ></textarea>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  // Logika simpan data
                  console.log("Data disimpan:", selectedNews);
                  setModalOpen(false);
                }}
                className="cursor-pointer px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
