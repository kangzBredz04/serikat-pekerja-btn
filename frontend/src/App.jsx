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
  const [gallery, setGallery] = useState([]);
  const [users, setUsers] = useState([]);
  const [imageOrganizational, setImageOrganizational] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/new/get-all").then((response) => setNews(response));
    api.get("/gallery/get-all").then((response) => setGallery(response.images));
    api.get("/auth/get-all").then((response) => setUsers(response));
    api
      .get(`/new/get-by-id/${localStorage.getItem("id_news")}`)
      .then((response) => {
        setNewsDetail(response);
        setLoading(false);
      });
    api
      .get("/organizational-structure/get-image-organizational-structure")
      .then((res) => setImageOrganizational(res.data.image));
  }, []);

  return (
    <AllContext.Provider
      value={{
        news,
        newsDetail,
        loading,
        gallery,
        users,
        imageOrganizational,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </AllContext.Provider>
  );
}

export default App;
