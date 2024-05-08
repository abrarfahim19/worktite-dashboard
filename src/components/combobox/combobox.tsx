"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup } from "../ui/command";

interface IFramework {
  value: string;
  label: string;
}

interface IComboboxProps {
  combobox: IFramework[];
  value: string;
  setValue: (value: string) => void;
}

export const Combobox = ({ combobox, value, setValue }: IComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between"
        >
          {value
            ? combobox.find((item) => item.value === value)?.label
            : "Select item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {combobox.map((item) => (
              <Button
                key={item.value}
                variant={"link"}
                className={`w-full justify-start text-left ${item.value === value ? "font-bold text-brand" : "font-normal text-black"}`}
                onClick={() => {
                  setValue(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
              </Button>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
