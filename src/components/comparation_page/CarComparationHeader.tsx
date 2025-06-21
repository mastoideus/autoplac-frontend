import { Link } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import { Button } from "../ui/button";

const CarComparationHeader = ({ carsData }: { carsData: any }) => {
  return (
    <header className=" mt-4  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-3 md:gap-x-5">
      <div className="hidden lg:block p-6 shadow-md rounded-md">
        <h2 className=" font-semibold text-xl md:text-2xl">
          Reklamiraj se na AutoPlacu
        </h2>
        <p className=" mt-4 mb-6 text-gray-500 text-sm">
          Otkrijte budućnost kupovine i prodaje automobila uz AutoPlac! Bez
          obzira da li tražite sportski automobil, porodični automobil ili SUV,
          AutoPlac ima sve što vam treba.
        </p>
        <Button size="lg" className=" bg-primary text-white">
          Kontaktirajte nas
        </Button>
      </div>
      {carsData.map((car: any) => {
        const {
          basicInfo: {
            brand: { name: brandName },
            model: { name: modelName },
          },
          user: userId,
          location: { city: location },
        } = car;
        return (
          <div
            className={`   rounded-md overflow-hidden  ${
              carsData.length > 2 && "last:hidden"
            } lg:last:block`}
          >
            <img src={car.images[0]} className="w-full h-[70%] object-cover " />
            <div className=" bg-gray-50 py-3 px-5">
              <h2 className=" font-semibold text-xl lg:text-2xl">
                {brandName} {modelName}
              </h2>

              <Link
                to={`/user/${userId}`}
                className=" relative z-20 flex items-center gap-x-2 my-2 transition-all duration-300 hover:translate-x-2 hover:bg-gray-50"
              >
                <FaCircleUser size={38} color="gray" />
                <div className="  gap-x-2">
                  <h4 className=" text-sm">username</h4>
                  <p className=" text-sm text-gray-400">{location}</p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </header>
  );
};

export default CarComparationHeader;
