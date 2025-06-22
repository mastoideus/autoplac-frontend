import Navbar from "@/components/navigation/Navbar";
import { Outlet } from "react-router";
import ScrollToTop from "@/components/global/ScrollToTop";
import { useCompareCarsContext } from "@/lib/context/compareCars";
import CompareCarsBox from "@/components/global/CompareCarsBox";
import { useLocation } from "react-router";

const MainLayout = () => {
  const { comparationCars } = useCompareCarsContext();
  const { pathname } = useLocation();

  return (
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
