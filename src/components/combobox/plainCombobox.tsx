"use client";

import { ChevronsDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Command, CommandGroup } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ICombobox {
  value: string;
  label: string;
}
export const PlainCombobox = ({ combobox }: { combobox: ICombobox[] }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(combobox[0].value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between border-0 bg-transparent text-2xl"
        >
          {value
            ? combobox.find((item) => item.value === value)?.label
            : "Select item..."}
          <ChevronsDown className="h-4 w-4 shrink-0 text-black opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          {/* <CommandEmpty>No framework found.</CommandEmpty> */}
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
