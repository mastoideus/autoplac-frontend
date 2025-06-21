import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import kupeImg from "@/assets/images/types/kupe.png";
import hatchbackImg from "@/assets/images/types/hatchback.png";
import kabrioletImg from "@/assets/images/types/kabriolet.png";
import karavanImg from "@/assets/images/types/karavan.png";
import kombiImg from "@/assets/images/types/kombi.png";
import limuzinaImg from "@/assets/images/types/limuzina.png";
import suvImg from "@/assets/images/types/suv.png";
import monovolumenImg from "@/assets/images/types/monovolumen.png";
import ostaloImg from "@/assets/images/types/ostalo.png";

export const carTypeData = [
  { name: "kupe", image: kupeImg },
  { name: "hatchback", image: hatchbackImg },
  { name: "kabriolet", image: kabrioletImg },
  { name: "karavan", image: karavanImg },
  { name: "kombi", image: kombiImg },
  { name: "limuzina", image: limuzinaImg },
  { name: "suv", image: suvImg },
  { name: "monovolumen", image: monovolumenImg },
  { name: "ostalo", image: ostaloImg },
];

export const cities = [
  { label: "Denver", value: "Denver" },
  { label: "Seattle", value: "Seattle" },
  { label: "Indianapolis", value: "Indianapolis" },
  { label: "Washington", value: "Washington" },
  { label: "Charlotte", value: "Charlotte" },
  { label: "Columbus", value: "Columbus" },
  { label: "Austin", value: "Austin" },
  { label: "Jacksonville", value: "Jacksonville" },
  { label: "San Jose", value: "San Jose" },
  { label: "Dallas", value: "Dallas" },
  { label: "Philadelphia", value: "Philadelphia" },
  { label: "Phoenix", value: "Phoenix" },
  { label: "San Diego", value: "San Diego" },
  { label: "Chicago", value: "Chicago" },
  { label: "San Antonio", value: "San Antonio" },
  { label: "Houston", value: "Houston" },
  { label: "Los Angeles", value: "Los Angeles" },
  { label: "New York", value: "New York" },
];

export const fuelTypes = [
  { label: "dizel", value: "Diesel" },
  { label: "benzin", value: "Petrol" },
  { label: "hibrid", value: "Hybrid" },
  { label: "elektro", value: "Electric" },
];

export const colors = [
  { label: "crna", value: "black" },
  { label: "bijela", value: "white" },
  { label: "smeđa", value: "brown" },
  { label: "crvena", value: "red" },
  { label: "zelena", value: "green" },
  { label: "metalik", value: "metalic" },
  { label: "plava", value: "blue" },
];

export const seats = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calcTimePast(creationDate: string) {
  const now = Date.now();
  const creationTime = new Date(creationDate).getTime();
  const timePassed = now - creationTime;

  let remainingTime;
  const days = Math.floor(timePassed / (24 * 60 * 60 * 1000));
  remainingTime = timePassed % (24 * 60 * 60 * 1000);
  const hours = Math.floor(remainingTime / (60 * 60 * 1000));
  remainingTime = remainingTime % (60 * 60 * 1000);
  const minutes = Math.floor(remainingTime / (60 * 1000));

  let timePassedText;
  if (days > 25) {
    timePassedText = new Date(creationDate).toLocaleDateString();
  } else if (days <= 25 && days > 0) {
    timePassedText = `prije ${days} dana`;
  } else if (days === 0 && hours > 0) {
    timePassedText = `prije ${hours} sati`;
  } else {
    timePassedText = `prije ${minutes} min`;
  }

  return timePassedText;
}

export const basicInfoKeys = [
  "Cijena",
  "Proizvođač",
  "Model",
  "Lokacija",
  "Kilometraža",
  "Godište",
];

export const mechanicsKeys = ["Transmisija", "Gorivo", "Kilovata"];

export const appearanceKeys = [
  "Boja",
  "Broj vrata",
  "Broj sjedišta",
  "Veličina točkova",
];

export const featuresKeys = [
  "ABS",
  "Klima",
  "Airbagovi",
  "Bluetooth",
  "Tempomat",
  "Grijana sjedišta",
  "Navigacioni sistem",
  "Parking senzori",
  "Krovni otvor",
  "Kontrola proklizavanja",
];

export interface Car {
  _id: string;
  basicInfo: {
    brand: {
      name: string;
      _id: string;
      logo: string;
    }; // ObjectId as string
    brandName: string;
    model: {
      name: string;
      _id: string;
      logo: string;
    }; // ObjectId as string
    modelName: string;
    year: number;
    price: number;
    mileage: number;
    description: string;
    type:
      | "kupe"
      | "kabriolet"
      | "hatchback"
      | "kombi"
      | "ostalo"
      | "monovolumen"
      | "suv"
      | "limuzina"
      | "karavan";
  };
  mechanics: {
    fuelType: string;
    transmission: string;
    engine?: {
      capacityCC?: number;
      power?: {
        hp?: number;
        kw?: number;
      };
      cylinders?: number;
      turbo?: boolean;
    };
    drivetrain?: string;
    emissions?: {
      co2?: number;
      euroStandard?: string;
    };
  };
  appearance: {
    color: string;
    bodyType?: string;
    doors: number;
    seats: number;
    wheels?: {
      sizeInches?: number;
      wheelType?: string;
    };
  };
  features?: {
    airConditioning?: boolean;
    navigationSystem?: boolean;
    heatedSeats?: boolean;
    bluetooth?: boolean;
    parkingSensors?: boolean;
    cruiseControl?: boolean;
    sunroof?: boolean;
    airbags?: number;
    abs?: boolean;
    tractionControl?: boolean;
  };
  ownership?: {
    numberOfOwners?: number;
    registrationDate?: string; // Dates are serialized as strings
    inspectionValidUntil?: string;
    warranty?: boolean;
  };
  location: {
    city: string;
    region?: string;
  };
  images: string[];
  store?: string; // ObjectId as string
  user: string; // ObjectId as string
  createdAt: string;
}

export interface CarsResponse {
  data: Car[];
  totalCount: number;
  currentPage: number;
  hasMore: boolean;
}
