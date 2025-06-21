import { createBrowserRouter, RouterProvider } from "react-router";
import {
  MainLayout,
  HomePage,
  AllBrandsPage,
  AllStoresPage,
  CarComparationPage,
  SingleCarPage,
  HelpSearchPage,
  MainCarsPage,
  RegisterPage,
  LoginPage,
} from "@/pages/index.tsx";
import { loader as homepageLoader } from "@/pages/HomePage.tsx";
import { loader as compareCarsLoader } from "@/pages/CarComparationPage.tsx";
import { loader as singleCarLoader } from "@/pages/SingleCarPage.tsx";
import { loader as mainCarsLoader } from "@/pages/MainCarsPage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./axios/queryClient";
import { ShowOnScrollContextProvider } from "@/lib/context/showOnScroll.tsx";
import { CompareCarsContextProvider } from "./lib/context/compareCars";
import { AuthContextProvider } from "./lib/context/authContext";

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
      {
        path: "car/:carId",
        element: <SingleCarPage />,
        loader: singleCarLoader,
      },
      {
        path: "compare",
        element: <CarComparationPage />,
        loader: compareCarsLoader,
      },
      {
        path: "help-search",
        element: <HelpSearchPage />,
      },
      {
        path: "main-search",
        element: <MainCarsPage />,
        loader: mainCarsLoader,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  { path: "/login", element: <LoginPage /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ShowOnScrollContextProvider>
          <CompareCarsContextProvider>
            <RouterProvider router={router} />
          </CompareCarsContextProvider>
        </ShowOnScrollContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
