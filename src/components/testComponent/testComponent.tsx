"use client";

import { useState } from "react";
import { BarChartWithData } from "../barChart";
const toggleItems = [
  {
    id: 1,
    title: "New Project",
  },
  {
    id: 2,
    title: "Running Project",
  },
  {
    id: 3,
    title: "Finished Project",
  },
  {
    id: 4,
    title: "Cancelled Project",
  },
];

export const TestComponent = () => {
  const initialCheckedState = toggleItems.reduce(
    (acc, item) => {
      acc[item.title] = false;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  const [checkedItems, setCheckedItems] = useState(initialCheckedState);

  console.log("Checked Item, ", checkedItems);

  const handleCheckboxChange = (id: string) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id],
    });
  };
  return (
    <div className="m-12 w-1/3">
      {/* <div className="flex gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="A"
            // checked={}
            // onCheckedChange={}
          />
          <Label htmlFor="A">Item A</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="B"
            // checked={}
            // onCheckedChange={}
          />
          <Label htmlFor="B">Item B</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="C"
            // checked={}
            // onCheckedChange={}
          />
          <Label htmlFor="C">Item C</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="D"
            // checked={}
            // onCheckedChange={}
          />
          <Label htmlFor="D">Item D</Label>
        </div>
      </div> */}
      <BarChartWithData />
    </div>
  );
};
