import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const storeCarsToLocalStorage = (cars: Car[], newCar: Car) => {
  localStorage.setItem("comparation_cars", JSON.stringify([...cars, newCar]));
};
const getCarsFromLocalStorage = () => {
  const cars = JSON.parse(localStorage.getItem("comparation_cars") as string);
  return cars || [];
};
const removeCarFromLocalStorage = (carId: string) => {
  const cars = getCarsFromLocalStorage();
  const newCars = cars.filter((c: Car) => c.id !== carId);
  localStorage.setItem("comparation_cars", JSON.stringify(newCars));
};

type Car = {
  brand: string;
  model: string;
  image: string;
  price: number;
  id: string;
};

const CompareCarsContext = createContext<{
  comparationCars: Car[];
  addComparationCar: (car: Car) => void;
}>({
  comparationCars: [],
  addComparationCar: () => {},
});

export const CompareCarsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [comparationCars, setComparationCars] = useState<Car[]>(
    getCarsFromLocalStorage()
  );

  function addComparationCar(car: Car) {
    const existingCarIndex = comparationCars.findIndex((c) => c.id === car.id);
    if (existingCarIndex !== -1) {
      setComparationCars((prevCars) => {
        const newCars = prevCars.filter((c) => c.id !== car.id);
        removeCarFromLocalStorage(car.id);
        return newCars;
      });
      toast("Automobil je uklonjen sa liste za poređenje");
      return;
    }
    if (comparationCars.length === 3) {
      toast("Već su dodana tri automobila za poređenje");
      return;
    }
    setComparationCars((prevCars) => {
      return [...prevCars, car];
    });
    storeCarsToLocalStorage(comparationCars, car);
    toast("Automobil je uspješno dodan na listu za poređenje");
  }

  return (
    <CompareCarsContext.Provider value={{ comparationCars, addComparationCar }}>
      {children}
    </CompareCarsContext.Provider>
  );
};

export const useCompareCarsContext = () => {
  return useContext(CompareCarsContext);
};
