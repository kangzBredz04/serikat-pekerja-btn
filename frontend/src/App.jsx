/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import { api } from "./utils";

export const AllContext = createContext();

function App() {
  const [news, setNews] = useState([]);
  const [newsDetail, setNewsDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/new/get-all").then((response) => setNews(response));
    api
      .get(`/new/get-by-id/${localStorage.getItem("id_news")}`)
      .then((response) => {
        setNewsDetail(response);
        setLoading(false);
      });
  }, []);

  if (news.length !== 0) {
    // console.log(news);
  }

  console.log(newsDetail);
  return (
    <AllContext.Provider
      value={{
        news,
        newsDetail,
        loading,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </AllContext.Provider>
  );
}

export default App;
