import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

type IconButtonProps = {
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  tooltipText: string;
  children: React.ReactNode;
};

const IconButton = ({
  children,
  size,
  className,
  tooltipText,
}: IconButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full" asChild>
          <Button size={size} className={className}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className=" bg-gray-400 text-white">
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default IconButton;
