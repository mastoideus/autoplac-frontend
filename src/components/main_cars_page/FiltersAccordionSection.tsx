import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FiltersAccordionSection = ({
  children,
  value,
  title,
}: {
  children: React.ReactNode;
  value: string;
  title: string;
}) => {
  return (
    <AccordionItem value={value} className=" overflow-visible">
      <AccordionTrigger className=" text-base font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance transition-all duration-300 data-[state=closed]:opacity-0 data-[state=closed]:h-0 data-[state=closed]:overflow-hidden data-[state=open]:opacity-100 data-[state=open]:h-auto">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FiltersAccordionSection;
