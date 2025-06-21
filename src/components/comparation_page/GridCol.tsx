import React from "react";

const GridCol = ({
  children,
  carsLength,
}: {
  children: React.ReactNode;
  carsLength?: number;
}) => {
  return (
    <div
      className={` ${
        carsLength && carsLength > 2 && "last:hidden"
      } lg:last:block  `}
    >
      {children}
    </div>
  );
};

export default GridCol;
