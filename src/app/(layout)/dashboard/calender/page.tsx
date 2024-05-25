"use client";

import { CalendarFull } from "@/components/CalenderFull";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {convertTo12Hour, getCurrentMonth, getCurrentYear} from "@/config/common";
import Link from "next/link";
import React, { useState } from "react";


interface Slot {
  id: number;
  created_at: string;
  updated_at: string;
  start_at: string;
  end_at: string;
  created_by: number;
}

interface IEvent {
  id: string;
  title: string;
  date: string;
  event_type: string;
  slot: Slot;
}

const months = [
  {
    value: "1",
    label: "January",
  },
  {
    value: "2",
    label: "February",
  },
  {
    value: "3",
    label: "March",
  },
  {
    value: "4",
    label: "April",
  },
  {
    value: "5",
    label: "May",
  },
  {
    value: "6",
    label: "June",
  },
  {
    value: "7",
    label: "July",
  },
  {
    value: "8",
    label: "August",
  },
  {
    value: "9",
    label: "September",
  },
  {
    value: "10",
    label: "October",
  },
  {
    value: "11",
    label: "November",
  },
  {
    value: "12",
    label: "December",
  },
];

type YearDataType = string;

type MonthDataType =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

const Page = () => {
  const [month, setMonth] = React.useState<MonthDataType>(
      getCurrentMonth().toString() as MonthDataType,
  );
  const [year, setYear] = React.useState<YearDataType>(
      getCurrentYear().toString() as YearDataType,
  );
  const [dayEvents, setDayEvents] = useState<IEvent[]>([])
  console.log("day", dayEvents)
  const setMonthFromString = (value: string) => {
    setMonth(value as MonthDataType);
  };

  const yearRange = process.env.CALENDER_YEAR_RANGE
    ? parseInt(process.env.CALENDER_YEAR_RANGE)
    : 5;

  const years = Array.from(
    { length: yearRange * 2 + 1 },
    (_, i) => i - yearRange + getCurrentYear(),
  ).map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));


  const setYearFromString = (value: string) => {
    setYear(value as YearDataType);
  };
  const dateToBePassed = new Date(parseInt(year), parseInt(month) - 1, 1);
  return (
    <div className="p-4">
      <CalenderHeader />
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <CalendarFull date={dateToBePassed} setDayEvents={setDayEvents} />
        </div>
        <div className="col-span-2">
          <div className="flex gap-2">
            <div>
              <Combobox
                combobox={months}
                value={month}
                setValue={setMonthFromString}
              />
            </div>
            <div>
              <Combobox
                combobox={years}
                value={year}
                setValue={setYearFromString}
              />
            </div>
          </div>
          <div className="mt-6">
            {
              dayEvents?.map((e)=><EventCard key={e?.id} data={e}/>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

const CalenderHeader = () => {
  return (
    <div className="relative">
      <Button variant={"link"} className="ml-0 w-20 pl-0 font-bold text-black">
        Calender
      </Button>
      <div className="absolute left-[2px] top-[35px] h-[2px] w-8 bg-brand"></div>
    </div>
  );
};



const EventCard = ({data}:{data: IEvent}) => {
  const urlSlug = (data.id.split('-')[0])
  return (
    <Link href={`calender/${data?.event_type}/${urlSlug}`}>
      <div className="my-2 flex w-full gap-2 rounded-md bg-white p-2">
        <div className="flex flex-col justify-center gap-2">
          <p className="text-sm font-thin text-gray-700">{convertTo12Hour(data?.slot?.start_at)}</p>
          <p className="text-sm font-thin text-gray-700">{convertTo12Hour(data?.slot?.end_at)}</p>
        </div>
        <div className="border-[1px] border-brand"></div>
        <div>
          <p className="font-bold">{data?.event_type?.toUpperCase()} with {data?.title}</p>
          <p>{data?.event_type === 'appointment' ? "New Client" : "Existing Client"}</p>
          <p>Now</p>
        </div>
      </div>
    </Link>
  );
};
