import type { Car } from "@/lib/utils";
import { useState } from "react";
import MainFilters from "./MainFilters";
import MainCarsHeader from "./MainCarsHeader";
import CarCard from "../global/CarCard";
import MainCarsList from "./MainCarsList";
import CarListCard from "./CarListCard";
import Pagination from "../global/Pagination";
import NoResultsSVG from "./NoResultsSVG";

interface MainCarsProps {
  cars: Car[];
  hasMore: boolean;
  currentPage: number;
  totalCount: number;
  pages: number;
}

const MainCars = ({
  cars,
  hasMore,
  currentPage,
  totalCount,
  pages,
}: MainCarsProps) => {
  const [layout, setLayout] = useState("grid");
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="flex items-start gap-x-8 p-6 bg-gray-50 transition-all duration-300">
      <aside
        className={` sticky top-[114px]  transition-all duration-500 ease-in-out  bg-white rounded-sm shadow-sm ${
          showFilters
            ? "w-80 opacity-100 translate-x-0"
            : "w-0 opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        <MainFilters onCloseFilters={() => setShowFilters(false)} />
      </aside>

      <main className="flex-1  ">
        <MainCarsHeader
          totalCount={totalCount}
          onShowFilters={() => setShowFilters((prevState) => !prevState)}
          layout={layout}
          onSetLayout={(layout: string) => setLayout(layout)}
        />

        <>
          {cars?.length === 0 ? (
            <div className="  min-h-[450px] flex flex-col items-center justify-center">
              <NoResultsSVG />
              <div className=" text-center">
                <h1 className=" text-xl md:text-4xl">Žao nam je</h1>
                <p className=" text-lg text-gray-500">
                  Zadanim filterima ne odgovara niti jedno vozilo...
                </p>
              </div>
            </div>
          ) : layout === "grid" ? (
            <MainCarsList
              cars={cars}
              className={`grid lg:grid-cols-3 xl:grid-cols-4 gap-4 ${
                !showFilters && "xl:grid-cols-5"
              }`}
            >
              {function (car) {
                return (
                  <CarCard
                    mileage={car.basicInfo.mileage}
                    fuelType={car.mechanics.fuelType}
                    brand={car.basicInfo.brand.name}
                    model={car.basicInfo.model.name}
                    image={car.images[0]}
                    price={car.basicInfo.price}
                    year={car.basicInfo.year}
                    createdAt={car.createdAt}
                    id={car._id}
                    location={car.location?.city}
                    userId={car.user}
                  />
                );
              }}
            </MainCarsList>
          ) : (
            <MainCarsList cars={cars} className="grid gap-y-4">
              {function (car) {
                return (
                  <CarListCard
                    mileage={car.basicInfo.mileage}
                    fuelType={car.mechanics.fuelType}
                    brand={car.basicInfo.brand.name}
                    model={car.basicInfo.model.name}
                    image={car.images[0]}
                    price={car.basicInfo.price}
                    year={car.basicInfo.year}
                    createdAt={car.createdAt}
                    id={car._id}
                    location={car.location?.city}
                    userId={car.user}
                  />
                );
              }}
            </MainCarsList>
          )}
        </>
        {pages > 1 && (
          <div className=" bg-slate-200 left-0  z-50 bottom-0 sticky w-full">
            <Pagination currentPage={currentPage} pages={pages} />
          </div>
        )}
      </main>
    </div>
  );
};

export default MainCars;
