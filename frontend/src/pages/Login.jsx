function Login() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Side (Dummy Image with Back Button) */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-red-200 to-white flex flex-col items-center justify-center p-6 text-center">
        <img
          src="/serikat-pekerja-btn-logo.png"
          alt="SP-BTN Logo"
          className="w-40 mb-4"
        />
        <h1 className="text-3xl font-bold">
          Hey, Selamat Datang kembali di{" "}
          <span className="text-red-700">SP-BTN</span>
        </h1>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Masuk ke Akun Anda
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Nomor Personal / Email *
              </label>
              <input
                type="text"
                placeholder="Masukkan nomor personal atau email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Kata Sandi *
              </label>
              <input
                type="password"
                placeholder="Masukkan kata sandi"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button className="w-full bg-red-700 text-white p-3 rounded-md hover:bg-red-800 transition">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
