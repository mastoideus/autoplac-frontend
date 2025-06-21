import React from "react";

const CarTypeBox = ({
  name,
  image,
  onClick,
  isSelected,
}: {
  name: string;
  image: string;
  onClick: (name: string) => void;
  isSelected: boolean;
}) => {
  return (
    <div
      className={`  px-8 py-2 bg-white shadow-md rounded-md box-border flex flex-col items-center ${
        isSelected && "border-2 border-blue-900"
      }`}
      onClick={() => onClick(name)}
    >
      <img src={image} className=" w-20 h-20 object-contain " />
      <p className=" -mt-4 text-sm capitalize">{name}</p>
    </div>
  );
};

export default CarTypeBox;
