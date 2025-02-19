/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createContext, useEffect, useState } from "react";
import { api } from "./utils";

export const AllContext = createContext();

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    api.get("/new/get-all").then((response) => setNews(response));
  }, []);

  if (news.length !== 0) {
    console.log(news);
  }

  return (
    <AllContext.Provider
      value={{
        news,
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </AllContext.Provider>
  );
}

export default App;
