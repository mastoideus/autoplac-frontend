import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useAuthContext } from "@/lib/context/authContext";
import { dropdownUserLinks } from "@/lib/utils";
import { IoLogOutOutline } from "react-icons/io5";

const DropdownUserMenu = ({ onClick }: { onClick: () => void }) => {
  const {
    authData: { userData },
  } = useAuthContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" flex items-center gap-x-2 focus:outline-none focus:ring-0 focus-visible:ring-0">
        <FaUserCircle className=" text-gray-300" size={29} />
        <p>{userData?.username}</p>
        <IoIosArrowDown className=" text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white">
        {dropdownUserLinks.map(({ id, text, icon: Icon }) => {
          return (
            <DropdownMenuItem
              key={id}
              className="flex group items-center gap-x-3 py-2 hover:bg-blue-500 focus:bg-blue-500 focus:text-white"
            >
              <Icon className=" text-gray-400 group-hover:text-white" />
              <p className=" first-letter:uppercase text-[1rem]">{text}</p>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClick}>
          <IoLogOutOutline className=" text-red-600" />
          <p className="   font-medium text-red-600 text-[1rem]">Odjava</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownUserMenu;
