"use client";

import { CalendarFull } from "@/components/CalenderFull";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { getCurrentMonth, getCurrentYear } from "@/config/common";
import Link from "next/link";
import React, { useState } from "react";

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
  const [dataToFetchForDate, setDataToFetchForDate] = useState<Date>(
    new Date(),
  );
  const currentMonth = getCurrentMonth();
  const [month, setMonth] = React.useState<MonthDataType>(
    currentMonth.toString() as MonthDataType,
  );
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

  const currentYear = getCurrentYear();
  const [year, setYear] = React.useState<YearDataType>(
    currentYear.toString() as YearDataType,
  );
  const setYearFromString = (value: string) => {
    setYear(value as YearDataType);
  };
  const dateToBePassed = new Date(parseInt(year), parseInt(month) - 1, 1);
  console.log(dateToBePassed, "The Date to be passed", month, year);
  return (
    <div className="p-4">
      <CalenderHeader />
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <CalendarFull date={dateToBePassed} />
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
            <MeetingCard />
            <AppointmentCard />
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

const MeetingCard = () => {
  return (
    <Link href={"calender/meeting/1234"}>
      <div className="my-2 flex w-full gap-2 rounded-md bg-white p-2">
        <div className="flex flex-col justify-center gap-2">
          <p className="text-sm font-thin text-gray-700">7:00 Pm</p>
          <p className="text-sm font-thin text-gray-700">7:00 Pm</p>
        </div>
        <div className="border-[1px] border-brand"></div>
        <div>
          <p className="font-bold">Meeting with Mark John</p>
          <p>New Client</p>
          <p>Now</p>
        </div>
      </div>
    </Link>
  );
};

const AppointmentCard = () => {
  return (
    <Link href={"calender/appointment/1234"}>
      <div className="flex w-full gap-2 rounded-md bg-white p-2">
        <div className="flex flex-col justify-center gap-2">
          <p className="text-sm font-thin text-gray-700">7:00 Pm</p>
          <p className="text-sm font-thin text-gray-700">7:00 Pm</p>
        </div>
        <div className="border-[1px] border-brand"></div>
        <div>
          <p className="font-bold">Appointement with Mark John</p>
          <p>Existing Client</p>
          <p>After 2 hour</p>
        </div>
      </div>
    </Link>
  );
};
