import { FaHandsHelping } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import IconButton from "../global/IconButton";
import SearchBar from "../global/SearchBar";
import { Link } from "react-router";

const NavSearch = () => {
  return (
    <div className=" flex flex-col gap-y-1 h-8 sm:flex-row sm:items-center sm:gap-x-1  sm:h-12 ">
      <SearchBar
        name="search"
        className="h-[100%] md:w-80"
        placeholder="Audi A3"
      />
      <div className="h-[100%]  flex gap-x-1 md:gap-0 ">
        <IconButton
          tooltipText="Objavi vozilo"
          size="icon"
          className="mb-1 sm:mb-0 mr-1 sm:h-[100%]   w-full sm:w-12"
        >
          <FaHandsHelping color="white" />
        </IconButton>
        <IconButton
          className=" sm:h-[100%] w-full  sm:w-12"
          tooltipText="Treba vam pomoć da pronađete odgovarajuće vozilo?"
          size="icon"
        >
          <Link to="/help-search">
            <FaCartShopping color="white" />
          </Link>
        </IconButton>
      </div>
    </div>
  );
};

export default NavSearch;
