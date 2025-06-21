import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaRoad, FaCalendar } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { TbExchange } from "react-icons/tb";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { calcTimePast } from "@/lib/utils";
import { useCompareCarsContext } from "@/lib/context/compareCars";

type CarCardProps = {
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

const CarCard = ({
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
}: CarCardProps) => {
  const { addComparationCar, comparationCars } = useCompareCarsContext();
  const isCompared = comparationCars.map((car) => car.id).includes(id);
  const timePassedText = calcTimePast(createdAt);
  return (
    <div className=" rounded-md relative">
      <Link to={`/car/${id}`} className=" absolute inset-0 z-10"></Link>
      <section className=" h-44">
        <img
          src={image}
          className=" w-full object-cover h-full  rounded-t-md"
        />
      </section>

      <section className="p-4 bg-white shadow-sm">
        <h2 className=" text-lg lg:text-xl font-semibold mb-2">
          {brand} {model}
        </h2>
        <div className=" flex items-center justify-between">
          <p className=" flex items-center gap-x-1 text-sm text-gray-500">
            <BsFillFuelPumpFill />

            {fuelType}
          </p>
          <p className=" flex items-center gap-x-1 text-sm text-gray-500">
            <FaRoad />
            {mileage}
          </p>
          <p className=" flex items-center gap-x-1 text-sm text-gray-500">
            <FaCalendar color="gray" />
            {year}
          </p>
        </div>

        <Link
          to={`/user/${userId}`}
          className=" relative z-20 flex items-center gap-x-2 my-4 transition-all duration-300 hover:translate-x-2 hover:bg-gray-50"
        >
          <FaCircleUser size={38} color="gray" />
          <div className="  gap-x-2">
            <h4 className=" text-sm">username</h4>
            <p className=" text-sm text-gray-400">{location}</p>
          </div>
        </Link>

        <div className=" mt-8 flex items-center justify-between">
          <p className=" font-semibold text-lg md:text-xl">{price} KM</p>
          <p className=" text-sm text-gray-400">{timePassedText}</p>
        </div>
      </section>

      <div className=" absolute top-4 right-4 group z-30">
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

export default CarCard;
