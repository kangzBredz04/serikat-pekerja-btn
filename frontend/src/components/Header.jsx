import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md py-3 px-6 md:px-10 lg:px-32 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/serikat-pekerja-btn-logo.png"
          alt="Logo"
          className="h-16 md:h-20"
        />
      </Link>

      {/* Navigation Links (Hidden on mobile) */}
      <nav className="hidden md:flex space-x-6 font-semibold">
        <Link className="text-red-600 hover:text-red-800" to="/">
          Home
        </Link>
        <Link className="text-red-600 hover:text-red-800" to="/organization">
          Organization
        </Link>
        <Link className="text-red-600 hover:text-red-800" to="/gallery">
          Gallery
        </Link>
        <Link className="text-red-600 hover:text-red-800" to="/news">
          News
        </Link>
      </nav>

      {/* Sign In Button (Hidden on mobile) */}
      <div className="hidden md:block">
        <Link
          to={"/login"}
          className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-red-800 cursor-pointer"
        >
          Sign In
        </Link>
      </div>

      {/* Burger Toggle Button */}
      <button
        className="md:hidden text-red-600 text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5 text-red-600 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>
        <nav className="flex flex-col items-center mt-20 space-y-6 font-semibold">
          <Link
            className="text-red-600 hover:text-red-800 text-lg"
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-red-600 hover:text-red-800 text-lg"
            to="/organization"
            onClick={() => setMenuOpen(false)}
          >
            Organization
          </Link>
          <Link
            className="text-red-600 hover:text-red-800 text-lg"
            to="/gallery"
            onClick={() => setMenuOpen(false)}
          >
            Gallery
          </Link>
          <Link
            className="text-red-600 hover:text-red-800 text-lg"
            to="/news"
            onClick={() => setMenuOpen(false)}
          >
            News
          </Link>
          <Link
            to="/login"
            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-red-800 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
