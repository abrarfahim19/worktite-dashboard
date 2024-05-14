"use client";

import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import {default as FullCalendar} from "@fullcalendar/react";
import {
    CustomContentGenerator,
    DateClickArg,
    EventContentArg,
    EventSourceInput,
} from "fullcalendar/index.js";
import {useRef, useState} from "react";

// const renderDayCellContent: CustomContentGenerator<DayCellContentArg> = (
//   dayCellInfo,
// ) => {
//   return (
//     <div className="rounded bg-red-200 p-4">{dayCellInfo.date.getDate()}</div>
//   );
// };

interface IEvent {
    title: string;
    date: string;
}

export const CalendarFull = () => {
    const calendarRef = useRef(null);
    const [data, setData] = useState<IEvent[]>([]);

    function goNext() {
        if (calendarRef?.current) {
            const calendarApi = calendarRef.current.getApi()
            calendarApi.gotoDate(new Date(Date.UTC(2018, 8, 1)))
        }

    }

    const handleDateClick = (arg: DateClickArg) => {
        alert(arg.dateStr);
    };
    const loadEvents: EventSourceInput = (
        fetchInfo,
        successCallback,
        failureCallback,
    ) => {
        console.log("The Func is called");
        successCallback([
            {title: "Mr. Smith", date: "2024-05-01"},
            {title: "Mr. Sanderheitkeith", date: "2024-05-04"},
        ]);
    };
    return (<>
            <button onClick={goNext}>next</button>
            <FullCalendar
                // ref={calendarRef}
                plugins={[
                    dayGridPlugin,
                    interactionPlugin
                ]}
                viewClassNames={"table-fixed"}
                // dayCellClassNames={(arg) => {
                //   // console.log("this is arg");
                //   return `${arg.date === new Date("2024-05-04") ? "bg-red-400" : "bg-gray-100 "}  rounded-lg m-2 border-0`;
                // }}
                dayCellClassNames={"inline-block bg-brand w-[90px] m-1 rounded-3xl  h-[90px]"}
                dayCellContent={''}
                dayCellDidMount={()=>""}
                headerToolbar={{
                    right: "prev,next",
                    center: "title",
                    left: "today",
                }}
                eventTextColor="white"
                themeSystem="Superhero"
                dateClick={handleDateClick}
                events={loadEvents}
                eventContent={renderEventContent}
            /></>
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
