function Home() {
  return (
    <div className="">
      <div className="min-h-screen w-full bg-gradient-to-b from-white to-blue-400 py-10 px-5 md:py-20 md:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              className="rounded-2xl w-auto h-auto md:h-3/4"
              src="https://i.pinimg.com/736x/3a/67/19/3a67194f5897030237d83289372cf684.jpg"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-6 md:gap-10">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-gray-800">
                Bank Tabungan Negara (BTN)
              </h1>
            </div>
            <div>
              <p className="leading-7 md:leading-9 text-base md:text-xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab sit
                possimus eos sunt, beatae dignissimos provident fugit, omnis
                laudantium quo temporibus numquam illum, accusantium quae est
                repellat doloribus modi quis! Aut praesentium et voluptates
                minus laudantium ipsum nesciunt, vel alias eos ratione eum?
                Soluta, tenetur similique. Laborum adipisci similique voluptas
                eaque. Nostrum, deleniti ipsam numquam praesentium architecto
                autem minima commodi.
              </p>
            </div>
            <div>
              <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold shadow-md hover:bg-blue-800 cursor-pointer">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="w-full bg-gradient-to-b from-white to-blue-400 py-10 md:py-16 px-5 md:px-8">
        <div className="max-w-3xl md:max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900">
            VISI KAMI
          </h2>
          <p className="text-gray-600 mt-2 text-base md:text-lg">
            Membangun Serikat Pekerja yang Independen, Representatif dan Dinamis
            untuk Mewujudkan Kesejahteraan Pekerja yang Berimbang.
          </p>
        </div>

        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl md:max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-blue-900">Independen</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              SPBRI tidak terafiliasi dengan kepentingan pihak tertentu dan
              memperjuangkan kepentingan pekerja secara merdeka untuk
              keberlanjutan kejayaan BRI dan peningkatan kesejahteraan Pekerja.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-blue-900">Representatif</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              SPBRI sebagai lembaga formal yang representatif menyalurkan
              aspirasi seluruh pekerja BRI.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-blue-900">Dinamis</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              Organisasi SPBRI dapat bergerak secara dinamis dan agile dalam
              menjalankan roda organisasinya untuk mencapai tujuan SPBRI.
            </p>
          </div>
        </div>
      </section>
      <div className="text-center py-4">Tiga</div>
      <div className="text-center py-4">Empat</div>
    </div>
  );
}

export default Home;
