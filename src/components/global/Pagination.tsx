import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { useSearchParams } from "react-router";
import { Button } from "../ui/button";

const Pagination = ({
  currentPage,
  pages,
}: {
  currentPage: number;
  pages: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNewPage = (newPage: number) => {
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams);
  };

  const pageBtns = Array.from({ length: pages }, (_, index) => {
    return index + 1;
  });

  return (
    <div className=" flex justify-center border-t-2 border-gray-100 p-3 bg-white rounded-sm z-50 top-10">
      <div className="flex items-center gap-x-2">
        <FaRegArrowAltCircleLeft
          className=" text-gray-300"
          size={20}
          onClick={() => {
            let nextPage = currentPage - 1;
            if (nextPage < 1) return;
            return handleNewPage(nextPage);
          }}
        />
        {pageBtns.map((pageNum) => {
          return (
            <Button
              className={` hover:bg-transparent ${
                currentPage === pageNum &&
                "bg-primary hover:bg-primary text-white"
              }`}
              variant="ghost"
              size="icon"
              onClick={() => handleNewPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}
        <FaRegArrowAltCircleRight
          className=" text-gray-300"
          size={20}
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > pages) return;
            return handleNewPage(nextPage);
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
