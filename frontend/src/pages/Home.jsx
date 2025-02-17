import { FaArrowRight } from "react-icons/fa";
function Home() {
  const newsItems = [
    {
      title: "BTN Run x BTN Runners Community (HUT ke-75 BTN)",
      category: "HUT KE-75 BTN",
    },
    {
      title: "Video Content Competition (HUT ke-75 BTN)",
      category: "HUT KE-75 BTN",
    },
    {
      title: "Essay Competition (HUT ke-75 BTN)",
      category: "HUT KE-75 BTN",
    },
    {
      title: "HUT ke-75 BTN: Kolaboratif, Sehat, dan Produktif",
      category: "HUT KE-75 BTN",
    },
  ];
  return (
    <div className="">
      <div className="min-h-screen w-full bg-gradient-to-b from-white to-blue-200 py-10 px-5 md:py-20 md:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <img
              className="rounded-2xl w-auto h-auto md:h-3/4"
              src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg"
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
      <div className="min-h-screen bg-gradient-to-t from-white to-blue-200 py-10 md:py-16 px-5 md:px-8">
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
              SPBTN tidak terafiliasi dengan kepentingan pihak tertentu dan
              memperjuangkan kepentingan pekerja secara merdeka untuk
              keberlanjutan kejayaan BTN dan peningkatan kesejahteraan Pekerja.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-blue-900">Representatif</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              SPBTN sebagai lembaga formal yang representatif menyalurkan
              aspirasi seluruh pekerja BTN.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-blue-900">Dinamis</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              Organisasi SPBTN dapat bergerak secara dinamis dan agile dalam
              menjalankan roda organisasinya untuk mencapai tujuan SPBTN.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-full bg-gradient-to-b from-white to-blue-300 py-10 px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg h-96">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-t-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold mt-4 text-gray-900">
                {item.title}
              </h3>
              <a
                href="#"
                className="flex items-center text-blue-600 mt-4 font-medium"
              >
                Read More <FaArrowRight className="ml-2" />
              </a>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="#" className="text-blue-600 font-semibold text-lg">
            View All
          </a>
        </div>
      </div>
      <div className="text-center py-4">Empat</div>
    </div>
  );
}

export default Home;
