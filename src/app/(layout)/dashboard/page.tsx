"use client";

import { BarChartWithData } from "@/components/barChart";
import { PieChartWithData } from "@/components/pieChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  apiRoutes,
  PLACE_HOLDER_IMAGE,
  ProjectData,
  STATUS,
} from "@/config/common";
import { timezoneToDDMMYYYY } from "@/config/common/timeFunctions";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import { Icons, truncateText } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

const Page = () => {
  return (
    <div className="grid w-full grid-cols-12 gap-x-4 gap-y-4 p-4">
      <div className="col-span-8 row-span-1 rounded-md bg-white">
        <BarChartSection />
      </div>
      <div className="col-span-4 row-span-1 rounded-md bg-white">
        <DonutChart />
      </div>
      <div className="col-span-8 row-span-1 rounded-md bg-white">
        <ActiveProjects />
      </div>
      <div className="col-span-4 row-span-1 rounded-md bg-white">
        <RecentMessages />
      </div>
    </div>
  );
};

export default Page;

const BarChartSection = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Overview of the project</h1>
      </div>
      <div className="w-full">
        <BarChartWithData />
      </div>
    </div>
  );
};

const DonutChart = () => {
  return (
    <div>
      <h1 className="p-4 text-xl font-semibold">Overview of the project</h1>
      <div className="h-64 w-full">
        <PieChartWithData />
      </div>
    </div>
  );
};

const ActiveProjects = () => {
  return (
    <div>
      <h1 className="p-4 text-xl font-semibold">Currently active projects</h1>
      <ProjectDetails />
    </div>
  );
};

interface IMessage {
  userName: string;
  userImage: string;
  category: string;
  ProjectType: string;
  lastMessageTime: number;
  numOfUnreadMessage: number;
}

const messages: IMessage[] = [
  {
    userName: "Angela Moss",
    userImage: "https://github.com/shadcn.png",
    category: "Kitchen cabinet",
    ProjectType: "Complex",
    lastMessageTime: 1710838113,
    numOfUnreadMessage: 3,
  },
  {
    userName: "Angela Moss",
    userImage: "https://github.com/shadcn.png",
    category: "Kitchen cabinet",
    ProjectType: "Complex",
    lastMessageTime: 1710898113,
    numOfUnreadMessage: 0,
  },
  {
    userName: "Angela Moss",
    userImage: "https://github.com/shadcn.png",
    category: "Kitchen cabinet",
    ProjectType: "Complex",
    lastMessageTime: 1710838113,
    numOfUnreadMessage: 3,
  },
  {
    userName: "Angela Moss",
    userImage: "https://github.com/shadcn.png",
    category: "Kitchen cabinet",
    ProjectType: "Complex",
    lastMessageTime: 1710838113,
    numOfUnreadMessage: 3,
  },
];

const RecentMessages = () => {
  return (
    <div>
      <h1 className="p-4 text-xl font-semibold">Recent Messages</h1>
      <div>
        {messages.map((message) => (
          <MessageBox
            key={message.userName}
            userName={message.userName}
            userImage={message.userImage}
            category={message.category}
            ProjectType={message.ProjectType}
            lastMessageTime={message.lastMessageTime}
            numOfUnreadMessage={message.numOfUnreadMessage}
          />
        ))}
      </div>
    </div>
  );
};

const MessageBox = ({
  userName,
  userImage,
  category,
  ProjectType,
  lastMessageTime,
  numOfUnreadMessage,
}: IMessage) => {
  return (
    <div className="my-2 flex gap-4 px-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src={userImage} />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="flex w-full border-b-2 pb-2">
        <div className="flex flex-col justify-between">
          <h1 className="text-md font-semibold">{userName}</h1>
          <p className="text-sm font-normal">Category: {category}</p>
          <p className="text-sm font-normal">Project Type: {ProjectType}</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <p className="text-xs font-normal">
            {formatDistanceToNow(new Date(lastMessageTime), {
              addSuffix: true,
            })}
          </p>
          <div className="relative mr-2 w-6">
            <Icons.message className="h-6 w-6" />
            {numOfUnreadMessage === 0 ? null : (
              <Badge className="absolute right-[-10px] top-[-8px] rounded-full text-xs">
                {numOfUnreadMessage}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { data: activeProjects } = useAxiosSWR<ProjectData>(
    apiRoutes.PROTECTED.PROJECTS.LIST({
      limit: 4,
      status: STATUS.ACTIVE,
      expand: "image",
    }),
  );
  console.log("Active Projects", activeProjects);
  return (
    <div className="rounded-md bg-white px-4">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              Projects
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Category
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Date
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Timer
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeProjects.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="text-center font-medium">
                  <div className="flex gap-2">
                    <div className="relative h-10 w-10 rounded-md">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        src={
                          item?.image?.image
                            ? item.image.image
                            : PLACE_HOLDER_IMAGE
                        }
                        alt="project image"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-bold">
                        {truncateText(item.title, 15)}
                      </p>
                      <p>Pricing: {item.pricing_type}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.category}</TableCell>
                <TableCell className="text-center">
                  <p>{timezoneToDDMMYYYY(item.started_at)}</p>
                </TableCell>
                <TableCell className="text-center">
                  <p>{item.durations}</p>
                </TableCell>
                <TableCell className="text-center">
                  <p>{item.status}</p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
