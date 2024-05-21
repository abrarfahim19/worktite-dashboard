"use client";

import { DatePicker } from "@/components/datePicker";
import { Timeline } from "@/components/timeline";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { apiRoutes, getTimeFromDate, second2DHMS } from "@/config/common";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import useDataFetch from "@/hooks/useDataFetch";
import { Icons } from "@/lib/utils";
import { format, formatDuration, intervalToDuration } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import { FromToTime } from "@/components/fromToTime";
import { postInvoice } from "../manager/projectManager";

interface IProject {
  id: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  is_active: boolean;
  started_at: string;
  ended_at: string;
  status: string;
  title: string;
  description: string;
  pricing_type: string;
  price: string;
  category: number;
  client: number;
  image: number;
  durations: number;
}

const Page = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { data } = useDataFetch<IProject>(
    apiRoutes.PROTECTED.PROJECTS.GET(params.slug),
  );
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <div className="px-4">
      <BreadcrumbMenu />
      <Timeline id={params.slug} />
      <div className="mt-20"></div>
      <TotalTime totalTimeStamp={data?.durations} />
      <Running id={params.slug} />
      <TotalWorkingHours projectId={params.slug} />
      <AppointmentList />
      <ProjectDetails />
      <FinalDocuments slug={params.slug} />
      <ProjectInvoices id={params.slug} />
      <MeetingNotes />
      <CompleteCancelOrder />
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
            <Link href="/dashboard/project">
              <p>Active Project</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <p className="font-semibold">Project Details</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const TotalTime = ({ totalTimeStamp }: { totalTimeStamp?: number }) => {
  const durations = useMemo(() => {
    return second2DHMS(totalTimeStamp ?? 0);
  }, [totalTimeStamp]);
  return (
    <div className="rounded-md bg-white p-4">
      <div className="flex gap-2">
        <Icons.timer className="h-6 w-6" />
        <p className="font-semibold">Timer</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h4 className="text-2xl font-semibold">Total Time</h4>
        <div className="mt-8 flex gap-4">
          <div>
            <h2 className="text-3xl font-semibold">{durations.days}</h2>
            <p className=" mt-2 text-xs">Days</p>
          </div>
          <h2 className="text-3xl font-semibold">:</h2>
          <div>
            <h2 className="text-3xl font-semibold">{durations.hours}</h2>
            <p className="mt-2 text-xs">Hours</p>
          </div>
          <h2 className="text-3xl font-semibold">:</h2>
          <div>
            <h2 className="text-3xl font-semibold">{durations.minutes}</h2>
            <p className="mt-2 text-xs">Minutes</p>
          </div>
          <h2 className="text-3xl font-semibold">:</h2>
          <div>
            <h2 className="text-3xl font-semibold">{durations.seconds}</h2>
            <p className="mt-2 text-xs">Seconds</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

const Running = ({ id }: { id: string }) => {
  return (
    <div className="bg-white px-4 pt-8">
      <h4 className="mb-4 text-center text-2xl text-brand">Running</h4>
      <div className="flex justify-around">
        <div className="flex gap-20">
          <FromToTime id={id} />
          {/* <div className="mx-8 flex gap-8"> */}
          {/* <h3 className="mt-4 text-2xl font-semibold">Start</h3> */}
          {/* <div className="flex flex-col justify-start">
              <div className="flex w-full items-center justify-between border-b-2 border-b-black">
                <Input
                  className="my-2 w-full border-0 bg-transparent pl-0 text-2xl focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  defaultValue={"10 h : 55 m"}
                  placeholder=""
                />
                <PlainCombobox combobox={combobox} />
              </div>
              <Button className="mt-8 w-32 py-8 text-xl">Add</Button>
            </div> */}

          {/* <InputTimeForm disabled hour="10" minute="20" meridiem="am" />
          </div> */}
          {/* <div className="mx-8 flex gap-8"> */}
          {/* <h3 className="mt-4 text-2xl font-semibold">End</h3> */}
          {/* <div className="flex flex-col justify-start">
              <div className="flex w-full items-center justify-between border-b-2 border-b-black">
                <Input
                  className="my-2 w-full border-0 bg-transparent pl-0 text-2xl focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  defaultValue={"00 h : 00 m"}
                  placeholder=""
                />
                <PlainCombobox combobox={combobox} />
              </div>
              <Button
                variant={"secondary"}
                className="mt-8 w-32 bg-gray-200 py-8 text-xl"
              >
                Add
              </Button>
            </div> */}

          {/* <InputTimeForm /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

interface IWorkingHours {
  id: number;
  created_at: string;
  updated_at: string;
  started_at: string;
  ended_at: string;
  working_seconds: number;
  created_by: number;
  project: number;
}

const TotalWorkingHours = ({ projectId }: { projectId: string }) => {
  const { data: workingHours } = useAxiosSWR<IWorkingHours>(
    apiRoutes.PROTECTED.PROJECTS.WORK_HISTORY.LIST(projectId)({ limit: 10 }),
  );
  const date = new Date();
  return (
    <div className="bg-white px-4 py-4">
      <h3 className="mt-4 text-lg font-semibold">Total Working Hours</h3>

      <Table className="mx-auto w-2/3 self-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              Date
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Start Time
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              End Time
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Total Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workingHours?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-center font-medium">
                <div className="">
                  <p>{format(new Date(item.created_at), "dd/MM/yy")}</p>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                <p>
                  {format(
                    getTimeFromDate(item?.started_at).getTime(),
                    "h:mm a",
                  )}
                </p>
              </TableCell>
              <TableCell className="text-center">
                <p>{format(getTimeFromDate(item?.ended_at), "h:mm a")}</p>
              </TableCell>
              <TableCell className="text-center">
                <p>
                  {formatDuration(
                    intervalToDuration({
                      start: getTimeFromDate(item?.started_at),
                      end: getTimeFromDate(item?.ended_at),
                    }),
                    { format: ["hours", "minutes", "seconds"] },
                  )}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const appointmentData = [
  {
    date: 1711159239,
    messageLink: "https://www.facebook.com",
    meetingNoteLink: "https://www.facebook.com",
    appointmentType: "Online",
    status: "Pending",
    appointmentLink: "https://www.facebook.com",
  },
  {
    date: 1711159239,
    messageLink: "https://www.facebook.com",
    meetingNoteLink: "https://www.facebook.com",
    appointmentType: "Online",
    status: "Complete",
    appointmentLink: "https://www.facebook.com",
  },
  {
    date: 1711159239,
    messageLink: "https://www.facebook.com",
    meetingNoteLink: "https://www.facebook.com",
    appointmentType: "Online",
    status: "Complete",
    appointmentLink: "https://www.facebook.com",
  },
];

const AppointmentList = () => {
  return (
    <div className="mt-6 rounded-md bg-white p-4">
      {/* <h3 className="text-lg font-semibold">Project Details</h3> */}

      <Table className="mx-auto self-center">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              Date and Time
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Message
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Meeting Note
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Appointment Type
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Status
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentData.map((item) => (
            <TableRow key={item.date}>
              <TableCell className="text-center font-medium">
                <div className="">
                  <p>
                    {format(new Date(item.date * 1000), "do MMM, 'at' h:mm a")}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-brand bg-opacity-10">
                  <Icons.download className="h-6 w-6" />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <MeetingNoteDialog />
              </TableCell>
              <TableCell className="text-center">
                <p>{item.appointmentType}</p>
              </TableCell>
              <TableCell className="text-center">
                <p>{item.status}</p>
              </TableCell>
              <TableCell className="text-center">
                {item.status === "Pending" ? (
                  <div className="flex justify-between">
                    <Button className="w-32 py-8 text-xl">
                      <Link href={item.appointmentLink}>Start</Link>
                    </Button>
                    <Button className="w-32 py-8 text-xl" variant={"secondary"}>
                      <Link href={item.appointmentLink}>Finish</Link>
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant={"secondary"}
                    className="w-full bg-gray-300 py-8 text-xl"
                  >
                    Completed
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <NewAppointmentDialog />
    </div>
  );
};

const projectDetails = [
  {
    name: "Table",
    projectImage:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Kitchen table",
    accountNo: "#436",
    client: "Jane Cooper",
    pricing: 15,
    projectType: "Hourly",
    projectStartingDate: 1710838113,
    noOfProjects: 3,
    status: "Active",
    projectID: "PRJ001",
    messageLink: "https://www.facebook.com",
  },
];

const ProjectDetails = () => {
  return (
    <div className="mt-6 rounded-md bg-white p-4">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              Projects
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Acc no
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Client
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Pricing
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Project starting date
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Message
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projectDetails.map((item) => (
            <TableRow key={item.accountNo}>
              <TableCell className="text-center font-medium">
                <div className="flex gap-2">
                  <div className="relative h-12 w-12">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      src={item.projectImage}
                      alt="project image"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <p className="font-bold">{item.name}</p>
                    <p>{item.category}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">{item.accountNo}</TableCell>
              <TableCell className="text-center font-medium">
                <p>{item.client}</p>
              </TableCell>
              <TableCell className="text-center">
                <p>
                  {item.projectType} {item.pricing}$
                </p>
              </TableCell>
              <TableCell className="text-center">
                <p>
                  {format(
                    new Date(item.projectStartingDate * 1000),
                    "dd/MM/yy",
                  )}
                </p>
              </TableCell>
              <TableCell className="">
                <div className="flex justify-end">
                  <Button
                    variant={"outline"}
                    className="w-44 border-brand py-8 text-lg font-semibold text-brand"
                  >
                    Message
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const FinalDocuments = ({ slug }: { slug: string }) => {
  return (
    <div className="mt-6 rounded-md bg-white px-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Final Documents</h3>
        <Link href={`${slug}/documents`}>
          <Button
            variant={"outline"}
            className="m-4 w-52 border-brand py-8 text-lg font-semibold text-brand"
          >
            View Documents
          </Button>
        </Link>
      </div>
    </div>
  );
};

const invoiceData = [
  {
    date: 1711159239,
    invoiceNo: "INV001",
    amount: 100,
    status: "Pending",
    paymentMethod: "Cash payment",
    // dueDate: 1711184439,
    downloadLink: "https://www.facebook.com",
    receiveLink: "https://www.facebook.com",
    received: true,
  },
  {
    date: 1711159239,
    invoiceNo: "INV001",
    amount: 100,
    status: "Pending",
    paymentMethod: "Cash payment",
    // dueDate: 1711184439,
    downloadLink: "https://www.facebook.com",
    receiveLink: "https://www.facebook.com",
    received: true,
  },
  {
    date: 1711159239,
    invoiceNo: "INV001",
    amount: 100,
    status: "Pending",
    paymentMethod: "Cash payment",
    // dueDate: 1711184439,
    downloadLink: "https://www.facebook.com",
    receiveLink: "https://www.facebook.com",
    received: false,
  },
];

interface IAdditionalInvoice {
  id: string;
}

const ProjectInvoices: React.FC<IAdditionalInvoice> = ({ id }) => {
  return (
    <div className="mt-6 rounded-md bg-white p-4">
      <h3 className="text-lg font-semibold">Invoice</h3>
      <div className="mt-4">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold text-black">
                Date
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Invoice no
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Amount
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Status
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Payment Method
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Download
              </TableHead>
              <TableHead className="text-center font-bold text-black">
                Received
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceData.map((item) => (
              <TableRow key={item.invoiceNo}>
                <TableCell className="text-center font-medium">
                  <p>{format(new Date(item.date * 1000), "dd/MM/yy")}</p>
                </TableCell>

                <TableCell className="text-center">#{item.invoiceNo}</TableCell>
                <TableCell className="text-center">{item.amount} $</TableCell>
                <TableCell className="text-center font-medium">
                  <p>{item.status}</p>
                </TableCell>
                <TableCell className="text-center font-medium">
                  <p>{item.paymentMethod}</p>
                </TableCell>
                <TableCell className="">
                  <div className="flex items-center justify-center">
                    <Link href={item.downloadLink}>
                      <Icons.downloadBlack className="h-6 w-6" />
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="">
                  <div className="flex justify-end">
                    {item.received ? (
                      <Button
                        variant={"secondary"}
                        className="w-44 bg-green-100 py-8 text-lg font-semibold text-green-600"
                      >
                        Received
                      </Button>
                    ) : (
                      <Button className="w-44 py-8 text-lg font-semibold">
                        Receive
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AdditionalInvoiceDialog id={id} />
    </div>
  );
};

const meetingNoteData = [
  {
    date: 1711159239,
    title: "Criteria discussion",
    noteCreator: {
      name: "John Doe",
      role: "Designer",
      image: "https://github.com/shadcn.png",
    },
    meetingWithPersonData: {
      name: "Jane Cooper",
      role: "Client",
      profile: "https://www.facebook.com",
    },
    note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus.",
  },
  {
    date: 1711159239,
    title: "Pricing discussion",
    noteCreator: {
      name: "John Doe",
      role: "Designer",
      image: "https://github.com/shadcn.png",
    },
    meetingWithPersonData: {
      name: "Jane Cooper",
      role: "Client",
      profile: "https://www.facebook.com",
    },
    note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus.",
  },
];

const MeetingNotes = () => {
  return (
    <div className="mt-6 bg-white p-4">
      <h3 className="text-lg font-semibold">Meeting Notes</h3>
      {meetingNoteData.map((item, index) => (
        <div key={index} className="mt-4 px-2">
          <div className="flex justify-between">
            <div className="">
              <div className="mt-4 flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={item.noteCreator.image} />
                  <AvatarFallback>{item.noteCreator.name}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {item.noteCreator.name}, {item.noteCreator.role}
                  </p>
                  <p className="">
                    Meeting with{" "}
                    <span className="font-semibold underline">
                      <Link href={item.meetingWithPersonData.profile}>
                        {item.meetingWithPersonData.name}{" "}
                      </Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <p>
                {format(new Date(item.date * 1000), "dd-MM-yyyy 'at' h:mma")}
              </p>
              <Icons.menu className="h-4 w-4" />
            </div>
          </div>
          <div>
            <h4 className="mt-4 text-lg font-semibold">{item.title}</h4>
            <p className="mt-2 text-justify">{item.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const CompleteCancelOrder = () => {
  return (
    <div className="my-10">
      <div className="flex gap-10">
        <OrderCompleteDialog />
        <CancelDialog />
      </div>
    </div>
  );
};

const CancelDialog = () => {
  const cancelOrderHandler = () => {
    console.log("cancel order");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="w-44 py-8 text-lg font-semibold">
          Cancel Order
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full px-10">
        <DialogHeader className="">
          <DialogTitle className="text-center text-3xl font-bold text-black">
            Are you sure you want to Cancel order
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2">
          <Icons.cancelOrder className="my-8 h-60 w-60" />
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            variant={"link"}
            type="button"
            className="w-32 py-8 text-lg font-semibold underline"
            onClick={cancelOrderHandler}
          >
            Yes
          </Button>
          <DialogClose asChild>
            <Button type="button" className="w-32 py-8 text-lg font-semibold">
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const MeetingNoteDialog = () => {
  const meetingDialogHandler = () => {
    console.log("Meeting Dialog Updated");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant={"ghost"}> */}
        <button>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-brand bg-opacity-10">
            <Icons.note className="h-6 w-6" />
          </div>
        </button>
        {/* </Button> */}
      </DialogTrigger>

      <DialogContent className="w-full px-10">
        <DialogHeader className="">
          <DialogTitle className="text-center text-lg font-bold text-black">
            Meeting notes
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-full">
            <Label htmlFor="subject" className="">
              Subject of meeting notes
            </Label>
            <Input
              type="text"
              id="subject"
              placeholder="Subject"
              className="mb-6 mt-2 border-black py-6"
              // className="w-full border-black bg-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
            <Label htmlFor="note" className="">
              Meeting note details
            </Label>
            <Textarea
              id="note"
              placeholder="Type your message here."
              className="mt-2 border-black"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            className="w-full py-8 text-lg font-semibold"
            onClick={meetingDialogHandler}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const orderCompleteData = {
  name: "Table",
  category: "Kitchen table",
  image:
    "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  pricingType: "Hourly",
  hourlyRate: 15,
  totalTimeSpent: 1711184439 - 1711159239,
  subTotal: 100,
  tax: 10,
  total: 110,
};

const OrderCompleteDialog = () => {
  const [check, setCheck] = useState(false);
  const orderCompleteDialogHandler = () => {
    console.log("Order Completed");
  };
  const checkboxHandler = (prev: boolean) => {
    setCheck(!prev);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-48 py-8 text-lg font-semibold">
          Complete Order
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full px-10">
        <DialogHeader className="">
          <DialogTitle className="text-center text-lg font-semibold text-black">
            Congratulation
          </DialogTitle>
          <DialogTitle className="text-center text-lg font-semibold text-black">
            The project has been completed successfully
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-full">
            <h5 className="text-md font-semibold">Project Details</h5>
            <div className="mt-4 flex gap-4">
              <div className="relative h-24 w-24">
                <Image
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  src={orderCompleteData.image}
                  alt="project image"
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-semibold">{orderCompleteData.name}</p>
                <p>Category: {orderCompleteData.category}</p>
                <p>Pricing type: {orderCompleteData.pricingType}</p>
              </div>
            </div>
            <hr className="my-4" />

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-start">
                  <p className="text-regular w-64 font-semibold">Hourly rate</p>
                  <p className="font-bold"> {orderCompleteData.hourlyRate}</p>
                </div>
                <div className="flex justify-start">
                  <p className="text-regular w-64 font-semibold">
                    Total time spent
                  </p>
                  <p className="font-bold">
                    {orderCompleteData.totalTimeSpent}
                  </p>
                </div>
                <div className="flex justify-start">
                  <p className="text-regular w-64 font-semibold">Subtotal</p>
                  <p className="font-bold">$ {orderCompleteData.subTotal}</p>
                </div>
                <div className="flex justify-start">
                  <p className="text-regular w-64 font-semibold">Tax</p>
                  <p className="font-bold">$ {orderCompleteData.tax}</p>
                </div>
              </div>
              <hr className="w-full" />
              <div className="flex flex-col gap-4">
                <div className="flex justify-start">
                  <p className="text-regular w-64 font-semibold">Total</p>
                  <p className="font-bold">$ {orderCompleteData.total}</p>
                </div>
                <div className="my-4 flex items-center justify-start gap-2">
                  <Checkbox
                    id="terms"
                    // checked={check}
                    onCheckedChange={checkboxHandler}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send invoice
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="">
          <div className="flex flex-1 flex-row gap-8">
            <Button
              className={`w-44 bg-gray-300 py-8 text-lg text-black ${!check && "bg-brand text-white opacity-100"}`}
              disabled={check}
            >
              Send invoice
            </Button>
            <div>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"link"}
                  className={`w-full py-8 text-lg font-semibold underline `}
                  onClick={orderCompleteDialogHandler}
                >
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const NewAppointmentDialog = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const newAppointmentHandler = () => {
    console.log("Meeting Dialog Updated");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant={"ghost"}> */}
        <Button
          variant={"outline"}
          className="mt-4 border-brand px-8 py-8 text-lg font-semibold text-brand"
        >
          New Appointment
        </Button>
        {/* </Button> */}
      </DialogTrigger>

      <DialogContent className="max-h-screen max-w-screen-md overflow-auto">
        <DialogHeader className="">
          <DialogTitle className="text-center text-lg font-bold text-black">
            Set Meetings Schedule
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-full">
            <p className="font-semibold">Select date</p>
            <DatePicker />
            <div className="w-full">
              <Label htmlFor="subject" className="">
                Subject of meeting notes
              </Label>
              <Input
                type="text"
                id="subject"
                placeholder="Subject"
                className="mb-6 mt-2 border-black py-6"
              />
              <Label htmlFor="note" className="">
                Meeting note details
              </Label>
              <Textarea
                id="note"
                placeholder="Type your message here."
                className="mt-2 border-black"
              />
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            className="w-full py-8 text-lg font-semibold"
            onClick={newAppointmentHandler}
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface IAdditionalInvoiceDialog {
  id: string;
}

const AdditionalInvoiceDialog: React.FC<IAdditionalInvoiceDialog> = ({
  id,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf", ".doc"],
    },
  });

  const files = acceptedFiles.map((file: any) => {
    const turncated =
      file.path.length > 10 ? file.path.substring(0, 10) + "..." : file.path;
    return (
      <li key={file.path}>
        {turncated} - {file.size} bytes
      </li>
    );
  });

  const additionalInvoiceHandler = () => {
    console.log("invoice Completed");
  };

  const invoiceHandler = async () => {
    console.log("Start executing!");
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      console.log("File Type is following", file.type);
      let file_type = 2;
      if (file.type === "application/pdf") {
        file_type = 1;
      }
      const payLoad = {
        id,
        formData,
        file_type,
      };
      await postInvoice(payLoad);
      // if
      // await postInvoice(id, formData, );
      // try {
      //   const response = await apiPost(
      //     apiRoutes.FILES.DOCUMENTS.POST,
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "application/pdf",
      //       },
      //     },
      //   );
      //   console.log("File uploaded successfully:", response.data);
      // } catch (error) {
      //   console.error("Error uploading file:", error);
      // }
    } else {
      console.log("No files to upload");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="mt-4 border-brand bg-transparent px-8 py-8 text-lg font-semibold text-brand"
        >
          Additional Invoice
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full px-10">
        <DialogHeader className="">
          <DialogTitle className="text-center text-lg font-semibold text-black">
            Upload the invoice here
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-full">
            <h5 className="text-md font-semibold">Upload PDF (Optional)</h5>
            <div className="mt-4 flex gap-4">
              <div className="w-full items-center justify-center">
                <div
                  {...getRootProps({
                    className:
                      "h-32 w-full rounded-md border-[1px] border-dashed border-black bg-transparent flex justify-center items-center ",
                  })}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Icons.upload className="h-12 w-12" />
                    <p className="w-1/2 text-xs">
                      Drag and drop or click to upload your invoice
                    </p>
                  </div>
                </div>
                <h4 className="my-2 font-semibold">Files</h4>
                <ul>{files}</ul>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="">
          <div className="flex flex-1 flex-row gap-8">
            <Button
              className={`w-44 py-8 text-lg text-white`}
              onClick={invoiceHandler}
            >
              Create Invoice
            </Button>

            <div>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant={"link"}
                  className={`w-full py-8 text-lg font-semibold underline `}
                  onClick={additionalInvoiceHandler}
                >
                  Send
                </Button>
                {/* <InvoiceSentDialog /> */}
              </DialogClose>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const InvoiceSentDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant={"link"}
            className={`w-full py-8 text-lg font-semibold underline `}
            // onClick={additionalInvoiceHandler}
          >
            Invoice Sent Dialog
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="">
            <DialogTitle className="text-center">Thank you</DialogTitle>
            <DialogTitle className="text-center">
              Invoice has been sent
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <Icons.thankYou className="h-44 w-44" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="w-full py-6">
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
