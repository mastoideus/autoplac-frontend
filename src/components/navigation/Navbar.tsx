import Logo from "./Logo";
import { Button } from "../ui/button";
import { Link } from "react-router";
import NavSearch from "./NavSearch";
import { useShowOnScrollContext } from "@/lib/context/showOnScroll.tsx";
import { useLocation } from "react-router";

const Navbar = () => {
  const { pathname } = useLocation();
  const { showOnScroll } = useShowOnScrollContext();
  console.log(showOnScroll);

  return (
    <>
      <nav className=" h-[90px] z-50   bg-white shadow-sm flex items-center  justify-center sticky left-0 top-0">
        <div
          className={` ${
            pathname.startsWith("/main-search") ? "w-[96%]" : "page_layout"
          } flex justify-between items-center`}
        >
          <Logo />

          <div
            className={` hidden lg:block transition-all duration-300 transform  ${
              showOnScroll
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 -translate-x-5 pointer-events-none"
            } `}
          >
            <NavSearch />
          </div>

          <div className=" hidden md:block">
            <Button
              asChild
              variant="outline"
              size="lg"
              className=" text-md hover:bg-transparent font-[500] shadow-none  "
            >
              <Link to="/login">Prijava</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className=" text-md  bg-blue-900 text-white font-[500] "
            >
              <Link to="/register">Registracija</Link>
            </Button>
          </div>
        </div>
      </nav>
      <div
        className={`lg:hidden z-50  page_layout sticky bg-white left-0 top-[90px] h-20 shadow-sm sm:flex sm:justify-center sm:items-center transition-all duration-300 ease-in-out transform ${
          showOnScroll
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-5 pointer-events-none"
        }`}
      >
        <NavSearch />
      </div>
    </>
  );
};

export default Navbar;
