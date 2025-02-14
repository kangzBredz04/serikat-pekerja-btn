function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-2 px-32 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/btn-logo-2.png" alt="Logo" className="h-12" />
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 font-semibold">
        <a href="#" className="text-blue-600">
          Home
        </a>
        <a href="#" className="text-black hover:text-gray-600">
          Organization
        </a>
        <a href="#" className="text-black hover:text-gray-600">
          Gallery
        </a>
        <a href="#" className="text-black hover:text-gray-600">
          News
        </a>
      </nav>

      {/* Sign In Button */}
      <div>
        <button className="bg-blue-900 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-800">
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
