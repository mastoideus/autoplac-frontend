import Navbar from "@/components/navigation/Navbar";
import { Outlet } from "react-router";
import ScrollToTop from "@/components/global/ScrollToTop";
import { useCompareCarsContext } from "@/lib/context/compareCars";
import CompareCarsBox from "@/components/global/CompareCarsBox";
import { useLocation } from "react-router";
import { useAuthContext } from "@/lib/context/authContext";
import LoadingSpinner from "../components/global/LoadingSpinner.tsx";

const MainLayout = () => {
  const { isAuthTokenLoading } = useAuthContext();
  const { comparationCars } = useCompareCarsContext();
  const { pathname } = useLocation();

  return isAuthTokenLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
      {comparationCars.length > 0 && !pathname.startsWith("/compare") && (
        <CompareCarsBox />
      )}
    </>
  );
};

export default MainLayout;
