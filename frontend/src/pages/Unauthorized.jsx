import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-6">
      <div className="p-8 rounded-lg  flex flex-col items-center">
        <div className="bg-red-100 p-4 rounded-full">
          <FaLock className="text-red-600 text-6xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Akses Ditolak</h1>
        <p className="text-gray-600 mt-2 text-center">
          Anda tidak memiliki izin untuk mengakses halaman ini.
          <br />
          Silakan login terlebih dahulu untuk melanjutkan.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-red-800 transition duration-300"
        >
          Kembali ke Login
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
