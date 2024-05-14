"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { apiRoutes, getFirstCharCapitalized } from "@/config/common";
import useDataFetch from "@/hooks/useDataFetch";
import { Icons } from "@/lib/utils";
import Link from "next/link";

const meetingDetailsData = {
  name: "Mark John",
  email: "mark@gmail.com",
  date: 1713972946,
  member_sice: 1713972946,
  address: "New York, USA",
};

const messageData = {
  message:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
};

const Page = () => {
  return (
    <div className="p-4">
      <BreadcrumbMenu />
      <div className="mt-4 grid grid-cols-7 gap-x-4">
        <LeftSection />
        <RightSection />
      </div>
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
            <p className="font-semibold">Meeting Details</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface IProfilePicture {
  id: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image: string;
  created_by: number;
}

interface IUserDetails {
  name?: string;
  company_name?: string;
  contact_name?: string;
  phone?: string;
  vat?: string;
  bill_email?: string;
  mail_address?: string;
  gender?: string;
  about?: string;
  note?: string;
  profile_picture?: IProfilePicture;
}

interface IUser {
  id?: number;
  email?: string;
  username?: string | null;
  user_details?: IUserDetails;
  user_type?: string;
  project_count?: number;
  date_joined?: string;
  last_login?: string | null;
}

const LeftSection = () => {
  const { data: clientData, isLoading } = useDataFetch<IUser>(
    apiRoutes.PROTECTED.CLIENTS.CLIENT.GET("3")({
      expand: "user_details,user_details.profile_picture",
    }),
  );
  console.log("Data is: ", clientData);
  return (
    <div className="col-span-3 flex flex-col items-center rounded-lg bg-white p-2">
      <div className="relative my-4">
        <Avatar className="h-[134px] w-[134px]">
          <AvatarImage src={clientData?.user_details?.profile_picture?.image} />
          <AvatarFallback>
            {getFirstCharCapitalized(
              clientData?.user_details?.name
                ? clientData.user_details.name
                : "Client",
            )}
          </AvatarFallback>
        </Avatar>
      </div>
      <p className="mb-2 font-bold">{clientData?.user_details?.name}</p>
      <p className="mb-2 font-semibold">{clientData?.email}</p>
      <Button size={"lg"}>Send Message</Button>
      <div className="mt-6 flex w-3/4 flex-col gap-4">
        <div className="flex items-center gap-2">
          <Icons.location className="h-6 w-6" />
          <p>From</p>
          <p>Merlin City , Netherland</p>
        </div>
        <div className="flex items-center gap-2">
          <Icons.user className="h-6 w-6" />
          <p>Member Since</p>
          <p>Merlin City , Netherland</p>
        </div>
      </div>
    </div>
  );
};

const RightSection = () => {
  return (
    <div className="col-span-4 rounded-lg bg-white p-4">
      <MeetingDetails {...meetingDetailsData} />
      <Message {...messageData} />
      <DateAndTime />
      <MeetingMode />
      <FooterButtons />
    </div>
  );
};

interface MeetingDetailsProps {
  name: string;
  email: string;
  date: number;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
  name,
  email,
  date,
}) => {
  return (
    <div className="">
      <p className="mb-4 font-semibold">Meeting details</p>
      <div className="gap-3">
        <p className="font-bold text-gray-700">
          Complex/Simple Project Order Number:{" "}
          <span className="font-semibold text-brand">Order No: {1212}</span>
        </p>
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
      <p className="mb-4 font-semibold">Notes</p>
      <p className="text-gray-700">{message}</p>
    </div>
  );
};

const DateAndTime = () => {
  return (
    <div>
      <div className="my-4 flex gap-2 font-bold">
        <p>Date and Time: </p>
        <p>Today 6:00 Pm</p>
        <p>TO</p>
        <p>Today 8:00 Pm</p>
      </div>
    </div>
  );
};

const MeetingMode = () => {
  return (
    <div>
      <p>
        Meeting Mode: <span className="font-semibold">{"Online"}</span>
      </p>
    </div>
  );
};

const FooterButtons = () => {
  return (
    <div className="my-4">
      <Button
        size={"lg"}
        variant={"outline"}
        className="border-brand text-brand"
      >
        <p>Join Meeting</p>
      </Button>
      <Button size={"lg"} variant={"link"}>
        <p className="underline">Send Mail</p>
      </Button>
    </div>
  );
};
