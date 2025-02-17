import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="w-full bg-white shadow-md py-3 px-32 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/btn-logo-2.png" alt="Logo" className="h-12" />
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 font-semibold">
        <Link className="text-blue-600" to={"/"}>
          Home
        </Link>
        <Link className="text-blue-600" to={"/organization"}>
          Organization
        </Link>
        <Link className="text-blue-600" to={"/gallery"}>
          Gallery
        </Link>
        <Link className="text-blue-600" to={"/news"}>
          News
        </Link>
      </nav>

      {/* Sign In Button */}
      <div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-800">
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
