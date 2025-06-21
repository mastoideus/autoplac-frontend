import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

type IconButtonProps = {
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
  tooltipText: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const IconButton = ({
  children,
  size,
  className,
  tooltipText,
  variant,
  onClick,
}: IconButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full" asChild>
          <Button
            size={size}
            variant={variant}
            className={className}
            onClick={onClick}
          >
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
