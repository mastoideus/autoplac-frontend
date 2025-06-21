import { useState } from "react";
import { Button } from "../ui/button";
import { TbExchange } from "react-icons/tb";
import { useCompareCarsContext } from "@/lib/context/compareCars";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router";

const CompareCarsBox = () => {
  const { comparationCars, addComparationCar } = useCompareCarsContext();
  const [boxOpen, setBoxOpen] = useState(false);

  const comparationCarsIds = comparationCars.map((car) => car.id).join(",");

  return (
    <div className=" sticky bottom-4 float-right z-50">
      {boxOpen ? (
        <section className=" shadow-2xl p-4 rounded-lg bg-white min-w-56">
          <header className=" flex justify-end">
            <Button
              className=" bg-white rounded-xl flex items-center gap-x-2 shadow-lg hover:bg-white p-4"
              variant="outline"
              size="lg"
              onClick={() => setBoxOpen(false)}
            >
              <div className=" rounded-full w-6 h-6 bg-primary text-white flex items-center justify-center">
                <TbExchange />
              </div>
              Sakrij
            </Button>
          </header>
          <ul className=" my-3 flex items-center gap-x-3">
            {comparationCars.map((car) => {
              const { brand, model, image, price, id } = car;
              return (
                <article className=" w-28">
                  <div className=" relative">
                    <img src={image} className=" w-full h-24 object-cover" />
                    <Button
                      className=" absolute -top-1 -right-1 hover:bg-transparent"
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        addComparationCar({ brand, model, image, price, id })
                      }
                    >
                      <IoIosCloseCircle color="white" size={20} />
                    </Button>
                  </div>
                  <div>
                    <h3 className=" mt-2 ">
                      {brand} {model}
                    </h3>
                    <p className=" text-gray-400">{price} KM</p>
                  </div>
                </article>
              );
            })}
          </ul>
          <div>
            <Button
              className=" bg-primary text-white"
              size="lg"
              disabled={comparationCars.length < 2}
            >
              <Link
                to={`/compare?id=${comparationCarsIds}`}
                className="flex items-center gap-x-2"
              >
                <TbExchange color="white" />
                Uporedi
              </Link>
            </Button>
          </div>
        </section>
      ) : (
        <Button
          className=" bg-white rounded-xl flex items-center gap-x-2 shadow-lg hover:bg-white p-4"
          variant="outline"
          size="lg"
          onClick={() => setBoxOpen(true)}
        >
          <div className=" rounded-full w-6 h-6 bg-primary text-white flex items-center justify-center">
            <TbExchange />
          </div>
          Usporedba
        </Button>
      )}
    </div>
  );
};

export default CompareCarsBox;
