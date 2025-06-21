import React, { useState } from "react";
import IconButton from "../global/IconButton";
import { MdFilterListAlt } from "react-icons/md";
import Select from "react-select";
import { Label } from "../ui/label";
import { IoGrid } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

const MainCarsHeader = ({
  totalCount,
  onShowFilters,
  onSetLayout,
  layout,
}: {
  totalCount: number;
  onShowFilters: () => void;
  layout: string;
  onSetLayout: (layout: string) => void;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function sortCarsHandler(name: {
    label: string;
    value: string;
    order: string;
  }) {
    searchParams.set("sortBy", name.value);
    searchParams.set("sortOrder", name.order);
    setSearchParams(searchParams);
  }
  return (
    <div className=" p-4 bg-white rounded-sm shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <h2 className=" text-xl font-semibold">
          Pronađeno {totalCount} vozila
        </h2>
        <IconButton
          size="default"
          tooltipText="sakrij filtere"
          variant="outline"
          className="bg-gray-100 w-24 hover:bg-gray-200"
          onClick={onShowFilters}
        >
          <MdFilterListAlt />
          Filteri
        </IconButton>
      </div>
      <div className=" flex items-center gap-x-6">
        <div className=" flex items-center gap-x-2">
          <Label>Sortiraj po:</Label>
          <Select
            defaultValue={{ label: "najnoviji", value: "najnoviji" }}
            className="basic-single z-20"
            name="sortBy"
            options={[
              { label: "najnoviji", value: "year", order: "desc" },
              { label: "najstariji", value: "year", order: "asc" },
              { label: "najjeftiniji", value: "price", order: "asc" },
              { label: "najskuplji", value: "price", order: "desc" },
            ]}
            onChange={sortCarsHandler}
          />
        </div>
        <div className="flex">
          <Button
            onClick={() => onSetLayout("grid")}
            variant="outline"
            size="icon"
            className={`rounded-full  hover:bg-gray-100 ${
              layout === "grid" && "bg-gray-200"
            }`}
          >
            <IoGrid />
          </Button>
          <Button
            onClick={() => onSetLayout("list")}
            variant="outline"
            size="icon"
            className={` rounded-full hover:bg-gray-100 ${
              layout === "list" && "bg-gray-200"
            }`}
          >
            <IoIosList />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainCarsHeader;
