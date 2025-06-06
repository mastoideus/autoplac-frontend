import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
  } else if (days < 25 && days > 0) {
    timePassedText = `prije ${days} dana`;
  } else if (days === 0 && hours > 0) {
    timePassedText = `prije ${hours} sati`;
  } else {
    timePassedText = `prije ${minutes} min`;
  }

  return timePassedText;
}
