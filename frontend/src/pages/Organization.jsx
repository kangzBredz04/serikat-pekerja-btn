import { FaTools } from "react-icons/fa";

function Organization() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center space-y-4">
      <FaTools className="text-6xl text-gray-800" />
      <h1 className="text-2xl font-semibold text-gray-800">
        Halaman dalam Pengembangan
      </h1>
      <p className="text-gray-600">
        Kami sedang bekerja keras untuk menghadirkan halaman ini segera. Terima
        kasih atas kesabaran Anda!
      </p>
    </div>
  );
}

export default Organization;
