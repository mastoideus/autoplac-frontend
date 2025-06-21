import { useParams } from "react-router";
import customFetch from "@/axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import ImageCarousel from "./ImageCarousel";
import { TbAutomaticGearbox } from "react-icons/tb";
import { MdCarCrash } from "react-icons/md";
import SingleInfoBox from "./SingleInfoBox";
import { IoCalendarOutline } from "react-icons/io5";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaRoad } from "react-icons/fa";
import CollapsibleStats from "../comparation_page/CollapsibleStats";
import InfoGridRow from "./InfoGridRow";
import SingleTitle from "./SingleTitle";
import SingleUserBox from "./SingleUserBox";

const SingleCar = () => {
  const { carId } = useParams();

  const { data: responseData } = useSuspenseQuery({
    queryKey: ["single_car", carId],
    queryFn: () => customFetch.get(`/api/cars/${carId}`),
  });

  const car = responseData.data.data;
  console.log(car);

  const mechanics = {
    cilindri: car.mechanics.engine.cylinders,
    snaga: car.mechanics.engine.power.hp,
    emisija: car.mechanics.emissions.co2,
  };
  const appearance = {
    boja: car.appearance.color,
    vrata: car.appearance.doors,
    sjedišta: car.appearance.seats,
  };
  const features = {
    abs: car.features.abs,
    klima: car.features.airConditioning,
    airbegovi: car.features.aribags,
    bluetooth: car.features.bluetooth,
    navigacija: car.features.navigationSystem,
    senzori: car.features.parkingSensors,
  };

  return (
    <>
      <section className=" grid md:grid-cols-6 p-4 rounded-md shadow-sm bg-white gap-x-10">
        <div className=" col-span-4 pb-4">
          <ImageCarousel slides={car.images} />
          <SingleTitle
            brandName={car.basicInfo.brandName}
            modelName={car.basicInfo.modelName}
            price={car.basicInfo.price}
            createdAt={car.createdAt}
            image={car.images[0]}
            id={car._id}
          />
        </div>

        <div className=" col-span-2">
          <SingleUserBox city={car.location.city} />
        </div>
      </section>

      <section className=" grid md:grid-cols-2 lg:grid-cols-3 mt-6 gap-3">
        <SingleInfoBox
          labelText="proizvođač"
          value={car.basicInfo.brand.name}
          iconSrc={car.basicInfo.brand.logo}
          iconType="image"
        />
        <SingleInfoBox
          labelText="model"
          value={car.basicInfo.model.name}
          icon={<MdCarCrash size={25} className="text-blue-600" />}
        />
        <SingleInfoBox
          labelText="godište"
          value={car.basicInfo.year}
          icon={<IoCalendarOutline size={25} className="text-blue-600" />}
        />
        <SingleInfoBox
          labelText="gorivo"
          value={car.mechanics.fuelType}
          icon={<BsFillFuelPumpFill size={25} className="text-blue-600" />}
        />
        <SingleInfoBox
          labelText="kilometraža"
          value={car.basicInfo.mileage}
          icon={<FaRoad size={25} className="text-blue-600" />}
        />
        <SingleInfoBox
          labelText="transmisija"
          value={car.mechanics.transmission}
          icon={<TbAutomaticGearbox size={25} className=" text-blue-600" />}
        />
      </section>

      <section className=" mt-6 bg-white shadow-sm p-6">
        <CollapsibleStats
          title="Mehaničke specifikacije"
          className=" md:grid-cols-2 gap-2"
        >
          {Object.entries(mechanics).map(([key, value]) => {
            return <InfoGridRow label={key} value={value} />;
          })}
        </CollapsibleStats>
        <CollapsibleStats
          title="Karoserija/izgled"
          className=" md:grid-cols-2 gap-2"
        >
          {Object.entries(appearance).map(([key, value]) => {
            return <InfoGridRow label={key} value={value} />;
          })}
        </CollapsibleStats>
        <CollapsibleStats
          title="Dodatna oprema"
          className=" md:grid-cols-2 gap-2"
        >
          {Object.entries(features).map(([key, value]) => {
            return <InfoGridRow label={key} value={value} />;
          })}
        </CollapsibleStats>
      </section>
    </>
  );
};

export default SingleCar;
