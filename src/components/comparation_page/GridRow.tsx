import React from "react";
import { cn } from "@/lib/utils";

const GridRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(" p-3 flex items-center  text-sm lg:text-base", className)}
    >
      {children}
    </div>
  );
};

export default GridRow;
