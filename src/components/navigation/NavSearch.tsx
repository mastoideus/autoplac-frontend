import { FaHandsHelping } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import IconButton from "../global/IconButton";
import SearchBar from "../global/SearchBar";

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
          <FaCartShopping color="white" />
        </IconButton>
      </div>
    </div>
  );
};

export default NavSearch;

/*<div className=" flex items-center h-[100%]">
<Input
  type="text"
  placeholder="Audi A3"
  name="search"
  id="search"
  className="  border border-gray-200 h-[100%] rounded-r-none w-full sm:w-64"
/>
<Button
  size="icon"
  className="h-[100%] rounded-l-none w-12  bg-blue-900"
>
  <IoMdSearch color="white" />
</Button>
</div>
*/
