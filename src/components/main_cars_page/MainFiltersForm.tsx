import React, { useState, useEffect, useRef, type RefObject } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "../ui/button";
import FiltersAccordionSection from "./FiltersAccordionSection";
import MultiSelect from "../global/MultiSelect";
import { useQuery } from "@tanstack/react-query";
import customFetch from "@/axios";
import BasicInput from "../global/BasicInput";
import { Label } from "../ui/label";
import { FaArrowsLeftRightToLine } from "react-icons/fa6";
import { cities, seats } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { carTypeData, colors } from "@/lib/utils";
import { useLoaderData } from "react-router";
import { TfiReload } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";

type SelectOptionType = {
  label: string;
  value: string;
  brandId?: string;
  brandName?: string;
};

type BrandWithModelsType = {
  _id: string;
  name: string;
  options: {
    label: string;
    value: string;
  };
};

const MainFiltersForm = ({
  onSubmit,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const searchParamsObj = useLoaderData();

  const [depSelectInputs, setDepSelectInputs] = useState<{
    brand: SelectOptionType[];
    model: SelectOptionType[];
  }>({
    brand: [],
    model: [],
  });

  const { data: groupedModelsBrands } = useQuery({
    queryKey: ["grouped-models"],
    queryFn: () => customFetch("/api/grouped-models"),
  });

  const handleSelectChange = (name: string, selected: SelectOptionType[]) => {
    if (name === "model") {
      let selectedBrands = [...depSelectInputs.brand];
      const lastSelectedModel = selected[selected.length - 1];

      if (
        lastSelectedModel?.brandId &&
        lastSelectedModel?.brandName &&
        selected.length > depSelectInputs.model.length &&
        !selectedBrands.some(
          (brand) => brand.value === lastSelectedModel.brandId
        )
      ) {
        selectedBrands.push({
          label: lastSelectedModel.brandName,
          value: lastSelectedModel.brandId,
        });
      }

      setDepSelectInputs((prev) => ({
        ...prev,
        model: selected.map((model) => ({
          label: model.label,
          value: model.value,
          brandId: model.brandId,
          brandName: model.brandName,
        })),
        brand: selectedBrands,
      }));
    } else if (name === "brand") {
      const selectedBrandIds = new Set(selected.map((brand) => brand.value));

      const updatedSelectedModels = depSelectInputs.model.filter((model) =>
        selectedBrandIds.has(model.brandId!)
      );

      setDepSelectInputs((prev) => ({
        model: updatedSelectedModels,
        brand: selected,
      }));
    }
  };

  let updatedDepSelectInputs = groupedModelsBrands?.data.data;
  if (depSelectInputs.brand.length > 0) {
    updatedDepSelectInputs = groupedModelsBrands?.data.data.filter((item) => {
      return depSelectInputs.brand.some((brand) => brand.value === item._id);
    });
  }

  useEffect(() => {
    const allBrands = groupedModelsBrands?.data.data;
    const selectedBrandIds = searchParamsObj.brand?.split(",") || [];
    const initialBrands: SelectOptionType[] = [];
    allBrands?.forEach((brand: BrandWithModelsType) => {
      if (selectedBrandIds.includes(brand._id)) {
        initialBrands.push({ label: brand.name, value: brand._id });
      }
    });
    setDepSelectInputs((prev) => {
      return { ...prev, brand: initialBrands };
    });
  }, [groupedModelsBrands?.data.data, searchParamsObj.brand]);

  return (
    <form onSubmit={onSubmit}>
      <div className=" overflow-y-scroll h-[60vh] pr-4">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <FiltersAccordionSection title="Osnovne informacije" value="item-1">
            <MultiSelect
              labelText="Proizvođač"
              name="brand"
              onChange={handleSelectChange}
              options={groupedModelsBrands?.data.data.map((brand: any) => ({
                label: brand.name,
                value: brand._id,
              }))}
              labelClassName=" capitalize font-medium"
              value={depSelectInputs.brand}
            />
            <MultiSelect
              labelText="Model"
              name="model"
              onChange={handleSelectChange}
              options={updatedDepSelectInputs?.map((brand: any) => ({
                label: brand.name,
                options: (brand.options || []).map((model: any) => ({
                  label: model.label,
                  value: model.value,
                  brandId: brand._id,
                  brandName: brand.name,
                })),
              }))}
              labelClassName=" capitalize font-medium"
              value={depSelectInputs.model}
            />
            <div>
              <Label>Godište</Label>
              <div className="flex items-center gap-x-1">
                <BasicInput
                  type="number"
                  name="minYear"
                  className=" border-[1px] border-gray-300 "
                  placeholder="2013"
                />
                <FaArrowsLeftRightToLine size={30} className=" text-gray-300" />
                <BasicInput
                  type="number"
                  name="maxYear"
                  className=" border-[1px] border-gray-300"
                  placeholder="2015"
                  defaultValue={searchParamsObj.maxYear ?? ""}
                />
              </div>
            </div>
            <div>
              <Label>Kilometraža</Label>
              <div className="flex items-center gap-x-1">
                <BasicInput
                  type="number"
                  name="minMileage"
                  className=" border-[1px] border-gray-300 "
                  placeholder="123.000"
                />
                <FaArrowsLeftRightToLine size={30} className=" text-gray-300" />
                <BasicInput
                  type="number"
                  name="maxMileage"
                  className=" border-[1px] border-gray-300"
                  placeholder="20.000"
                  defaultValue={searchParamsObj.maxMileage ?? ""}
                />
              </div>
            </div>
            <MultiSelect
              options={cities}
              labelText="Grad"
              name="city"
              labelClassName=" capitalize"
              onChange={() => {}}
              defaultValue={searchParamsObj.city
                ?.split(",")
                .map((city: string) => {
                  return { label: city, value: city };
                })}
            />
            <div>
              <Label>Cijena</Label>
              <div className="flex items-center gap-x-1">
                <BasicInput
                  type="number"
                  name="minPrice"
                  className=" border-[1px] border-gray-300 "
                  placeholder="99.000"
                />
                <FaArrowsLeftRightToLine size={30} className=" text-gray-300" />
                <BasicInput
                  type="number"
                  name="maxPrice"
                  className=" border-[1px] border-gray-300"
                  placeholder="34.546"
                  defaultValue={searchParamsObj.maxPrice ?? ""}
                />
              </div>
            </div>
            <div className=" flex flex-col gap-y-3 mt-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="hitno">Hitno</Label>
                <Checkbox id="hitno" name="status" value="hitno" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="u-dolasku">U dolasku</Label>
                <Checkbox id="u-dolasku" name="status" value="u-dolasku" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="novo">Novo</Label>
                <Checkbox id="novo" name="status" value="novo" />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="sniženo">Sniženo</Label>
                <Checkbox id="sniženo" name="status" value="sniženo" />
              </div>
            </div>
          </FiltersAccordionSection>
          <FiltersAccordionSection
            title="Mehaničke specifikacije"
            value="item-2"
          >
            <MultiSelect
              labelText="transmisija"
              labelClassName=" capitalize"
              name="transmission"
              options={[
                { label: "automatik", value: "Automatic" },
                { label: "manualni", value: "Manual" },
              ]}
              onChange={() => {}}
              defaultValue={searchParamsObj.transmission
                ?.split(",")
                .map((transType: string) => {
                  return { label: transType, value: transType };
                })}
            />
            <MultiSelect
              labelText="gorivo"
              name="fuelType"
              labelClassName=" capitalize"
              options={[
                { label: "dizel", value: "Diesel" },
                { label: "elektro", value: "Electric" },
                { label: "hibrid", value: "Hybrid" },
                { label: "benzin", value: "Petrol" },
              ]}
              onChange={() => {}}
              defaultValue={searchParamsObj.fuelType
                ?.split(",")
                .map((fuelType: string) => {
                  return { label: fuelType, value: fuelType };
                })}
            />
            <div>
              <Label>Snaga (KW)</Label>
              <div className="flex items-center gap-x-1">
                <BasicInput
                  type="number"
                  name="minKW"
                  className=" border-[1px] border-gray-300 "
                  placeholder="47 KW"
                />
                <FaArrowsLeftRightToLine size={30} className=" text-gray-300" />
                <BasicInput
                  type="number"
                  name="maxKW"
                  className=" border-[1px] border-gray-300"
                  placeholder="104 KW"
                />
              </div>
            </div>
            <div>
              <Label>Snaga (KS)</Label>
              <div className="flex items-center gap-x-1">
                <BasicInput
                  type="number"
                  name="minHS"
                  className=" border-[1px] border-gray-300 "
                  placeholder="50 KS"
                />
                <FaArrowsLeftRightToLine size={30} className=" text-gray-300" />
                <BasicInput
                  type="number"
                  name="maxHS"
                  className=" border-[1px] border-gray-300"
                  placeholder="1000 KS"
                />
              </div>
            </div>
          </FiltersAccordionSection>
          <FiltersAccordionSection title="Karoserija/izgled" value="item-3">
            <MultiSelect
              labelText="tip karoserije"
              name="carType"
              onChange={() => {}}
              options={carTypeData.map((type) => ({
                label: type.name,
                value: type.name,
              }))}
              labelClassName=" capitalize"
              defaultValue={searchParamsObj.carType
                ?.split(",")
                .map((carType: string) => {
                  return { label: carType, value: carType };
                })}
            />
            <MultiSelect
              labelText="boja"
              name="color"
              onChange={() => {}}
              labelClassName=" capitalize"
              options={colors}
            />
            <MultiSelect
              labelText="broj vrata"
              name="doors"
              onChange={() => {}}
              labelClassName=" capitalize"
              options={[
                { label: "2/3", value: "2/3" },
                { label: "4/5", value: "4/5" },
              ]}
            />
            <MultiSelect
              labelText="broj sjedišta"
              name="seats"
              labelClassName="capitalize"
              options={seats}
              onChange={() => {}}
            />
          </FiltersAccordionSection>
          <FiltersAccordionSection title="Dodatna oprema" value="item-4">
            <div className=" flex flex-col gap-y-3 mt-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="airConditioning">Klima</Label>
                <Checkbox
                  id="airConditioning"
                  name="airConditioning"
                  defaultChecked={searchParamsObj.airConditioning === "on"}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="navigationSystem">Navigacija</Label>
                <Checkbox
                  id="navigationSystem"
                  name="navigationSystem"
                  defaultChecked={searchParamsObj.navigationSystem === "on"}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="heatedSeats">Grijanje sjedišta</Label>
                <Checkbox
                  id="heatedSeats"
                  name="heatedSeats"
                  defaultChecked={searchParamsObj.heatedSeats === "on"}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="parkingSensors">Parking senzori</Label>
                <Checkbox
                  id="parkingSensors"
                  name="parkingSensors"
                  defaultChecked={searchParamsObj.parkingSensors === "on"}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="airbags">Airbagovi</Label>
                <Checkbox
                  id="airbags"
                  name="airbags"
                  defaultChecked={searchParamsObj.airbags === "on"}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="abs">ABS</Label>
                <Checkbox
                  id="abs"
                  name="abs"
                  defaultChecked={searchParamsObj.abs === "on"}
                />
              </div>
            </div>
          </FiltersAccordionSection>
        </Accordion>
      </div>

      <Button className=" text-white w-full absolute bottom-0 left-0 py-4 text-base">
        Spasi
      </Button>
    </form>
  );
};

export default MainFiltersForm;
