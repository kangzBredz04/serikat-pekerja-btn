import { useEffect, useState } from "react";

function NewsDetail() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Contoh fetch data dari API
    fetch(`https://api.example.com/news/1`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">{news.title}</h1>
      <p className="text-gray-500 text-sm mt-2">
        {new Date(news.created_at).toLocaleString()}
      </p>
      <img
        src={
          news.image_url ||
          "https://signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png"
        }
        alt="News"
        className="w-full h-auto mt-4 rounded-lg"
      />
      <div className="mt-6 text-gray-700 space-y-4">
        {news.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default NewsDetail;
