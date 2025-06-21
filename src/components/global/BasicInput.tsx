import type React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type BasicInputProps = {
  type: string;
  name: string;
  labelText?: string;
  className?: string;
  insideText?: string | React.ReactNode;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  labelClassName?: string;
  insideClassName?: string;
  errorMsgClass?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  onBlur?: () => void;
};

const BasicInput = ({
  name,
  labelText,
  className,
  insideText = "",
  labelClassName,
  insideClassName,
  errorMsgClass,
  errorMessage,
  isInvalid,
  ...props
}: BasicInputProps) => {
  return (
    <div>
      {labelText && (
        <Label
          htmlFor={name}
          className={cn(" text-sm uppercase", labelClassName)}
        >
          {labelText}
        </Label>
      )}
      {insideText ? (
        <div
          className={cn(
            " border-[1px] border-gray-300 flex items-center roundes-sm",
            insideClassName
          )}
        >
          <Input name={name} className={cn("", className)} {...props} />
          <p className=" text-gray-600">{insideText}</p>
        </div>
      ) : (
        <Input name={name} className={cn("", className)} {...props} />
      )}
      {isInvalid && (
        <p
          className={cn(
            " text-red-500 text-[0.70rem] uppercase -mt-4 ",
            errorMsgClass
          )}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default BasicInput;
