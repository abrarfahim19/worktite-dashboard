import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const appointmentDetailsData = {
  name: "Mark John",
  email: "mark@gmail.com",
  date: 1713972946,
};

const messageData = {
  message:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
};

const Page = () => {
  return (
    <div className="p-4">
      <BreadcrumbMenu />
      <AppointmentDetails {...appointmentDetailsData} />
      <Message {...messageData} />
      <FooterButtons />
    </div>
  );
};

export default Page;

const BreadcrumbMenu = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/dashboard/calender">
              <p>Calender</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <p className="font-semibold">Appointment Details</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface AppointmentDetailsProps {
  name: string;
  email: string;
  date: number;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  name,
  email,
  date,
}) => {
  return (
    <div className="mt-6">
      <p className="mb-4 font-semibold">Appointment details</p>
      <div className="grid w-1/3 grid-cols-2 gap-3">
        <p className="text-gray-700">Client`s Name:</p>
        <p className="font-semibold text-black"> {name} </p>
        <p className="text-gray-700">Email address: </p>
        <p className="font-semibold text-black"> {email} </p>
        <p className="text-gray-700">Date and Time: </p>
        <p className="font-semibold text-black"> {date} </p>
      </div>
    </div>
  );
};

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="mt-6">
      <p className="mb-4 font-semibold">Message</p>
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

const FooterButtons = () => {
  return (
    <div className="mt-4">
      <Button size={"lg"}>
        <p>Join Meeting</p>
      </Button>
      <Button size={"lg"} variant={"link"}>
        <p className="underline">Send Mail</p>
      </Button>
    </div>
  );
};
