function Login() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Left Side (Dummy Image) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-200 to-white items-center justify-center p-8">
        <div className="text-center">
          <img
            src="/placeholder-image.png"
            alt="SP-BTN Logo"
            className="w-40 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold">
            Hey, Welcome back to <span className="text-blue-700">SP-BTN</span>
          </h1>
        </div>
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Sign in to your account
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Personal Number / Email *
              </label>
              <input
                type="text"
                placeholder="Enter personal number or email address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Password *
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-right mb-4">
              <a href="#" className="text-blue-700 text-sm">
                Forgot password?
              </a>
            </div>

            <button className="w-full bg-blue-700 text-white p-3 rounded-md hover:bg-blue-800 transition">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
