import {
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white py-10 border-t">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
        {/* Section 1 */}
        <div>
          <h2 className="font-bold text-lg text-blue-900">
            SERIKAT PEKERJA BANK TABUNGGAN NEGARA (SPBTN)
          </h2>
          <p className="flex items-center mt-3">
            <span className="mr-2">
              <FaBuilding className="text-blue-600 cursor-pointer" />
            </span>
            Menara BTN
          </p>
          <p className="flex items-center">
            <span className="mr-2">
              <FaMapMarkerAlt className="text-blue-600 cursor-pointer" />
            </span>
            Jl. Gajah Mada No. 1 Jakarta 10130
          </p>
          <p className="flex items-center">
            <span className="mr-2">
              <FaPhoneAlt className="text-blue-600 cursor-pointer" />
            </span>
            150286 | Fax: 1500286
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="font-semibold">Organization</h3>
          <p className="mt-2">Gallery</p>
          <p className="font-semibold mt-1">News</p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaInstagram className="text-blue-600 cursor-pointer" />
            <FaWhatsapp className="text-blue-600 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-t-gray-200 pt-4">
        &copy; SPBTN 2025. All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
