import ListWrapper from "./ListWrapper";
import { useInfiniteQuery } from "@tanstack/react-query";
import fetchAllCars from "@/axios/fetchFunctions/fetchAllCars";
import CarCard from "../global/CarCard";
import { Button } from "../ui/button";
import { FaArrowDown } from "react-icons/fa6";
import { Loader2 } from "lucide-react";

const CarsList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["cars"],
      queryFn: fetchAllCars,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
      },
    });

  if (!data) {
    return <div>Could not fetch data</div>;
  }

  return (
    <>
      <ListWrapper
        subtitle="moglo bi Vas zanimat"
        textMore="pogledajte sva vozila"
        data={data.pages}
        moreLink="/search"
      >
        {function (group) {
          return (
            <ul className=" grid gap-y-4 md:gap-x-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
              {group.data.map((car: any) => {
                const {
                  basicInfo: {
                    brand: { name: brandName },
                    model: { name: modelName },
                    mileage,
                    price,
                    year,
                  },
                  mechanics: { fuelType },
                  images,
                  createdAt,
                  _id: id,
                  user: userId,
                  location: { city },
                } = car;

                return (
                  <CarCard
                    key={id}
                    brand={brandName}
                    model={modelName}
                    fuelType={fuelType}
                    image={images[0]}
                    mileage={mileage}
                    price={price}
                    year={year}
                    createdAt={createdAt}
                    id={id}
                    userId={userId}
                    location={city}
                  />
                );
              })}
            </ul>
          );
        }}
      </ListWrapper>
      {hasNextPage && (
        <div className=" text-center">
          <Button
            className=" bg-blue-900 text-white text-md font-semibold h-14 "
            size="lg"
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? (
              <Loader2 className="  animate-spin" />
            ) : (
              <>
                Učitaj više <FaArrowDown />
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default CarsList;
