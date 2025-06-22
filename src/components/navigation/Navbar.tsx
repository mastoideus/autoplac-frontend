import Logo from "./Logo";
import NavSearch from "./NavSearch";
import { useShowOnScrollContext } from "@/lib/context/showOnScroll.tsx";
import { useLocation } from "react-router";
import AuthButtons from "./AuthButtons";
import UserBar from "./UserBar";
import { useAuthContext } from "@/lib/context/authContext";
import { useState } from "react";
import MobileLoginForm from "../register/MobileLoginForm";

const Navbar = () => {
  const {
    authData: { accessToken },
  } = useAuthContext();
  const { pathname } = useLocation();
  const { showOnScroll } = useShowOnScrollContext();
  console.log(showOnScroll);
  const [showMobileAuth, setShowMobileAuth] = useState(false);

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
          {accessToken ? (
            <UserBar />
          ) : (
            <AuthButtons
              onMobileForm={() => setShowMobileAuth((prevState) => !prevState)}
            />
          )}
        </div>
      </nav>
      <div
        className={`lg:hidden z-40 w-full  px-2 sticky bg-white left-0 top-[90px]  shadow-sm sm:flex sm:justify-center sm:items-center transition-all duration-300 ease-in-out transform ${
          showOnScroll
            ? "opacity-100 translate-x-0 pointer-events-auto h-20"
            : "opacity-0 -translate-x-5 pointer-events-none h-0"
        }`}
      >
        <NavSearch />
      </div>
      <div
        className={`lg:hidden z-50 w-full  px-2 sticky bg-white left-0 top-[90px] shadow-md  transition-all duration-300 ease-in-out transform ${
          showMobileAuth
            ? "opacity-100 translate-x-0 pointer-events-auto "
            : "opacity-0 -translate-x-5 pointer-events-none h-0"
        }`}
      >
        <MobileLoginForm />
      </div>
    </>
  );
};

export default Navbar;
