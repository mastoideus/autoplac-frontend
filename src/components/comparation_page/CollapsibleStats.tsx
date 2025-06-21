import React, { useRef, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { cn } from "@/lib/utils";

const CollapsibleStats = ({
  children,
  title,
  className,
  headerClassName,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  headerClassName?: string;
}) => {
  const [showStats, setShowStats] = useState(true);
  const [height, setHeight] = useState("auto");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const el = contentRef.current;
    if (!el) return;

    if (showStats) {
      const currentHeight = el.scrollHeight + "px";
      setHeight(currentHeight);
      setIsTransitioning(true);

      requestAnimationFrame(() => {
        setHeight("0px");
      });
    } else {
      setHeight("0px");
      setIsTransitioning(true);

      requestAnimationFrame(() => {
        const scrollHeight = contentRef.current?.scrollHeight + "px";
        if (scrollHeight) setHeight(scrollHeight);
      });
    }

    setShowStats(!showStats);
  };

  const handleTransitionEnd = () => {
    if (showStats) {
      setHeight("auto");
    }
    setIsTransitioning(false);
  };

  return (
    <div
      className={` ${
        showStats ? "mb-6" : "mb-0 border-t-[1px] border-gray-300 "
      }`}
    >
      <header
        className={cn(
          "flex items-center justify-between pt-2",
          headerClassName
        )}
      >
        <h3 className="font-semibold text-lg capitalize">{title}</h3>
        <IoIosArrowDropdownCircle
          onClick={handleToggle}
          color="lightgray"
          className={`cursor-pointer w-7 h-7 transition-transform duration-300 ${
            showStats ? "rotate-180" : ""
          }`}
        />
      </header>

      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: isTransitioning ? "height 0.3s ease" : undefined,
        }}
        onTransitionEnd={handleTransitionEnd}
        className={cn(" mt-4 grid", className)}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleStats;
