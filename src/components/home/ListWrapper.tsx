import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

type ListWrapperProps<T> = {
  subtitle: string;
  textMore: string;
  children: (item: T) => React.ReactNode;
  data: T[];
  className?: string;
  moreLink: string;
};

const ListWrapper = <T,>({
  children,
  subtitle,
  textMore,
  data,
  className,
  moreLink,
}: ListWrapperProps<T>) => {
  return (
    <div className=" mb-14">
      <header className=" flex flex-col md:flex-row  md:justify-between md:items-center">
        <h2 className=" first-letter:capitalize   text-xl font-semibold md:text-[1.7rem] border-l-4 border-l-primary pl-4 ">
          {subtitle}
        </h2>
        <Link
          to={moreLink}
          className="  hidden md:flex md:gap-x-2 md:items-center hover:bg-gray-100 p-2 "
        >
          <p className=" first-letter:capitalize text-blue-800">{textMore}</p>
          <MdKeyboardArrowRight color="blue" />
        </Link>
      </header>
      <ul className={cn(" mt-12", className)}>
        {data.map((item) => {
          return children(item);
        })}
      </ul>
      <Link
        to="/brands"
        className=" flex   md:hidden gap-x-2 items-center mt-4 "
      >
        <p className=" first-letter:capitalize text-blue-800">{textMore}</p>
        <MdKeyboardArrowRight color="blue" />
      </Link>
    </div>
  );
};

export default ListWrapper;
