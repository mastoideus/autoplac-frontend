import { queryClient } from "@/axios/queryClient";
import customFetch from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import CollapsibleStats from "@/components/comparation_page/CollapsibleStats.tsx";
import CarComparationHeader from "@/components/comparation_page/CarComparationHeader";
import GridCol from "@/components/comparation_page/GridCol";
import GridRow from "@/components/comparation_page/GridRow";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import {
  basicInfoKeys,
  appearanceKeys,
  featuresKeys,
  mechanicsKeys,
} from "@/lib/utils";
import type React from "react";

type UiCarData = {
  basicInfo: Record<string, React.ReactNode>;
  mechanics: Record<string, React.ReactNode>;
  appearance: Record<string, React.ReactNode>;
  features: Record<string, boolean>;
};

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const idsAsString = url.searchParams.get("id");

  await queryClient.prefetchQuery({
    queryKey: ["compare_cars", idsAsString],
    queryFn: () => customFetch.get(`/api/cars/compare?id=${idsAsString}`),
  });

  return null;
};

const CarComparationPage = () => {
  const [searchParams] = useSearchParams();
  const ids = searchParams.get("id");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["compare_cars", ids],
    queryFn: () => customFetch.get(`/api/cars/compare?id=${ids}`),
  });

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h2>error...</h2>
      </div>
    );
  }

  const carsData = data?.data.data;
  const [firstCar, secondCar, thirdCar] = carsData;

  const bestCarPrice = Math.min(
    firstCar.basicInfo.price,
    secondCar.basicInfo.price,
    thirdCar?.basicInfo.price || Infinity
  );
  const bestCarMileage = Math.min(
    firstCar.basicInfo.mileage,
    secondCar.basicInfo.mileage,
    thirdCar?.basicInfo.mileage || Infinity
  );
  const years = [firstCar.basicInfo.year, secondCar.basicInfo.year];
  if (thirdCar?.basicInfo?.year) {
    years.push(thirdCar.basicInfo.year);
  }
  const bestCarYear = Math.max(...years);

  const transformedData: UiCarData[] = carsData.map((car: any) => {
    const uiCarData = {
      basicInfo: {
        price: car.basicInfo.price,
        brand: car.basicInfo.brand.name,
        model: car.basicInfo.model.name,
        location: car.location.city,
        mileage: car.basicInfo.mileage,
        year: car.basicInfo.year,
      },
      mechanics: {
        transmission: car.mechanics.transmission,
        fuelType: car.mechanics.fuelType,
        power: car.mechanics.engine.power.kw,
      },
      appearance: {
        color: car.appearance.color,
        doors: car.appearance.doors,
        seats: car.appearance.seats,
        wheels: car.appearance.wheels.sizeInches,
      },
      features: {
        ...car.features,
      },
    };
    return uiCarData;
  });

  return (
    <div className=" page_layout">
      <CarComparationHeader carsData={carsData} />

      <section className="mt-14 bg-transparent">
        <CollapsibleStats
          title="osnovne informacije"
          className="grid-cols-3  lg:grid-cols-4"
          headerClassName="w-96"
        >
          <GridCol>
            {basicInfoKeys.map((key, index) => {
              return (
                <GridRow
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                  }`}
                  key={key}
                >
                  {key}
                </GridRow>
              );
            })}
          </GridCol>
          {transformedData.map((car: any) => {
            return (
              <GridCol carsLength={carsData.length}>
                {Object.entries(car.basicInfo).map(([key, value], index) => {
                  let bestOfferClass = "";
                  if (
                    (key === "price" && value === bestCarPrice) ||
                    (key === "mileage" && value === bestCarMileage) ||
                    (key === "year" && value === bestCarYear)
                  ) {
                    bestOfferClass = "px-2 rounded-md bg-green-200";
                  }
                  return (
                    <GridRow
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                      }`}
                    >
                      <span className={bestOfferClass}>
                        {value as React.ReactNode}
                      </span>
                    </GridRow>
                  );
                })}
              </GridCol>
            );
          })}
        </CollapsibleStats>
        <CollapsibleStats
          title="mehaničke informacije"
          className="grid-cols-3  lg:grid-cols-4"
          headerClassName="w-96"
        >
          <GridCol>
            {mechanicsKeys.map((key, index) => {
              return (
                <GridRow
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                  }`}
                  key={key}
                >
                  {key}
                </GridRow>
              );
            })}
          </GridCol>
          {transformedData.map((car: any) => {
            return (
              <GridCol carsLength={carsData.length}>
                {Object.entries(car.mechanics).map(([, value], index) => {
                  return (
                    <GridRow
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                      }`}
                    >
                      {value as React.ReactNode}
                    </GridRow>
                  );
                })}
              </GridCol>
            );
          })}
        </CollapsibleStats>
        <CollapsibleStats
          title="karoserija/izgled"
          className="grid-cols-3  lg:grid-cols-4"
          headerClassName="w-96"
        >
          <GridCol>
            {appearanceKeys.map((key, index) => {
              return (
                <GridRow
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                  }`}
                  key={key}
                >
                  {key}
                </GridRow>
              );
            })}
          </GridCol>
          {transformedData.map((car: any) => {
            return (
              <GridCol carsLength={carsData.length}>
                {Object.entries(car.appearance).map(([, value], index) => {
                  return (
                    <GridRow
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                      }`}
                    >
                      {value as React.ReactNode}
                    </GridRow>
                  );
                })}
              </GridCol>
            );
          })}
        </CollapsibleStats>
        <CollapsibleStats
          title="dodatna oprema"
          className="grid-cols-3  lg:grid-cols-4"
          headerClassName="w-96"
        >
          <GridCol>
            {featuresKeys.map((key, index) => {
              return (
                <GridRow
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                  }`}
                  key={key}
                >
                  {key}
                </GridRow>
              );
            })}
          </GridCol>
          {transformedData.map((car: any) => {
            return (
              <GridCol carsLength={carsData.length}>
                {Object.entries(car.features).map(([, value], index) => {
                  return (
                    <GridRow
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-transparent"
                      }`}
                    >
                      <div className=" p-1">
                        {value ? (
                          <FaCheck color="green" className="" />
                        ) : (
                          <ImCross color="darkred" />
                        )}
                      </div>
                    </GridRow>
                  );
                })}
              </GridCol>
            );
          })}
        </CollapsibleStats>
      </section>
    </div>
  );
};

export default CarComparationPage;
