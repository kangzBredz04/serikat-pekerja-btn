import {
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white py-6 md:py-10 border-t">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        {/* Section 1: Informasi Perusahaan */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-lg text-blue-600">
            SERIKAT PEKERJA BANK TABUNGAN NEGARA (SP-BTN)
          </h2>
          <p className="flex items-center justify-center md:justify-start mt-3">
            <FaBuilding className="text-blue-600 mr-2" />
            Menara BTN
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            Jl. Gajah Mada No. 1 Jakarta 10130
          </p>
          <p className="flex items-center justify-center md:justify-start">
            <FaPhoneAlt className="text-blue-600 mr-2" />
            150286 | Fax: 1500286
          </p>
        </div>

        {/* Section 2: Navigasi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
            href="/organization"
          >
            Organization
          </a>
          <a
            className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
            href="/gallery"
          >
            Gallery
          </a>
          <a
            className="text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
            href="/news"
          >
            News
          </a>
        </div>

        {/* Section 3: Media Sosial */}
        <div className="text-center md:text-right">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-end space-x-4 mt-2">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6 md:mt-10 border-t border-gray-200 pt-4">
        &copy; SP-BTN 2025. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
