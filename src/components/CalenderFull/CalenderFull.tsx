"use client";

import useDataFetch from "@/hooks/useDataFetch";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { default as FullCalendar } from "@fullcalendar/react";
import {
  CustomContentGenerator,
  DateClickArg,
  DayCellContentArg,
  EventContentArg,
} from "fullcalendar/index.js";
import { useEffect, useRef, useState } from "react";

const renderDayCellContent: CustomContentGenerator<DayCellContentArg> = (
  dayCellInfo,
) => {
  return (
    <div className="rounded bg-red-200 p-4">{dayCellInfo.date.getDate()}</div>
  );
};

interface IEvent {
  title: string;
  date: string;
}

interface CalenderFullProps {
  date: Date;
}
export const CalendarFull: React.FC<CalenderFullProps> = ({ date }) => {
  const calendarRef = useRef(null);
  const [data, setData] = useState<IEvent[]>([]);

  function goToPerticularDate() {
    if (calendarRef?.current) {
      const calendarApi = calendarRef.current.getApi();
      // calendarApi.gotoDate(new Date(Date.UTC(2018, 8, 1)));
      calendarApi.gotoDate(date);
    }
  }
  useEffect(() => {
    // console.log("The Date is changed", date);
    goToPerticularDate();
  }, [date]);

  const handleDateClick = (arg: DateClickArg) => {
    alert(arg.dateStr);
  };
  // const loadEvents: EventSourceInput = (
  //   fetchInfo,
  //   successCallback,
  //   failureCallback,
  // ) => {
  //   console.log("The Func is called");
  //   successCallback([
  //     { title: "Mr. Smith", date: "2024-05-01" },
  //     { title: "Mr. Sanderheitkeith", date: "2024-05-04" },
  //   ]);
  // };
  const { data: eventsData, isLoading } = useDataFetch<IEvent[]>(
    "http://localhost:8000/events",
  );
  console.log("Data is", eventsData);
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        // viewClassNames={"table-fixed"}
        // dayCellClassNames={(arg) => {
        //   // console.log("this is arg");
        //   return `${arg.date === new Date("2024-05-04") ? "bg-red-400" : "bg-gray-500 "}  rounded-lg m-2 border-0`;
        // }}
        // dayCellClassNames={"bg-white m-1 rounded-3xl border-0"}
        dayCellDidMount={() => ""}
        headerToolbar={{
          right: "",
          center: "title",
          left: "",
        }}
        // allDayContent={renderDayCellContent}
        eventTextColor="white"
        themeSystem="Superhero"
        // dateClick={handleDateClick}
        events={eventsData}
        eventContent={renderEventContent}
      />
    </>
  );
};

const renderEventContent: CustomContentGenerator<EventContentArg> = (
  eventInfo,
) => {
  return (
    <div className="bg-brand">
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
};
