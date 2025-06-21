import React from "react";
import { cn } from "@/lib/utils";
import type { Car } from "@/lib/utils";

const MainCarsList = ({
  children,
  className,
  cars,
}: {
  children: (car: Car) => React.ReactNode;
  className?: string;
  cars: Car[];
}) => {
  console.log(cars);
  return (
    <ul className={cn(" mt-8", className)}>
      {cars?.map((car) => {
        return children(car);
      })}
    </ul>
  );
};

export default MainCarsList;
