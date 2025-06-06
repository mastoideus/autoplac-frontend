import { createBrowserRouter, RouterProvider } from "react-router";
import {
  MainLayout,
  HomePage,
  AllBrandsPage,
  AllStoresPage,
} from "@/pages/index.tsx";
import { loader as homepageLoader } from "@/pages/HomePage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./axios/queryClient";
import { ShowOnScrollContextProvider } from "@/lib/context/showOnScroll.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        id: "homepage-data",
        loader: homepageLoader,
        children: [
          { index: true, element: <HomePage /> },
          { path: "brands", element: <AllBrandsPage /> },
          { path: "stores", element: <AllStoresPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ShowOnScrollContextProvider>
        <RouterProvider router={router} />
      </ShowOnScrollContextProvider>
    </QueryClientProvider>
  );
}

export default App;
