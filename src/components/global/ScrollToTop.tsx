import { useEffect } from "react";
import { useLocation } from "react-router";
import { useShowOnScrollContext } from "@/lib/context/showOnScroll";

const ScrollToTop = () => {
  const { setShowOnScroll } = useShowOnScrollContext();
  const pathname = useLocation();

  useEffect(() => {
    if (pathname.pathname === "/") {
      setShowOnScroll(false);
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
