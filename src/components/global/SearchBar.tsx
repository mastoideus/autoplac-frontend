import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdSearch } from "react-icons/io";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  placeholder?: string;
  name: string;
  className: string;
  asChild?: boolean;
};

const SearchBar = ({
  placeholder,
  name,
  className,
  asChild,
}: SearchBarProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        name={name}
        id={name}
        className="  border border-gray-200 h-[100%] rounded-r-none w-full"
      />
      <Button
        asChild={asChild}
        className="h-[100%] rounded-l-none  w-16  bg-blue-900"
      >
        <IoMdSearch color="white" className=" " />
      </Button>
    </div>
  );
};

export default SearchBar;
