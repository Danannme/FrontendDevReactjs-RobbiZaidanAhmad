import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//pages
import Home from "./pages/Home.tsx";
import Detail from "./pages/Detail.tsx";

// react-router
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import "./index.css";
import App from "./App.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/restaurant/:id",
        Component: Detail,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
);
