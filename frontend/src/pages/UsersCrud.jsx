import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { AllContext } from "../App";

function UsersCrud() {
  const { users } = useContext(AllContext);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (users?.length > 0) {
      setLoading(false);
    }
  }, [users]);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by username or full name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg w-full pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-gray-400" />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-red-500 text-white">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Password</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading // Skeleton loading ketika data belum muncul
              ? [...Array(itemsPerPage)].map((_, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))
              : currentUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4 flex items-center">
                      {showPassword[user.id] ? user.password : "*****"}
                      <button
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            [user.id]: !prev[user.id],
                          }))
                        }
                      >
                        {showPassword[user.id] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </td>
                    <td className="px-6 py-4">{user.full_name}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                        onClick={() => setSelectedUser(user)}
                      >
                        Lihat Detail
                      </button>
                      {localStorage.getItem("id_admin") == 1 && (
                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors">
                          Hapus Pengguna
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <label className="mr-2 text-gray-700">Rows per page:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={filteredUsers.length}>All</option>
          </select>
        </div>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded transition-colors ${
                currentPage === i + 1
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-2xl border border-gray-300 transform transition-all scale-100">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-900">
                User Details
              </h2>
            </div>
            <div className="mt-4 space-y-3 text-gray-700">
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Password:</strong> {selectedUser.password}
              </p>
              <p>
                <strong>Full Name:</strong> {selectedUser.full_name}
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersCrud;
