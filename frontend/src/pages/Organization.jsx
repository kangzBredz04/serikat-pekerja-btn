import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Organization = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-center">
      <div className="space-y-6">
        {/* Sejarah Kami */}
        <h1 className="text-3xl md:text-4xl font-bold text-red-700">
          Sejarah Kami
        </h1>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed text-left">
          Serikat Pekerja BTN didirikan pada tanggal 17 Juni 1999 Ketua umum
          Pertama adalah Sdr. Sutarno dan Sekjend Sdr. Alm Satya Wijayantara
          menggunakan skema pemilihan langsung one man one vote. Ketua Umum
          selanjutnya adalah Sdr. Alm Satya Wijayantara bersama Sdr. Mohamad
          Faiz sebagai Sekjend DPP SP-BTN. Pada Tahun 2022, DPP SP-BTN mengalami
          kekosongan kepemimpinan setelah beberapa pengurus wafat. Selanjutnya
          untuk menyalamatkan organisasi dilakukan Musyawarah Nasional Luar
          Biasa secara hybrid di Bekasi. Pada forum tersebut terpilih Sdr. Rizky
          Novriady sebagai Ketua Umum dan Sdr. Ugroseno Bagaskoro sebagai
          Sekretaris Jendral untuk Periode 2022 - 2026. Selanjutnya pengurus
          terpilih melakukan pemberitahuan kepada disnaker setempat tentang
          struktur organisasi dan kepengurusan, AD/ART organisasi dan pengganti
          bukti pencatatan organisasi pada tanggal 11 Maret 2022.
        </p>

        {/* Visi dan Misi */}
        <div className="bg-white p-6 text-left">
          <h2 className="text-2xl font-bold text-red-700">Visi</h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mt-2">
            Menjadi organisasi pekerja yang profesional, berintegritas, dan
            berperan aktif dalam meningkatkan kesejahteraan anggota.
          </p>

          <h2 className="text-2xl font-bold text-red-700 mt-6">Misi</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm md:text-base leading-relaxed mt-2">
            <li>
              Melindungi dan memperjuangkan hak serta kepentingan pekerja BTN.
            </li>
            <li>
              Membangun hubungan industrial yang harmonis dan berkeadilan.
            </li>
            <li>
              Meningkatkan kompetensi dan kesejahteraan anggota melalui berbagai
              program pelatihan dan advokasi.
            </li>
          </ul>
        </div>

        {/* Struktur Organisasi */}
        <h2 className="text-2xl font-bold text-red-700 mt-8">
          Struktur Organisasi SP-BTN
        </h2>
        <div className="mt-6 bg-white p-6 text-center">
          <img
            src="/struktur-organisasi.png"
            alt="Struktur Organisasi SPNAS BTN"
            className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
          <div className="relative">
            <button
              className="absolute -top-4 -right-4 text-white bg-red-500 rounded-full p-1"
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={24} />
            </button>
            <img
              src="/struktur-organisasi.png"
              alt="Struktur Organisasi"
              className="w-auto max-w-full h-auto max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Organization;
