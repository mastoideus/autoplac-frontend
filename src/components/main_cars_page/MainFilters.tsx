import React, { useState } from "react";
import { TfiReload } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Button } from "../ui/button";
import MainFiltersForm from "./MainFiltersForm";
import { useSearchParams } from "react-router";

const MainFilters = ({ onCloseFilters }: { onCloseFilters: () => void }) => {
  const [formKey, setFormKey] = useState(0);
  const [, setSearchParams] = useSearchParams();

  const submitFiltersHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const brand = formData.getAll("brand");
    const model = formData.getAll("model");
    const city = formData.getAll("city");
    const transmission = formData.getAll("transmission");
    const fuelType = formData.getAll("fuelType");
    const carType = formData.getAll("carType");
    const color = formData.getAll("color");
    const seats = formData.getAll("seats");
    const doors = formData.getAll("doors");
    const status = formData.getAll("status");

    const formDataObj = {
      ...data,
      brand,
      model,
      city,
      transmission,
      fuelType,
      carType,
      color,
      seats,
      doors,
      status,
    };

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(formDataObj)) {
      if (Array.isArray(value) && value[0] !== "") {
        searchParams.set(key, value.join(","));
      } else if (typeof value === "string" && value !== "") {
        searchParams.set(key, value);
      }
    }
    setSearchParams(searchParams);
  };

  function resetFormHandler() {
    setFormKey((prev) => prev + 1);
    setSearchParams({});
  }

  return (
    <div className=" p-4  h-[83vh] relative">
      <div className=" flex items-center justify-between mb-6">
        <h2 className=" text-lg lg:text-xl font-semibold">Napredni filteri</h2>
        <div className=" flex items-center gap-x-2">
          <Button
            size="icon"
            className=" bg-gray-300"
            onClick={resetFormHandler}
          >
            <TfiReload className=" text-white" />
          </Button>
          <Button size="icon" className=" bg-primary" onClick={onCloseFilters}>
            <MdKeyboardArrowLeft className=" text-white" />
          </Button>
        </div>
      </div>
      <MainFiltersForm key={formKey} onSubmit={submitFiltersHandler} />
    </div>
  );
};

export default MainFilters;
