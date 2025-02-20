import { useContext } from "react";
import { AllContext } from "../App";

function NewsDetail() {
  const { newsDetail, loading } = useContext(AllContext);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
        <div className="h-64 bg-gray-300 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!newsDetail) {
    return <p className="text-center text-gray-500">Berita tidak ditemukan</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">{newsDetail.title}</h1>
      <p className="text-gray-500 text-sm mt-2">
        {new Date(newsDetail.created_at).toLocaleString("id-ID", {
          weekday: "long", // Menampilkan nama hari
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hourCycle: "h23", // Format 24 jam
        })}
      </p>

      <img
        src={
          newsDetail.image_url ||
          "https://signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"
        }
        alt="News"
        className="w-full h-auto mt-4 rounded-lg"
      />
      {/* Perbaikan menangani \n dengan benar */}
      <div className="mt-6 text-gray-700 space-y-4 text-justify">
        {newsDetail.content
          .split("\\n") // Ubah "\n" literal menjadi karakter newline
          .join("\n") // Pastikan formatnya benar
          .split("\n") // Pecah menjadi array
          .map((paragraph, index) => (
            <p className="mb-4" key={index}>
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
}

export default NewsDetail;
