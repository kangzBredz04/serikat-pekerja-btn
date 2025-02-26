import { useState, useContext } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AllContext } from "../App";
import { api } from "../utils";

export default function NewsCrud() {
  const { news } = useContext(AllContext);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const defaultImage =
    "https://signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png";

  const handleOpenModal = (newsItem = null) => {
    setSelectedNews(newsItem);
    setModalOpen(true);
  };

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
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Tambah Berita
        </button>
        <input
          type="text"
          placeholder="Cari berita..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      <table className="w-full text-left border border-gray-400">
        <thead className="text-center">
          <tr className="bg-gray-100 border-b border-gray-400">
            <th className="p-2 w-1 border-r border-gray-400">No</th>
            <th className="p-2 w-1/4 border-r border-gray-400">Title</th>
            <th className="p-2 w-1/6 border-r border-gray-400">Image</th>
            <th className="p-2 w-1/3 border-r border-gray-400">Content</th>
            <th className="p-2 w-20 text-center border-gray-400">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedNews.length > 0 ? (
            paginatedNews.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-400">
                <td className="p-2 text-center border-r border-gray-400">
                  {(currentPage - 1) * perPage + index + 1}
                </td>
                <td className="p-2 border-r border-gray-400 break-words">
                  {item.title}
                </td>
                <td className="flex justify-center border-r border-gray-400">
                  <img
                    src={item.image_url || defaultImage}
                    alt={item.title}
                    className="w-40 rounded"
                  />
                </td>
                <td className="p-2 border-r border-gray-400">
                  {item.content.length > 100
                    ? item.content.substring(0, 100) + "..."
                    : item.content}
                </td>
                <td className="p-2 flex justify-center gap-2 border-gray-400">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="text-yellow-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Apakah anda yakin ingin menghapus berita ${item.title}`
                        )
                      ) {
                        api
                          .delete(`/new/delete-by-id/${item.id}`)
                          .then(async (res) => alert(res.message))
                          .catch((e) => console.log(e));
                      }
                    }}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                Data tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="border p-2 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={filteredNews.length}>All</option>
        </select>
        <div>
          {Array.from(
            { length: Math.ceil(filteredNews.length / perPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/2">
            <h2 className="text-lg font-bold mb-4">
              {selectedNews ? "Edit Berita" : "Tambah Berita"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={selectedNews?.title || ""}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={selectedNews?.image_url || ""}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Content"
              value={selectedNews?.content || ""}
              className="border p-2 w-full mb-2"
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Simpan
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
