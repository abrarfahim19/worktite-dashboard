import { CalendarFull } from "@/components/CalenderFull";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4">
      <CalenderHeader />
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <CalendarFull />
        </div>
        <div className="col-span-2">
          <MeetingCard />
          <AppointmentCard />
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
          <p className="font-thin text-gray-700">7:00 Pm</p>
          <p className="font-thin text-gray-700">8:00 Pm</p>
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
          <p className="font-thin text-gray-700">10:00 Pm</p>
          <p className="font-thin text-gray-700">10:00 Pm</p>
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
