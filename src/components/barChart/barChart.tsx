"use client";

import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Combobox } from "../combobox";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

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
  {
    value: "30d",
    label: "Last 30 days",
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
// const barChartData = {
//   project: {
//     "7d": [
//       {
//         name: "Sat",
//         new: 4000,
//         running: 2400,
//         finished: 2400,
//       },
//       {
//         name: "Sun",
//         new: 3000,
//         running: 1398,
//         finished: 2210,
//       },
//       {
//         name: "Mon",
//         new: 2000,
//         running: 9800,
//         finished: 2290,
//       },
//       {
//         name: "Tue",
//         new: 2780,
//         running: 3908,
//         finished: 2000,
//       },
//       {
//         name: "Wed",
//         new: 1890,
//         running: 4800,
//         finished: 2181,
//       },
//       {
//         name: "Thr",
//         new: 2390,
//         running: 3800,
//         finished: 2500,
//       },
//       {
//         name: "Fri",
//         new: 3490,
//         running: 4300,
//         finished: 2100,
//       },
//     ],
//   },
//   timespent: {
//     "7d": [
//       {
//         name: "Sat",
//         new: 4000,
//         running: 2400,
//         finished: 2400,
//       },
//       {
//         name: "Sun",
//         new: 8000,
//         running: 1398,
//         finished: 2210,
//       },
//       {
//         name: "Mon",
//         new: 2000,
//         running: 9800,
//         finished: 2290,
//       },
//       {
//         name: "Tue",
//         new: 2780,
//         running: 3908,
//         finished: 2000,
//       },
//       {
//         name: "Wed",
//         new: 1890,
//         running: 4800,
//         finished: 2181,
//       },
//       {
//         name: "Thr",
//         new: 2390,
//         running: 3800,
//         finished: 2500,
//       },
//       {
//         name: "Fri",
//         new: 3490,
//         running: 4300,
//         finished: 2100,
//       },
//     ],
//   },
//   clients: {
//     "7d": [
//       {
//         name: "Sat",
//         new: 4000,
//         running: 2400,
//         finished: 2400,
//       },
//       {
//         name: "Sun",
//         new: 3000,
//         running: 1398,
//         finished: 2210,
//       },
//       {
//         name: "Mon",
//         new: 2000,
//         running: 9800,
//         finished: 2290,
//       },
//       {
//         name: "Tue",
//         new: 2780,
//         running: 3908,
//         finished: 2000,
//       },
//       {
//         name: "Wed",
//         new: 1890,
//         running: 4800,
//         finished: 2181,
//       },
//       {
//         name: "Thr",
//         new: 2390,
//         running: 3800,
//         finished: 2500,
//       },
//       {
//         name: "Fri",
//         new: 3490,
//         running: 4300,
//         finished: 2100,
//       },
//     ],
//   },
//   revenue: {
//     "7d": [
//       {
//         name: "Sat",
//         new: 4000,
//         running: 2400,
//         finished: 2400,
//       },
//       {
//         name: "Sun",
//         new: 3000,
//         running: 1398,
//         finished: 2210,
//       },
//       {
//         name: "Mon",
//         new: 2000,
//         running: 9800,
//         finished: 2290,
//       },
//       {
//         name: "Tue",
//         new: 2780,
//         running: 3908,
//         finished: 2000,
//       },
//       {
//         name: "Wed",
//         new: 1890,
//         running: 4800,
//         finished: 2181,
//       },
//       {
//         name: "Thr",
//         new: 2390,
//         running: 3800,
//         finished: 2500,
//       },
//       {
//         name: "Fri",
//         new: 3490,
//         running: 4300,
//         finished: 2100,
//       },
//     ],
//   },
// };

const barChartData = {
  project: {
    "7d": [
      {
        name: "Sat",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Sun",
        new: 3000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Mon",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Tue",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Wed",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Thr",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Fri",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
    ],
    "30d": [
      {
        name: "Day 1",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 2",
        new: 3000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Day 3",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Day 4",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Day 5",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Day 6",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Day 7",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
      {
        name: "Day 8",
        new: 4100,
        running: 3500,
        finished: 3100,
        cancelled: 600,
      },
      {
        name: "Day 9",
        new: 3200,
        running: 2400,
        finished: 2200,
        cancelled: 350,
      },
      {
        name: "Day 10",
        new: 2500,
        running: 2700,
        finished: 2300,
        cancelled: 450,
      },
      {
        name: "Day 11",
        new: 2700,
        running: 3200,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 12",
        new: 2300,
        running: 3100,
        finished: 2600,
        cancelled: 400,
      },
      {
        name: "Day 13",
        new: 2800,
        running: 3300,
        finished: 2700,
        cancelled: 450,
      },
      {
        name: "Day 14",
        new: 2900,
        running: 3400,
        finished: 2800,
        cancelled: 500,
      },
      {
        name: "Day 15",
        new: 3500,
        running: 2900,
        finished: 2900,
        cancelled: 550,
      },
      {
        name: "Day 16",
        new: 3800,
        running: 3000,
        finished: 3000,
        cancelled: 600,
      },
      {
        name: "Day 17",
        new: 3900,
        running: 3100,
        finished: 3100,
        cancelled: 350,
      },
      {
        name: "Day 18",
        new: 3700,
        running: 3200,
        finished: 3200,
        cancelled: 450,
      },
      {
        name: "Day 19",
        new: 3600,
        running: 3300,
        finished: 3300,
        cancelled: 500,
      },
      {
        name: "Day 20",
        new: 3400,
        running: 3400,
        finished: 3400,
        cancelled: 400,
      },
      {
        name: "Day 21",
        new: 3300,
        running: 3500,
        finished: 3500,
        cancelled: 450,
      },
      {
        name: "Day 22",
        new: 3200,
        running: 3600,
        finished: 3600,
        cancelled: 500,
      },
      {
        name: "Day 23",
        new: 3100,
        running: 3700,
        finished: 3700,
        cancelled: 550,
      },
      {
        name: "Day 24",
        new: 3000,
        running: 3800,
        finished: 3800,
        cancelled: 600,
      },
      {
        name: "Day 25",
        new: 2900,
        running: 3900,
        finished: 3900,
        cancelled: 350,
      },
      {
        name: "Day 26",
        new: 2800,
        running: 4000,
        finished: 4000,
        cancelled: 450,
      },
      {
        name: "Day 27",
        new: 2700,
        running: 4100,
        finished: 4100,
        cancelled: 500,
      },
      {
        name: "Day 28",
        new: 2600,
        running: 4200,
        finished: 4200,
        cancelled: 400,
      },
      {
        name: "Day 29",
        new: 2500,
        running: 4300,
        finished: 4300,
        cancelled: 450,
      },
      {
        name: "Day 30",
        new: 2400,
        running: 4400,
        finished: 4400,
        cancelled: 500,
      },
    ],
  },
  timespent: {
    "7d": [
      {
        name: "Sat",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Sun",
        new: 8000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Mon",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Tue",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Wed",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Thr",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Fri",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
    ],
    "30d": [
      {
        name: "Day 1",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 2",
        new: 8000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Day 3",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Day 4",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Day 5",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Day 6",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Day 7",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
      {
        name: "Day 8",
        new: 4100,
        running: 3500,
        finished: 3100,
        cancelled: 600,
      },
      {
        name: "Day 9",
        new: 3200,
        running: 2400,
        finished: 2200,
        cancelled: 350,
      },
      {
        name: "Day 10",
        new: 2500,
        running: 2700,
        finished: 2300,
        cancelled: 450,
      },
      {
        name: "Day 11",
        new: 2700,
        running: 3200,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 12",
        new: 2300,
        running: 3100,
        finished: 2600,
        cancelled: 400,
      },
      {
        name: "Day 13",
        new: 2800,
        running: 3300,
        finished: 2700,
        cancelled: 450,
      },
      {
        name: "Day 14",
        new: 2900,
        running: 3400,
        finished: 2800,
        cancelled: 500,
      },
      {
        name: "Day 15",
        new: 3500,
        running: 2900,
        finished: 2900,
        cancelled: 550,
      },
      {
        name: "Day 16",
        new: 3800,
        running: 3000,
        finished: 3000,
        cancelled: 600,
      },
      {
        name: "Day 17",
        new: 3900,
        running: 3100,
        finished: 3100,
        cancelled: 350,
      },
      {
        name: "Day 18",
        new: 3700,
        running: 3200,
        finished: 3200,
        cancelled: 450,
      },
      {
        name: "Day 19",
        new: 3600,
        running: 3300,
        finished: 3300,
        cancelled: 500,
      },
      {
        name: "Day 20",
        new: 3400,
        running: 3400,
        finished: 3400,
        cancelled: 400,
      },
      {
        name: "Day 21",
        new: 3300,
        running: 3500,
        finished: 3500,
        cancelled: 450,
      },
      {
        name: "Day 22",
        new: 3200,
        running: 3600,
        finished: 3600,
        cancelled: 500,
      },
      {
        name: "Day 23",
        new: 3100,
        running: 3700,
        finished: 3700,
        cancelled: 550,
      },
      {
        name: "Day 24",
        new: 3000,
        running: 3800,
        finished: 3800,
        cancelled: 600,
      },
      {
        name: "Day 25",
        new: 2900,
        running: 3900,
        finished: 3900,
        cancelled: 350,
      },
      {
        name: "Day 26",
        new: 2800,
        running: 4000,
        finished: 4000,
        cancelled: 450,
      },
      {
        name: "Day 27",
        new: 2700,
        running: 4100,
        finished: 4100,
        cancelled: 500,
      },
      {
        name: "Day 28",
        new: 2600,
        running: 4200,
        finished: 4200,
        cancelled: 400,
      },
      {
        name: "Day 29",
        new: 2500,
        running: 4300,
        finished: 4300,
        cancelled: 450,
      },
      {
        name: "Day 30",
        new: 2400,
        running: 4400,
        finished: 4400,
        cancelled: 500,
      },
    ],
  },
  clients: {
    "7d": [
      {
        name: "Sat",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Sun",
        new: 3000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Mon",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Tue",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Wed",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Thr",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Fri",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
    ],
    "30d": [
      {
        name: "Day 1",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 2",
        new: 3000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Day 3",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Day 4",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Day 5",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Day 6",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Day 7",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
      {
        name: "Day 8",
        new: 4100,
        running: 3500,
        finished: 3100,
        cancelled: 600,
      },
      {
        name: "Day 9",
        new: 3200,
        running: 2400,
        finished: 2200,
        cancelled: 350,
      },
      {
        name: "Day 10",
        new: 2500,
        running: 2700,
        finished: 2300,
        cancelled: 450,
      },
      {
        name: "Day 11",
        new: 2700,
        running: 3200,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 12",
        new: 2300,
        running: 3100,
        finished: 2600,
        cancelled: 400,
      },
      {
        name: "Day 13",
        new: 2800,
        running: 3300,
        finished: 2700,
        cancelled: 450,
      },
      {
        name: "Day 14",
        new: 2900,
        running: 3400,
        finished: 2800,
        cancelled: 500,
      },
      {
        name: "Day 15",
        new: 3500,
        running: 2900,
        finished: 2900,
        cancelled: 550,
      },
      {
        name: "Day 16",
        new: 3800,
        running: 3000,
        finished: 3000,
        cancelled: 600,
      },
      {
        name: "Day 17",
        new: 3900,
        running: 3100,
        finished: 3100,
        cancelled: 350,
      },
      {
        name: "Day 18",
        new: 3700,
        running: 3200,
        finished: 3200,
        cancelled: 450,
      },
      {
        name: "Day 19",
        new: 3600,
        running: 3300,
        finished: 3300,
        cancelled: 500,
      },
      {
        name: "Day 20",
        new: 3400,
        running: 3400,
        finished: 3400,
        cancelled: 400,
      },
      {
        name: "Day 21",
        new: 3300,
        running: 3500,
        finished: 3500,
        cancelled: 450,
      },
      {
        name: "Day 22",
        new: 3200,
        running: 3600,
        finished: 3600,
        cancelled: 500,
      },
      {
        name: "Day 23",
        new: 3100,
        running: 3700,
        finished: 3700,
        cancelled: 550,
      },
      {
        name: "Day 24",
        new: 3000,
        running: 3800,
        finished: 3800,
        cancelled: 600,
      },
      {
        name: "Day 25",
        new: 2900,
        running: 3900,
        finished: 3900,
        cancelled: 350,
      },
      {
        name: "Day 26",
        new: 2800,
        running: 4000,
        finished: 4000,
        cancelled: 450,
      },
      {
        name: "Day 27",
        new: 2700,
        running: 4100,
        finished: 4100,
        cancelled: 500,
      },
      {
        name: "Day 28",
        new: 2600,
        running: 4200,
        finished: 4200,
        cancelled: 400,
      },
      {
        name: "Day 29",
        new: 2500,
        running: 4300,
        finished: 4300,
        cancelled: 450,
      },
      {
        name: "Day 30",
        new: 2400,
        running: 4400,
        finished: 4400,
        cancelled: 500,
      },
    ],
  },
  revenue: {
    "7d": [
      {
        name: "Sat",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Sun",
        new: 3000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Mon",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Tue",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Wed",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Thr",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Fri",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
    ],
    "30d": [
      {
        name: "Day 1",
        new: 4000,
        running: 2400,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 2",
        new: 3000,
        running: 1398,
        finished: 2210,
        cancelled: 300,
      },
      {
        name: "Day 3",
        new: 2000,
        running: 9800,
        finished: 2290,
        cancelled: 400,
      },
      {
        name: "Day 4",
        new: 2780,
        running: 3908,
        finished: 2000,
        cancelled: 350,
      },
      {
        name: "Day 5",
        new: 1890,
        running: 4800,
        finished: 2181,
        cancelled: 600,
      },
      {
        name: "Day 6",
        new: 2390,
        running: 3800,
        finished: 2500,
        cancelled: 450,
      },
      {
        name: "Day 7",
        new: 3490,
        running: 4300,
        finished: 2100,
        cancelled: 550,
      },
      {
        name: "Day 8",
        new: 4100,
        running: 3500,
        finished: 3100,
        cancelled: 600,
      },
      {
        name: "Day 9",
        new: 3200,
        running: 2400,
        finished: 2200,
        cancelled: 350,
      },
      {
        name: "Day 10",
        new: 2500,
        running: 2700,
        finished: 2300,
        cancelled: 450,
      },
      {
        name: "Day 11",
        new: 2700,
        running: 3200,
        finished: 2400,
        cancelled: 500,
      },
      {
        name: "Day 12",
        new: 2300,
        running: 3100,
        finished: 2600,
        cancelled: 400,
      },
      {
        name: "Day 13",
        new: 2800,
        running: 3300,
        finished: 2700,
        cancelled: 450,
      },
      {
        name: "Day 14",
        new: 2900,
        running: 3400,
        finished: 2800,
        cancelled: 500,
      },
      {
        name: "Day 15",
        new: 3500,
        running: 2900,
        finished: 2900,
        cancelled: 550,
      },
      {
        name: "Day 16",
        new: 3800,
        running: 3000,
        finished: 3000,
        cancelled: 600,
      },
      {
        name: "Day 17",
        new: 3900,
        running: 3100,
        finished: 3100,
        cancelled: 350,
      },
      {
        name: "Day 18",
        new: 3700,
        running: 3200,
        finished: 3200,
        cancelled: 450,
      },
      {
        name: "Day 19",
        new: 3600,
        running: 3300,
        finished: 3300,
        cancelled: 500,
      },
      {
        name: "Day 20",
        new: 3400,
        running: 3400,
        finished: 3400,
        cancelled: 400,
      },
      {
        name: "Day 21",
        new: 3300,
        running: 3500,
        finished: 3500,
        cancelled: 450,
      },
      {
        name: "Day 22",
        new: 3200,
        running: 3600,
        finished: 3600,
        cancelled: 500,
      },
      {
        name: "Day 23",
        new: 3100,
        running: 3700,
        finished: 3700,
        cancelled: 550,
      },
      {
        name: "Day 24",
        new: 3000,
        running: 3800,
        finished: 3800,
        cancelled: 600,
      },
      {
        name: "Day 25",
        new: 2900,
        running: 3900,
        finished: 3900,
        cancelled: 350,
      },
      {
        name: "Day 26",
        new: 2800,
        running: 4000,
        finished: 4000,
        cancelled: 450,
      },
      {
        name: "Day 27",
        new: 2700,
        running: 4100,
        finished: 4100,
        cancelled: 500,
      },
      {
        name: "Day 28",
        new: 2600,
        running: 4200,
        finished: 4200,
        cancelled: 400,
      },
      {
        name: "Day 29",
        new: 2500,
        running: 4300,
        finished: 4300,
        cancelled: 450,
      },
      {
        name: "Day 30",
        new: 2400,
        running: 4400,
        finished: 4400,
        cancelled: 500,
      },
    ],
  },
};

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

type BarChartDataType = "project" | "timespent" | "clients" | "revenue";
type DayType = "7d" | "30d";
type FieldType = "new" | "running" | "finished" | "cancelled";

export const BarChartWithData = () => {
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

  const [type, setType] = React.useState<BarChartDataType>(
    types[0].value as BarChartDataType,
  );
  const [day, setDays] = React.useState<DayType>(days[0].value as DayType);

  const setTypeFromString = (value: string) => {
    setType(value as BarChartDataType);
  };
  const setDayFromString = (value: string) => {
    setDays(value as DayType);
  };

  return (
    <div className="mb-12">
      <div className="my-2 mr-2 flex justify-end gap-4">
        <Combobox combobox={types} value={type} setValue={setTypeFromString} />
        <Combobox combobox={days} value={day} setValue={setDayFromString} />
      </div>
      <div className="h-64">
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
            {/* <Legend /> */}
            {checkedItems["New Project"] && (
              <Bar
                dataKey="new"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            )}
            {checkedItems["Running Project"] && (
              <Bar
                dataKey="running"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            )}
            {checkedItems["Finished Project"] && (
              <Bar
                dataKey="finished"
                fill="#E55E2C"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            )}
            {checkedItems["Cancelled Project"] && (
              <Bar
                dataKey="cancelled"
                fill="orange"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-2">
        {toggleItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <Checkbox
              id={item.title}
              checked={checkedItems[item.title]}
              onClick={() => handleCheckboxChange(item.title)}
            />
            <Label htmlFor={item.title}>{item.title}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
