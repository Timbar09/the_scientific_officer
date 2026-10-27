import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

// import App from "./App.tsx";
import Layout from "./layout";
import Home from "./pages/home";
import Practice from "./pages/practice";
import PracticeSession from "./pages/practice/session";
// import MockTests from "./pages/mock";
import Books from "./pages/books";
import Articles from "./pages/articles";
import Videos from "./pages/videos";
import About from "./pages/about";
import { AppDataProvider } from "./context/AppDataProvider";

import "./assets/sass/index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/practice",
        element: <Practice />,
      },
      {
        path: "/practice/session",
        element: <PracticeSession />,
      },
      {
        path: "/resources/books",
        element: <Books />,
      },
      {
        path: "/resources/articles",
        element: <Articles />,
      },
      {
        path: "/resources/videos",
        element: <Videos />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppDataProvider>
      <RouterProvider router={router} />
    </AppDataProvider>
  </StrictMode>,
);
