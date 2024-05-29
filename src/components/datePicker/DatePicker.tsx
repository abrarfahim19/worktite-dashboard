import { apiRoutes, ITimeSlot } from "@/config/common";
import useDataFetch from "@/hooks/useDataFetch";
import { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface IDatePickerProps {
  selected: Date | undefined;
  setSelected: Dispatch<SetStateAction<Date | undefined>>;
  setScheduleSelected: (id: number) => void;
  scheduleSelected: number;
}
export const DatePicker: React.FC<IDatePickerProps> = ({
  selected,
  setSelected,
  setScheduleSelected,
  scheduleSelected,
}) => {
  const {
    data: availableTimeSlots,
    isLoading,
    error,
  } = useDataFetch<ITimeSlot[]>(
    apiRoutes.PUBLIC.APPOINTMENT.SLOTS({ date: selected }),
  );
  const scheduleSelectionHandler = (id: number) => {
    if (scheduleSelected === id) {
      setScheduleSelected(0);
      return;
    }
    setScheduleSelected(id);
    console.log("Selected ID: ", id);
  };

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
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full bg-gray-500" />
            ))
          : availableTimeSlots?.map((item, index) => {
              return (
                <Button
                  className="w-full"
                  disabled={item.disabled}
                  variant={
                    item.disabled
                      ? "secondary"
                      : scheduleSelected === item.id
                        ? "default"
                        : "secondary"
                  }
                  key={item.id}
                  onClick={() => scheduleSelectionHandler(item.id)}
                >
                  {item.start_at} - {item.end_at}
                </Button>
              );
            })}
      </div>
    </div>
  );
};
