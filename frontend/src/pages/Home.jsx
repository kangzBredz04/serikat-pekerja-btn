import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AllContext } from "../App";
// import { Link } from "react-router-dom";
function Home() {
  const { news } = useContext(AllContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (news.length > 0) {
      setLoading(false);
    }
  }, [news]);

  const sortedNews = news
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  return (
    <div>
      <div className="min-h-screen w-full py-10 px-4 bg-gray-100 md:py-20 md:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-full w-full  flex-1">
            <img
              className="rounded-2xl w-full h-full object-cover"
              src="https://btn.co.id/-/media/Images/About/News/Des/berita---hut-kpr-bale-launch-(1).png?h=474&w=843&hash=E4A9EC2298D065AAAB3ADB5EFB354924"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-6 md:gap-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide text-gray-800">
                Serikat Pekerja Bank Tabungan Negara (SP-BTN)
              </h1>
            </div>
            <div>
              <p className="leading-7 md:leading-9 text-sm md:text-md">
                Serikat Pekerja BTN didirikan pada tanggal 17 Juni 1999 Ketua
                umum Pertama adalah Sdr. Sutarno dan Sekjend Sdr. Alm Satya
                Wijayantara menggunakan skema pemilihan langsung one man one
                vote. Ketua Umum selanjutnya adalah Sdr. Alm Satya Wijayantara
                bersama Sdr. Mohamad Faiz sebagai Sekjend DPP SP-BTN. Pada Tahun
                2022, DPP SP-BTN mengalami kekosongan kepemimpinan setelah
                beberapa pengurus wafat. Selanjutnya untuk menyalamatkan
                organisasi dilakukan Musyawarah Nasional Luar Biasa secara
                hybrid di Bekasi. Pada forum tersebut terpilih Sdr. Rizky
                Novriady sebagai Ketua Umum dan Sdr. Ugroseno Bagaskoro sebagai
                Sekretaris Jendral untuk Periode 2022 - 2026.
              </p>
            </div>
            <Link
              // to={
              //   "https://forms.zohopublic.com/dppspbtn/form/FormulirAnggotaSPBTN1/formperma/4KkNx7Qb8ZsR-E61vKSZ2fhM_0vOF4DRcsNRDFTvzOU"
              // }
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://forms.zohopublic.com/dppspbtn/form/FormulirAnggotaSPBTN1/formperma/4KkNx7Qb8ZsR-E61vKSZ2fhM_0vOF4DRcsNRDFTvzOU",
                  "_blank"
                );
              }}
            >
              <button className="bg-red-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold shadow-md hover:bg-red-800 cursor-pointer">
                Daftar Anggota
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-screen py-10 md:py-16 px-5 md:px-8 flex flex-col items-center justify-center bg-gray-100">
        <div className="max-w-3xl md:max-w-5xl text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-red-900">
            VISI KAMI
          </h2>
          <p className="text-gray-600 mt-2 text-base md:text-lg">
            Membangun Serikat Pekerja yang Independen, Representatif dan Dinamis
            untuk Mewujudkan Kesejahteraan Pekerja yang Berimbang.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl md:max-w-5xl mx-auto">
          <div className="bg-white/80 shadow-2xl backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-bold text-red-900">Independen</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              SPBTN tidak terafiliasi dengan kepentingan pihak tertentu dan
              memperjuangkan kepentingan pekerja secara merdeka untuk
              keberlanjutan kejayaan BTN dan peningkatan kesejahteraan Pekerja.
            </p>
          </div>
          <div className="bg-white/80 shadow-2xl backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-bold text-red-900">Representatif</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              SPBTN sebagai lembaga formal yang representatif menyalurkan
              aspirasi seluruh pekerja BTN.
            </p>
          </div>
          <div className="bg-white/80 shadow-2xl backdrop-blur-md rounded-xl p-6 transform transition-all duration-300 hover:scale-105">
            <h3 className="text-lg font-bold text-red-900">Dinamis</h3>
            <p className="text-gray-700 mt-2 leading-relaxed text-sm md:text-base">
              Organisasi SPBTN dapat bergerak secara dinamis dan agile dalam
              menjalankan roda organisasinya untuk mencapai tujuan SPBTN.
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-full py-10 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-red-600 mb-6">News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Skeleton Loader
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 p-4 rounded-lg shadow-lg h-96 animate-pulse"
                  >
                    <div className="h-48 w-full bg-gray-400 rounded-t-lg"></div>
                    <div className="mt-4 h-6 bg-gray-400 rounded w-3/4"></div>
                    <div className="mt-2 h-4 bg-gray-400 rounded w-1/2"></div>
                  </div>
                ))
            : // Berita Asli setelah loading selesai
              sortedNews.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg h-96"
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-48 w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-blue-500 to-red-500 rounded-t-lg flex items-center justify-center">
                      <span className="text-white text-md text-center font-bold">
                        {item.title}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mt-4 text-gray-900">
                    {item.title}
                  </h3>
                  <a
                    onClick={() => {
                      localStorage.setItem("id_news", item.id);
                      window.location.href = `/news/${localStorage.getItem(
                        "id_news"
                      )}`;
                    }}
                    className="flex items-center text-red-600 mt-4 font-medium cursor-pointer"
                  >
                    Read More <FaArrowRight className="ml-2" />
                  </a>
                </div>
              ))}
        </div>
        <div className="text-center mt-6">
          <a className="text-red-700 font-semibold text-lg" href="/news">
            View All
          </a>
        </div>
      </div>
      {/* <div className="text-center py-4">Empat</div> */}
    </div>
  );
}

export default Home;
