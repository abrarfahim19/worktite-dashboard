import { Control, FieldValue, UseControllerProps } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";

interface Option {
  label: string;
  value?: string | number;
  options?: Option[];

  [key: string]: any;
}

interface Props extends UseControllerProps {
  options?: OptionsOrGroups<Option, GroupBase<Option>> | undefined;
  isMulti?: boolean;
  label: string;
  control: Control<FieldValue<any>>;
  isSearchable?: boolean;
  menuClassName?: string;
  optionClassName?: string;
  controlClassName?: string;
  inputClassName?: string;
}

export const SelectField: React.FC<Props> = (props) => {
  const { options, isMulti, name, label, control, isSearchable } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="m-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactSelect
              {...field}
              name={name}
              isMulti={isMulti}
              unstyled={true}
              isSearchable={isSearchable}
              hideSelectedOptions={true}
              classNames={{
                control: (e) =>
                  cn(
                    `rounded-md border border-2 `,
                    ` border-black  px-3 py-1 text-sm`,
                    e.isFocused ? "ring ring-ring ring-offset-2 ring-2" : "",
                    props?.controlClassName,
                  ),
                indicatorSeparator: () => "bg-gray-100 mx-2",
                dropdownIndicator: () => "text-gray-400",
                menu: () =>
                  cn(
                    "absolute top-0 mt-1 text-sm z-10 w-full",
                    "rounded-md border bg-popover shadow-md overflow-x-hidden",
                    props?.menuClassName,
                  ),
                option: () =>
                  cn(
                    "cursor-default",
                    "rounded-sm py-1.5 m-1 px-2 text-sm outline-none",
                    "focus:bg-gray-200 hover:bg-gray-200 w-auto",
                    props?.optionClassName,
                  ),
                noOptionsMessage: () => "p-5",
                multiValue: () => "bg-gray-200 px-2 p-1 rounded mr-2",
                input: () =>
                  cn("text-sm overflow-x-hidden", props?.controlClassName),
              }}
              options={options}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
