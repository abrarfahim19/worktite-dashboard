"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

interface IItems {
  name: string;
  projectType: string;
  accountNo: string;
  category: string;
  noOfProjects: number;
  projectStartingDate: number;
  status: string;
  projectImage: string;
  projectID: string;
}

const appointmentData = [
  {
    name: "Appointment request",
    value: "active",
    numberOfAppointment: 3,
  },
  {
    name: "Appointment Schedule",
    value: "complete",
    numberOfAppointment: 2,
  },
  {
    name: "Finished Appointment",
    value: "cancelled",
    numberOfAppointment: 1,
  },
  {
    name: "Cancel Appointment",
    value: "pending",
    numberOfAppointment: 1,
  },
];
const requestedAppointmentData = [
  {
    id: "abcd",
    clientData: {
      name: "Courney Henry",
      imageUrl: "https://github.com/shadcn.png",
      email: "example@email.com",
      date: 1713972946,
    },
    startTimestamp: 1713972846,
    endTimestamp: 1713972946,
    messageID: "abcd",
    notes: [
      {
        id: "abcdefg",
        date: 1713972946,
        text: "This is a note",
      },
    ],
  },
  {
    id: "abcd",
    clientData: {
      name: "Courney Henry",
      imageUrl: "https://github.com/shadcn.png",
      email: "example@email.com",
      date: 1713972946,
    },
    startTimestamp: 1713972846,
    endTimestamp: 1713972946,
    messageID: "abcd",
    notes: [
      {
        id: "abcdefg",
        date: 1713972946,
        text: "This is a note",
      },
    ],
  },
];

const scheduleAppointmentData = [];

const finishedAppointmentData = [];

const canceledAppointmentData = [];

const Page = () => {
  const [activeTab, setActiveTab] = useState(appointmentData[0].value);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-transparent">
          {appointmentData.map((project) => {
            return (
              <TabsTrigger
                className="py-0 text-sm data-[state=active]:rounded-none data-[state=active]:border-b-brand data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none "
                value={project.value}
                key={project.name}
                onClick={() => {
                  handleTabChange(project.value);
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p
                      className={`${activeTab === project.value ? "font-semibold" : ""} text-md `}
                    >
                      {project.name}
                    </p>
                    <Badge
                      className={`${activeTab === project.value ? "bg-brand" : "bg-softDark"} `}
                    >
                      {project.numberOfAppointment}
                    </Badge>
                  </div>
                  <div
                    className={`h-[2px] w-8 ${activeTab === project.value ? "bg-brand" : "bg-transparent"} `}
                  ></div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="mx-4 rounded bg-white">
          <TabsContent className="w-full" value={appointmentData[0].value}>
            <RequestedAppointment />
          </TabsContent>
          <TabsContent className="w-full" value={appointmentData[1].value}>
            <ScheduledAppointment />
          </TabsContent>
          <TabsContent className="w-full" value={appointmentData[2].value}>
            <FinishedAppointment />
          </TabsContent>
          <TabsContent className="w-full" value={appointmentData[3].value}>
            <CanceledAppointment />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;

const RequestedAppointment = () => {
  return (
    <div>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              Client
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Email
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Date and time
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Message
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Notes
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Accept
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Decline
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestedAppointmentData.map((item) => {
            const startDate = format(
              new Date(item.startTimestamp * 1000),
              "do MMM, yyyy ha",
            );
            const endDate = format(new Date(item.endTimestamp * 1000), "ha");
            return (
              <TableRow key={item.id}>
                <TableCell className="text-center font-medium">
                  <div className="flex gap-2">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        src={item.clientData.imageUrl}
                        alt="project image"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-bold">{item.clientData.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-medium">
                  {item.clientData.email}
                </TableCell>
                <TableCell className="text-center">
                  {startDate}-{endDate}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant={"link"}
                    className="bg-brand_100 bg-opacity-50"
                  >
                    <Icons.messageNew className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant={"link"}
                    className="bg-brand_100 bg-opacity-50"
                  >
                    <Icons.addNote className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant={"outline"}
                    className="border-brand text-brand"
                  >
                    Accept
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={"ghost"} className="text-brand">
                    <p className="underline">Decline</p>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const ScheduledAppointment = () => {
  return <div>ScheduledAppointment</div>;
};

const FinishedAppointment = () => {
  return <div>FinishedAppointment</div>;
};

const CanceledAppointment = () => {
  return <div>CanceledAppointment</div>;
};
// function TableProjects({ items }: { items: IItems[] }) {
//   return (
//     <Table className="">
//       <TableHeader>
//         <TableRow>
//           <TableHead className="text-center font-bold text-black">
//             Projects
//           </TableHead>
//           <TableHead className="text-center font-bold text-black">
//             Acc no
//           </TableHead>
//           <TableHead className="text-center font-bold text-black">
//             Category
//           </TableHead>
//           <TableHead className="text-center font-bold text-black">
//             No of Projects
//           </TableHead>
//           <TableHead className="text-center font-bold text-black">
//             Project starting date
//           </TableHead>
//           <TableHead className="text-center font-bold text-black">
//             Status
//           </TableHead>
//           <TableHead className="text-center font-bold text-black">
//             Details
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {items.map((item) => (
//           <TableRow key={item.accountNo}>
//             <TableCell className="text-center font-medium">
//               <div className="flex gap-2">
//                 <div className="relative h-12 w-12">
//                   <Image
//                     layout="fill"
//                     objectFit="cover"
//                     quality={100}
//                     src={item.projectImage}
//                     alt="project image"
//                   />
//                 </div>
//                 <div className="flex flex-col items-start justify-center">
//                   <p className="font-bold">{item.name}</p>
//                   <p>Pricing type: {item.projectType}</p>
//                 </div>
//               </div>
//             </TableCell>
//             <TableCell className="text-center font-medium">
//               {item.accountNo}
//             </TableCell>
//             <TableCell className="text-center">{item.category}</TableCell>
//             <TableCell className="text-center">{item.noOfProjects}</TableCell>
//             <TableCell className="text-center">
//               {item.projectStartingDate}
//             </TableCell>
//             <TableCell className="text-center">
//               {item.projectStartingDate}
//             </TableCell>
//             <TableCell className="text-center">
//               <Link href={`/dashboard/project/${item.projectID}`}>
//                 <Button variant={"link"}>Details</Button>
//               </Link>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
