import { useContext, useEffect, useState } from "react";
import {
  FaExclamationCircle,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaSearch,
  FaTimes,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
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
      <div className="flex justify-between items-center mb-6 bg-red-100 p-4 rounded-lg shadow-md">
        {/* Placeholder untuk tombol atau konten di sebelah kiri (bisa diisi nanti) */}
        <div></div>

        {/* Search Input (Right) */}
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by username or full name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-red-400 focus:ring-2 focus:ring-red-500 focus:outline-none p-2 rounded-lg w-full pl-10 shadow-sm transition"
          />
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="text-gray-400" />
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-red-600 rounded-lg overflow-hidden">
          <thead className="text-center bg-red-600 text-white">
            <tr>
              <th className="p-3 border-r border-red-700">No</th>
              <th className="p-3 border-r border-red-700 w-1/6">Username</th>
              <th className="p-3 border-r border-red-700 w-1/6">Password</th>
              <th className="p-3 border-r border-red-700 w-1/3">Full Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(itemsPerPage)].map((_, index) => (
                <tr key={index} className="animate-pulse bg-red-50">
                  <td className="p-3 text-center border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-10 mx-auto"></div>
                  </td>
                  <td className="p-3 border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-full"></div>
                  </td>
                  <td className="p-3 border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-full"></div>
                  </td>
                  <td className="p-3 border-r border-red-200">
                    <div className="h-4 bg-red-300 rounded w-full"></div>
                  </td>
                  <td className="p-3 flex items-center justify-center gap-3">
                    <div className="w-16 h-8 bg-yellow-300 rounded"></div>
                    <div className="w-16 h-8 bg-red-300 rounded"></div>
                  </td>
                </tr>
              ))
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-red-50 transition-colors">
                  <td className="p-3 text-center border-r border-red-200">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="p-3 border-r border-red-200">
                    {user.username}
                  </td>
                  <td className="p-3 border-r border-red-200 flex items-center">
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
                  <td className="p-3 border-r border-red-200">
                    {user.full_name}
                  </td>
                  <td className="p-3 flex items-center justify-center gap-3 *:cursor-pointer">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                      onClick={() => setSelectedUser(user)}
                    >
                      Lihat Detail
                    </button>
                    {localStorage.getItem("id_admin") == 1 && (
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                        Hapus Pengguna
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  <div className="flex flex-col items-center justify-center text-red-600">
                    <FaExclamationCircle className="text-6xl mb-2" />
                    <p className="text-xl font-semibold">No Users Found</p>
                    <p className="text-sm text-gray-500">
                      Try adjusting your search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 p-4 bg-red-50 rounded-lg shadow-sm">
        {/* Dropdown untuk jumlah item per halaman */}
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="cursor-pointer border border-red-200 p-2 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition-colors"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={filteredUsers.length}>Show All</option>
        </select>

        {/* Pagination */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
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
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl border border-gray-200 transform transition-all scale-100">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
              >
                <FaTimes className="h-6 w-6" /> {/* Ikon close */}
              </button>
            </div>

            {/* User Details */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="h-5 w-5 text-blue-600" />{" "}
                  {/* Ikon username */}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-semibold text-gray-800">
                    {selectedUser.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FaKey className="h-5 w-5 text-green-600" />{" "}
                  {/* Ikon password */}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-semibold text-gray-800">
                    {selectedUser.password}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaUserCircle className="h-5 w-5 text-purple-600" />{" "}
                  {/* Ikon full name */}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold text-gray-800">
                    {selectedUser.full_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersCrud;
