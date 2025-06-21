import React from "react";
import { useCompareCarsContext } from "@/lib/context/compareCars";
import { calcTimePast } from "@/lib/utils";
import { Button } from "../ui/button";
import { TbExchange } from "react-icons/tb";
import { FaCalendar, FaRoad } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { Link } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";

type CarListCardProps = {
  brand: string;
  model: string;
  fuelType: string;
  image: string;
  mileage: number;
  price: number;
  year: number;
  createdAt: string;
  id: string;
  userId: string;
  location: string;
};

const CarListCard = ({
  brand,
  model,
  fuelType,
  image,
  mileage,
  price,
  year,
  createdAt,
  id,
  userId,
  location,
}: CarListCardProps) => {
  const { addComparationCar, comparationCars } = useCompareCarsContext();
  const isCompared = comparationCars.map((car) => car.id).includes(id);
  const timePassedText = calcTimePast(createdAt);

  return (
    <div className=" flex items-center justify-between rounded-md overflow-hidden pr-4 h-44 relative bg-white shadow-sm">
      <div className=" flex items-center gap-x-8 h-full">
        <img src={image} className=" object-cover w-80 h-full" />

        <div>
          <h2 className=" text-2xl font-semibold">
            {brand} {model}
          </h2>
          <div className=" flex items-center justify-between gap-x-6 mt-1">
            <p className="  flex items-center gap-x-1 text-base ">
              <BsFillFuelPumpFill color="gray" />

              {fuelType}
            </p>
            <p className=" flex items-center gap-x-1 text-base">
              <FaRoad color="gray" />
              {mileage}
            </p>
            <p className=" flex items-center gap-x-1 text-base">
              <FaCalendar color="gray" />
              {year}
            </p>
          </div>
          <p className=" text-lg md:text-xl my-2 font-black">{price} KM</p>
          <p className=" text-gray-400 text-sm">{timePassedText}</p>
        </div>
      </div>
      <div className="  p-8 w-60 border-l-2 border-gray-200">
        <Link
          to={`/user/${userId}`}
          className=" relative z-20 flex flex-col items-center gap-x-2 my-4 transition-all duration-300 hover:translate-x-2 hover:bg-gray-50"
        >
          <FaCircleUser size={45} color="gray" />
          <div className="  gap-x-2">
            <h4 className=" text-sm">username</h4>
          </div>
          <p className=" text-sm text-gray-400 flex items-center gap-x-1">
            <MdLocationOn size={20} className="  text-blue-300" />
            {location}
          </p>
        </Link>
      </div>
      <div className=" absolute top-4  left-2 group z-30">
        <Button
          onClick={() => addComparationCar({ brand, model, image, price, id })}
          type="button"
          variant="outline"
          className={` bg-gray-100  overflow-hidden rounded-3xl group-hover:bg-white  w-8 group-hover:w-28  transition-all duration-500 ${
            isCompared &&
            "bg-primary text-white group-hover:bg-primary group-hover:text-white"
          }`}
        >
          <TbExchange className="  rounded-full ml-[3.9rem] group-hover:ml-0 transition-all duration-500 " />
          <span className="  translate-x-10  group-hover:translate-x-0 transition-all duration-500 ">
            {" "}
            Uporedi
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CarListCard;
