import Navbar from "@/components/navigation/Navbar";
import { Outlet } from "react-router";
import ScrollToTop from "@/components/global/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className=" ">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
