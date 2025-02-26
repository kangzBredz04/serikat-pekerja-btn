import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Organization from "./pages/Organization.jsx";
import Gallery from "./pages/Gallery.jsx";
import News from "./pages/News.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NotFoundPage from "./pages/ErrorPage.jsx";
import NewsCrud from "./pages/NewsCrud.jsx";
import UsersCrud from "./pages/UsersCrud.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/organization",
        element: <Organization />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/news/:id",
        element: <NewsDetail />,
      },
      {
        path: "/admin-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin-news",
        element: <NewsCrud />,
      },
      {
        path: "/admin-users",
        element: <UsersCrud />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
