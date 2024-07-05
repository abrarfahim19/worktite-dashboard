"use client";

import { apiRoutes } from "@/config/common";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import { cn } from "@/lib/utils";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { default as FullCalendar } from "@fullcalendar/react";
import {
  CustomContentGenerator,
  DateClickArg,
  DayCellContentArg,
  EventContentArg,
} from "fullcalendar/index.js";
import { useEffect, useMemo, useRef } from "react";

const renderDayCellContent: CustomContentGenerator<DayCellContentArg> = (
  dayCellInfo,
) => {
  return (
    <div className="rounded bg-red-200 p-4">{dayCellInfo.date.getDate()}</div>
  );
};
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

interface CalenderFullProps {
  date: Date;
  setDayEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
}
export const CalendarFull: React.FC<CalenderFullProps> = ({
  date,
  setDayEvents,
}) => {
  const monthYearQuery = "".concat(
    date.getFullYear().toString(),
    "-",
    (date.getMonth() + 1).toString().padStart(2, "0"),
  );
  const calendarRef = useRef<FullCalendar | null>(null);
  const { data: appointments } = useAxiosSWR<IEvent>(
    apiRoutes.PROTECTED.GENERAL.CALENDER.APPOINTMENTS.LIST({
      month_year: monthYearQuery,
      limit: 30,
    }),
  );
  const { data: meetings } = useAxiosSWR<IEvent>(
    apiRoutes.PROTECTED.GENERAL.CALENDER.MEETINGS.LIST({
      month_year: monthYearQuery,
      limit: 30,
    }),
  );
  const events = useMemo(() => {
    if (!appointments && !meetings) return [];
    const modifiedAppointments = appointments.map((e) => ({
      ...e,
      id: `${e?.id}-${e?.event_type}`,
    }));
    const modifiedMeetings = meetings.map((e) => ({
      ...e,
      id: `${e?.id}-${e?.event_type}`,
    }));
    return [...modifiedAppointments, ...modifiedMeetings];
  }, [appointments, meetings]);

  console.log("appointments", appointments, meetings, events.length);
  function goToPerticularDate() {
    if (calendarRef?.current) {
      const calendarApi = calendarRef.current.getApi();
      // calendarApi.gotoDate(new Date(Date.UTC(2018, 8, 1)));
      calendarApi.gotoDate(date);
    }
  }
  useEffect(() => {
    goToPerticularDate();
  }, [date]);

  const handleDateClick = (arg: DateClickArg) => {
    setDayEvents(events.filter((e) => e?.date === arg.dateStr));
  };
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        dayCellDidMount={() => ""}
        headerToolbar={{
          right: "",
          center: "title",
          left: "",
        }}
        eventTextColor="white"
        themeSystem="Superhero"
        dateClick={handleDateClick}
        events={events}
        eventContent={renderEventContent}
      />
    </>
  );
};

const renderEventContent: CustomContentGenerator<EventContentArg> = (
  eventInfo,
) => {
  console.log("evnetinfo", eventInfo);
  return (
    <div
      className={cn(
        "cursor-pointer bg-brand",
        // eventInfo?.event?.event_type && "bg-green-300",
      )}
    >
      {/* <b>{eventInfo.event?.event_type}</b> */}
      <i>{eventInfo.event.title}</i>
    </div>
  );
};
