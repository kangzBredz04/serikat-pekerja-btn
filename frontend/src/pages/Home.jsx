function Home() {
  return (
    <div className="flex flex-col">
      <div className="h-screen w-full bg-gradient-to-b from-blue-400 to-white py-20 px-4 md:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="order-2 md:order-1">
            <img
              className="rounded-2xl h-3/4 w-full"
              src="https://i.pinimg.com/736x/3a/67/19/3a67194f5897030237d83289372cf684.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-10 order-1 md:order-2">
            <div>
              <h1 className="text-6xl font-extrabold tracking-wide text-gray-800">
                Bank Tabungan Negara (BTN)
              </h1>
            </div>
            <div>
              <p className="leading-9 text-xl">
                SPBRI berusaha untuk dapat menjamin terciptanya kesatuan dan
                persatuan para Pekerja BRI serta melindungi kepentingan para
                pekerjanya secara adil baik dalam rangka mendapatkan kepastian
                untuk bekerja secara profesional, mendapatkan peluang yang sama
                dan mengembangkan karir sesuai kemampuannya, maupun memperoleh
                imbalan dalam bentuk kesejahteraan yang layak sesuai dengan
                kemampuan Perusahaan.
              </p>
            </div>
            <div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-blue-800 cursor-pointer">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="w-full bg-gradient-to-b from-white via-white to-blue-300 py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-blue-900">VISI KAMI</h2>
          <p className="text-gray-600 mt-2 text-lg">
            Membangun Serikat Pekerja yang Independen, Representatif dan Dinamis
            untuk Mewujudkan Kesejahteraan Pekerja yang Berimbang.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Box 1 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900">Independen</h3>
            <p className="text-gray-700 mt-2 leading-relaxed">
              SPBRI tidak terafiliasi dengan kepentingan pihak tertentu dan
              memperjuangkan kepentingan pekerja secara merdeka untuk
              keberlanjutan kejayaan BRI dan peningkatan kesejahteraan Pekerja.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900">Representatif</h3>
            <p className="text-gray-700 mt-2 leading-relaxed">
              SPBRI sebagai lembaga formal yang representatif menyalurkan
              aspirasi seluruh pekerja BRI.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900">Dinamis</h3>
            <p className="text-gray-700 mt-2 leading-relaxed">
              Organisasi SPBRI dapat bergerak secara dinamis dan agile dalam
              menjalankan roda organisasinya untuk mencapai tujuan SPBRI.
            </p>
          </div>
        </div>
      </section>
      <div>Tiga</div>
      <div>Empat</div>
    </div>
  );
}

export default Home;
