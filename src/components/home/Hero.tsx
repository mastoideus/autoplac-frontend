import SearchBar from "../global/SearchBar";
import { Button } from "../ui/button";
import { FaHandsHelping } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import cikicaImg from "@/assets/images/cikica.png";
import StepsSVG from "./StepsSVG";
import { useShowOnScrollContext } from "@/lib/context/showOnScroll";
import { Link } from "react-router";

const Hero = () => {
  const { elementRef } = useShowOnScrollContext();

  return (
    <div className=" page_layout flex flex-col md:flex-row md:gap-x-16">
      <section className="">
        <h2 className="  font-[600] text-4xl lg:text-6xl lg:leading-[75px] max-w-[600px] -mt-12 md:mt-9">
          Kupi ili prodaj, dok kažeš Plac!
        </h2>
        <div className=" mt-10 ">
          <p className=" uppercase font-[500]">pretraži</p>
          <SearchBar
            name="search"
            placeholder="Pretraga..."
            className=" h-16 "
            asChild={true}
          />
        </div>
        <div className=" mt-10 flex flex-col gap-y-2 md:flex-row md:gap-x-2">
          <Button
            size="lg"
            asChild
            className=" w-full text-white text-[1rem] py-6"
          >
            <Link to="/">
              <FaHandsHelping />
              Prodajem
              <MdKeyboardArrowRight />
            </Link>
          </Button>
          <Button
            ref={elementRef}
            size="lg"
            asChild
            className=" w-full text-white text-[1rem] py-6 "
          >
            <Link to="/">
              <FaCartShopping />
              Kupujem
              <MdKeyboardArrowRight />
            </Link>
          </Button>
        </div>
        <div className=" mt-20">
          <StepsSVG />
        </div>
      </section>
      <section className=" hidden lg:block relative ">
        <div className=" absolute top-12 -z-10 rounded-full bg-blue-900 w-[600px] h-[600px] flex items-center justify-center">
          <div className=" w-[500px] h-[500px] rounded-full bg-blue-900 shadow-xl shadow-blue-800 flex items-center justify-center ">
            <div className=" w-[400px] h-[400px] rounded-full bg-blue-900 shadow-xl shadow-blue-800 "></div>
          </div>
        </div>
        <img
          src={cikicaImg}
          fetchPriority="high"
          decoding="async"
          className=" object-cover   mt-8 ml-12"
        />
      </section>
    </div>
  );
};

export default Hero;
