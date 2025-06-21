import React from "react";

type SingleInfoBoxProps = {
  icon?: React.ReactNode;
  labelText: string;
  value: string;
  iconType?: string;
  iconSrc?: string;
};

const SingleInfoBox = ({
  icon,
  iconSrc,
  labelText,
  value,
  iconType,
}: SingleInfoBoxProps) => {
  return (
    <div className="flex  items-center gap-x-6 px-6 py-4 rounded-md shadow-sm  bg-white">
      {iconType === "image" ? (
        <img src={iconSrc} className="w-6 h-6 object-cover" />
      ) : (
        icon
      )}
      <div>
        <p className=" uppercase text-sm text-gray-500">{labelText}</p>
        <p className=" text-sm text-gray-800  font-medium">{value}</p>
      </div>
    </div>
  );
};

export default SingleInfoBox;
