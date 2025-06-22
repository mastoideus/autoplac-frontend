import Select from "react-select";
import type { ActionMeta, MultiValue } from "react-select";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type OptionType = { label: string; value: string };

type MultiSelectProps = {
  options: OptionType[];
  labelText: string;
  name: string;
  onChange?: (name: string, selected: OptionType[]) => void;
  value?: OptionType[];
  className?: string;
  labelClassName?: string;
  defaultValue?: any;
};

const MultiSelect = ({
  options,
  labelText,
  name,
  onChange,
  value,
  className,
  labelClassName,
  defaultValue,
}: MultiSelectProps) => {
  return (
    <div>
      <Label className={cn("uppercase", labelClassName)}>{labelText}</Label>
      <Select
        menuPortalTarget={document.body}
        menuPosition="fixed"
        isMulti
        value={value}
        defaultValue={defaultValue}
        name={name}
        options={options}
        placeholder="Odaberite"
        className={cn("basic-multi-select", className)}
        onChange={(
          selected: MultiValue<OptionType>,
          _actionMeta: ActionMeta<OptionType>
        ) => onChange?.(name, [...selected])}
        styles={{
          placeholder: (base) => ({
            ...base,
            fontSize: "0.875rem",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999, // important for mobile
          }),
        }}
      />
    </div>
  );
};

export default MultiSelect;
