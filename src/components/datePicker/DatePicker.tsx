import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../ui/button";

const dates = [
  { id: "afdafe", time: "8:00 - 9:00 PM", disabled: true },
  { id: "afdafg", time: "9:00 - 10:00 PM", disabled: false },
  { id: "afd3fe", time: "10:00 - 11:00 PM", disabled: false },
  { id: "ard3fe", time: "11:00 - 12:00 PM", disabled: false },
  { id: "afdafr", time: "9:00 - 10:00 PM", disabled: false },
  { id: "afdrfe", time: "10:00 - 11:00 PM", disabled: false },
];

interface IAvailableDate {
  id: string;
  time: string;
  disabled: boolean;
}
export const DatePicker = () => {
  const [selected, setSelected] = useState<Date>();
  const [availableTime, setAvailableTime] = useState<IAvailableDate[]>(dates);
  const [scheduleSelected, setScheduleSelected] = useState<number>();

  const scheduleSelectionHandler = (index: number) => {
    if (scheduleSelected === index) {
      console.log("This is in list");
      // setScheduleSelected((prev) => prev.filter((item) => item !== index));
      setScheduleSelected(-1);
    } else {
      console.log("Not in list");
      // setScheduleSelected((prev) => prev.concat(index));
      setScheduleSelected(index);
    }
  };

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <div className="bg-white pb-10">
      <DayPicker
        modifiersClassNames={{
          selected: "my-selected",
          outside: "my-today",
        }}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        disabled={{ before: new Date() }}
      />
      <p className="my-4 font-semibold">Available Slot</p>
      <div className="grid grid-cols-3 gap-x-6 gap-y-4">
        {availableTime.map((item, index) => {
          return (
            <Button
              className="w-full"
              disabled={item.disabled}
              variant={
                item.disabled
                  ? "secondary"
                  : scheduleSelected === index
                    ? "default"
                    : "secondary"
              }
              // variant={"secondary"}
              key={item.id}
              onClick={() => scheduleSelectionHandler(index)}
            >
              {item.time}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
