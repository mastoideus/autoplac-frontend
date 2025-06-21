import { MdCalendarToday, MdRemoveRedEye } from "react-icons/md";
import IconButton from "../global/IconButton";
import { GoShareAndroid } from "react-icons/go";
import { TbExchange } from "react-icons/tb";
import { useCompareCarsContext } from "@/lib/context/compareCars";

type SingleTitleProps = {
  brandName: string;
  modelName: string;
  price: number;
  createdAt: string;
  image: string;
  id: string;
};

const SingleTitle = ({
  brandName,
  modelName,
  price,
  createdAt,
  image,
  id,
}: SingleTitleProps) => {
  const { addComparationCar, comparationCars } = useCompareCarsContext();
  const comparationCarsIds = comparationCars.map((car) => car.id);
  return (
    <div className=" mt-4">
      <div className="flex items-center justify-between">
        <h2 className=" text-xl md:text-[1.3rem]">
          {brandName} {modelName}
        </h2>
        <div className=" flex items-center gap-x-8">
          <IconButton
            size="icon"
            variant="ghost"
            className=" hover:bg-transparent"
            tooltipText="podijeli oglas"
          >
            <GoShareAndroid />
          </IconButton>
          <IconButton
            size="icon"
            variant="ghost"
            className=" hover:bg-transparent"
            tooltipText={
              comparationCarsIds.includes(id)
                ? "ukloni iz poređenja"
                : "dodaj za poređenje"
            }
            onClick={() =>
              addComparationCar({
                brand: brandName,
                model: modelName,
                price,
                image,
                id,
              })
            }
          >
            <TbExchange
              className={`${comparationCarsIds.includes(id) && "text-primary"}`}
            />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className=" text-xl lg:text-2xl font-semibold">{price} KM</p>
        <div className="flex gap-x-2">
          <p className="flex items-center text-sm gap-x-1 p-1 rounded-sm text-gray-500 border-2 border-gray-200">
            <MdCalendarToday />
            <span>Objavljeno</span>
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="flex items-center text-sm gap-x-1 p-1 rounded-sm text-gray-500 border-2 border-gray-200">
            <MdRemoveRedEye />
            <span>Pregledi</span>
            10
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleTitle;
