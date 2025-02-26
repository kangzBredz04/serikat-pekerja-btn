import { useContext, useState } from "react";
import { AllContext } from "../context/AllContext";
import { FaEye, FaEyeSlash, FaTrash, FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function UsersCrud() {
  const { users } = useContext(AllContext);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data berdasarkan pencarian
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.fullname.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by username or full name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg"
          />
          <FaSearch className="absolute right-2 top-3 text-gray-500" />
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="border p-2 rounded-lg"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={filteredUsers.length}>All</option>
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2">{indexOfFirstItem + index + 1}</td>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2 flex items-center">
                  {showPassword[user.id] ? user.password : "*****"}
                  <button
                    className="ml-2"
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
                <td className="px-4 py-2">{user.fullname}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setSelectedUser(user)}
                  >
                    Lihat
                  </button>
                  {user.id_admin === 1 && (
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </span>
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

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">User Details</h2>
              <button onClick={() => setSelectedUser(null)}>
                <MdClose className="text-xl" />
              </button>
            </div>
            <p>
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Password:</strong> {selectedUser.password}
            </p>
            <p>
              <strong>Full Name:</strong> {selectedUser.fullname}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersCrud;
