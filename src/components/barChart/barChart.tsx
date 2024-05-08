"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Combobox } from "../combobox";

const types = [
  {
    value: "project",
    label: "Project",
  },
  {
    value: "timespent",
    label: "Time Spent",
  },
  {
    value: "clients",
    label: "Clients",
  },
  {
    value: "revenue",
    label: "Revenue",
  },
];

const days = [
  {
    value: "7d",
    label: "Last 7 days",
  },
  //   {
  //     value: "14d",
  //     label: "Last 14 days",
  //   },
  //   {
  //     value: "30d",
  //     label: "Last 30 days",
  //   },
  //   {
  //     value: "2m",
  //     label: "Last 2 months",
  //   },
  //   {
  //     value: "3m",
  //     label: "Last 3 months",
  //   },
  //   {
  //     value: "6m",
  //     label: "Last 6 months",
  //   },
  //   {
  //     value: "30",
  //     label: "Last 30 days",
  //   },
];
const barChartData = {
  project: {
    "7d": [
      {
        name: "Sat",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Sun",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Mon",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Tue",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Wed",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Thr",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Fri",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ],
  },
  timespent: {
    "7d": [
      {
        name: "Sat",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Sun",
        uv: 8000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Mon",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Tue",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Wed",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Thr",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Fri",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: "Add",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ],
  },
  clients: {
    "7d": [
      {
        name: "Sat",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Sun",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Mon",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Tue",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Wed",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Thr",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Fri",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ],
  },
  revenue: {
    "7d": [
      {
        name: "Sat",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "Sun",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "Mon",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "Tue",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "Wed",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "Thr",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "Fri",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ],
  },
};

const fields1 = [
  {
    value: "pv",
    label: "PV",
  },
  {
    value: "uv",
    label: "UV",
  },
  {
    value: "amt",
    label: "AMT",
  },
];

type BarChartDataType = "project" | "timespent" | "clients" | "revenue";
type DayType = "7d";
type FieldType = "uv" | "pv" | "amt";

export const BarChartWithData = () => {
  const [type, setType] = React.useState<BarChartDataType>(
    types[0].value as BarChartDataType,
  );
  const [day, setDays] = React.useState<DayType>(days[0].value as DayType);
  const [field1, setFields] = React.useState<FieldType>(
    fields1[0].value as FieldType,
  );
  const setTypeFromString = (value: string) => {
    setType(value as BarChartDataType);
  };
  const setDayFromString = (value: string) => {
    setDays(value as DayType);
  };
  const setField1FromString = (value: string) => {
    setFields(value as FieldType);
  };
  return (
    <div className="h-64">
      <div className="my-2 mr-2 flex justify-end gap-4">
        <Combobox combobox={types} value={type} setValue={setTypeFromString} />
        <Combobox combobox={days} value={day} setValue={setDayFromString} />
        <Combobox
          combobox={fields1}
          value={field1}
          setValue={setField1FromString}
        />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={barChartData[type][day]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {field1 === "uv" && (
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          )}
          {field1 === "pv" && (
            <Bar
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          )}
          {field1 === "amt" && (
            <Bar
              dataKey="amt"
              fill="#E55E2C"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
      {/* <div className="mx-14 my-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="new" />
          <label
            htmlFor="new"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            New Projects
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="running" />
          <label
            htmlFor="running"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Running projects
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="finished" />
          <label
            htmlFor="finished"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Finished projects
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cancelled" />
          <label
            htmlFor="cancelled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Cancelled projects
          </label>
        </div>
      </div> */}
    </div>
  );
};
