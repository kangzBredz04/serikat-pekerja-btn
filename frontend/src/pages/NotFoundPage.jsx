export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <h1 className="text-7xl font-extrabold text-gray-900 sm:text-9xl">404</h1>
      <p className="text-lg text-gray-600 mt-4 sm:text-xl">
        Oops! Halaman yang Anda cari tidak ditemukan.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
}
