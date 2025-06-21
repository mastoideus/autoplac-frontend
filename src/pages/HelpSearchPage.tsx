import React, { useState } from "react";
import MultiSelect from "@/components/global/MultiSelect";
import customFetch from "@/axios";
import { useQuery } from "@tanstack/react-query";
import CarTypeBox from "@/components/help_search_page/CarTypeBox";
import { carTypeData, cities, fuelTypes } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import BasicInput from "@/components/global/BasicInput";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

type Option = { label: string; value: string };

const HelpSearchPage = () => {
  const navigate = useNavigate();
  const [carTypes, setCarTypes] = useState<string[]>([]);
  const [basicInputs, setBasicInputs] = useState({
    maxPrice: "",
    mileage: "",
    maxYear: "",
  });
  const [selectInputs, setSelectInputs] = useState<{
    brands: Option[];
    transmission: Option[];
    fuelType: Option[];
    city: Option[];
  }>({
    brands: [],
    transmission: [],
    fuelType: [],
    city: [],
  });

  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brands-stores"],
    queryFn: () => customFetch("/api/brands-stores"),
  });

  let transformedOptions = [];
  if (responseData) {
    transformedOptions = responseData?.data?.data?.brands.map(
      (brand: { name: string; _id: string }) => {
        return {
          label: brand.name,
          value: brand._id,
        };
      }
    );
  }

  const handleCarType = (carType: string) => {
    setCarTypes((prevState) => {
      if (prevState.includes(carType)) {
        return prevState.filter((ct) => ct !== carType);
      } else {
        return [...prevState, carType];
      }
    });
  };

  const handleSelectChange = (name: string, selected: any[]) => {
    setSelectInputs((prevState) => {
      return {
        ...prevState,
        [name]: selected,
      };
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicInputs((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleHelpSearch = () => {
    const params = new URLSearchParams();
    console.log(carTypes);
    console.log(carTypes.join(","));

    const addArrayParam = (
      key: string,
      arr: { label: string; value: string }[]
    ) => {
      if (arr.length) {
        params.set(key, arr.map((item) => item.value).join(","));
      }
    };
    addArrayParam("brand", selectInputs.brands);
    addArrayParam("fuelType", selectInputs.fuelType);
    addArrayParam("transmission", selectInputs.transmission);
    addArrayParam("city", selectInputs.city);

    if (carTypes.length) {
      params.set("carType", carTypes.join(","));
    }

    Object.entries(basicInputs).forEach(([key, value]) => {
      if (value.trim() !== "") {
        params.set(key, value.trim());
      }
    });

    navigate(`/main-search?${params.toString()}`);
  };

  return (
    <div className=" bg-gray-50">
      <main className=" max-w-[95%] w-[550px] mx-auto pt-10 ">
        <MultiSelect
          onChange={handleSelectChange}
          value={selectInputs.brands}
          name="brands"
          labelText="Proizvođač"
          options={transformedOptions}
          className=" mt-4"
          labelClassName="text-xl md:text-2xl lg:text-3xl md:font-semibold lowercase capitalize"
        />
        <section className=" mt-10">
          <Label className="text-xl md:text-2xl lg:text-3xl md:font-semibold">
            Tip karoserije
          </Label>
          <div className=" mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {carTypeData.map((carType) => {
              const { name, image } = carType;
              return (
                <CarTypeBox
                  isSelected={carTypes.includes(name)}
                  name={name}
                  image={image}
                  onClick={handleCarType}
                />
              );
            })}
          </div>
        </section>
        <section className=" mt-12">
          <Label className="text-xl md:text-2xl lg:text-3xl md:font-semibold">
            Opšte informacije
          </Label>
          <div className=" my-4 grid grid-cols-2 gap-4">
            <BasicInput
              type="number"
              name="maxPrice"
              labelText="Budžet(max)"
              className=" border-none outline-none focus:border-none focus-visible:ring-0 "
              insideText="KM"
              placeholder="Budžet"
              onChange={handleInputChange}
              value={basicInputs.maxPrice}
              insideClassName="flex items-center bg-white rounded-sm shadow-sm pr-2"
            />
            <BasicInput
              type="number"
              name="maxMileage"
              labelText="Kilometraža"
              className=" border-none outline-none focus:border-none focus-visible:ring-0 "
              insideText="km"
              placeholder="Kilometraža"
              onChange={handleInputChange}
              value={basicInputs.mileage}
              insideClassName="flex items-center bg-white rounded-sm shadow-sm pr-2"
            />
            <BasicInput
              type="number"
              name="maxYear"
              labelText="Godište"
              className=" border-none outline-none focus:border-none focus-visible:ring-0 "
              insideText="god."
              placeholder="Godište"
              onChange={handleInputChange}
              value={basicInputs.maxYear}
              insideClassName="flex items-center bg-white rounded-sm shadow-sm pr-2"
            />
            <MultiSelect
              labelText="Transmisija"
              options={[
                { label: "automatik", value: "Automatic" },
                { label: "manualni", value: "Manual" },
              ]}
              name="transmission"
              value={selectInputs.transmission}
              onChange={handleSelectChange}
            />
            <MultiSelect
              labelText="Gorivo"
              options={fuelTypes}
              name="fuelType"
              value={selectInputs.fuelType}
              onChange={handleSelectChange}
            />
            <MultiSelect
              labelText="Grad"
              options={cities}
              name="city"
              value={selectInputs.city}
              onChange={handleSelectChange}
            />
          </div>
        </section>
        <div className=" mt-16">
          <p className=" text-gray-500 text-justify ">
            Ako ne uspijemo pronaći željena vozila, iskoristit ćemo te podatke
            kako bismo vam u budućnosti dostavljali sadržaj koji se poklapa s
            vašim interesima putem push obavijesti, web obavijesti ili e-pošte.
          </p>
          <Button
            className=" w-full bg-blue-800 text-white mt-10 py-6"
            onClick={handleHelpSearch}
          >
            Nastavite dalje
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HelpSearchPage;
