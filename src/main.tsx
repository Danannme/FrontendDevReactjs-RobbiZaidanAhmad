import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//pages
import Home from "./pages/Home.tsx";
import Detail from "./pages/Detail.tsx";

// react-router
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// tanstack query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient();
// This code is only for TypeScript --> tanstack query devtools
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}
// This code is for all users --> tanstack query devtools
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
