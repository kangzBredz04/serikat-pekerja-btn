import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AllContext } from "../App";

function UsersCrud() {
  const { users } = useContext(AllContext);
  const [search, setSearch] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by username or full name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg w-full max-w-md pl-10"
        />
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-300 rounded-lg">
          <thead className="bg-blue-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 border border-gray-300">No</th>
              <th className="px-4 py-2 border border-gray-300">Username</th>
              <th className="px-4 py-2 border border-gray-300">Password</th>
              <th className="px-4 py-2 border border-gray-300">Full Name</th>
              <th className="px-4 py-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
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
                <td className="px-4 py-2">{user.full_name}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setSelectedUser(user)}
                  >
                    Lihat Detail
                  </button>
                  {localStorage.getItem("id_admin") == 1 && (
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Hapus Pengguna
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="mr-2">Rows per page:</label>
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

      {selectedUser && (
        <div className="fixed inset-0 bg-gray-900  backdrop-blur-md flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <div className="flex justify-between mb-4">
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
              <strong>Full Name:</strong> {selectedUser.full_name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersCrud;
