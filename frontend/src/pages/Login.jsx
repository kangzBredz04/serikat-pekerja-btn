import { useState } from "react";
import { api } from "../utils";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

function Login() {
  const [login, setLogin] = useState({ username: "", password: "" });
  const [popup, setPopup] = useState({
    show: false,
    success: false,
    message: "",
  });

  function handleChange(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.post("/auth/login", login).then((response) => {
      if (!response.token) {
        setPopup({
          show: true,
          success: false,
          message: "Username atau password salah",
        });
      } else {
        setPopup({ show: true, success: true, message: "Login berhasil!" });
        localStorage.setItem("id_admin", response.data.id);
        localStorage.setItem("full_name", response.data.full_name);
        setTimeout(() => (window.location.href = "/dashboard"), 1500);
      }
    });
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 text-center">
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

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Masuk ke Akun Anda
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={login.username}
                onChange={handleChange}
                required
                placeholder="Masukkan username"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Kata Sandi *
              </label>
              <input
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                required
                placeholder="Masukkan kata sandi"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-700 text-white p-3 rounded-md hover:bg-red-800 transition cursor-pointer"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fadeIn">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center relative w-80">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md">
              {popup.success ? (
                <AiOutlineCheckCircle className="text-green-500 text-6xl" />
              ) : (
                <AiOutlineCloseCircle className="text-red-500 text-6xl" />
              )}
            </div>

            <h2
              className={`text-xl font-bold mt-12 ${
                popup.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {popup.success ? "Berhasil!" : "Gagal!"}
            </h2>
            <p className="text-gray-700 mt-2">{popup.message}</p>

            <button
              onClick={() => setPopup({ show: false })}
              className="mt-6 px-6 py-2 rounded-full font-semibold shadow-md transition duration-300 ease-in-out
        ${popup.success ? 'bg-green-600 hover:bg-green-800' : 'bg-red-600 hover:bg-red-800'}"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
