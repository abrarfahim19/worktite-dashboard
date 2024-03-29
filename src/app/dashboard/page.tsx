import { Combobox } from "@/components/combobox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";

const Page = () => {
  return (
    <div className="grid w-full grid-cols-12 grid-rows-2 gap-4 p-4">
      <div className="col-span-8 row-span-1 rounded-md bg-white">
        <BarChart />
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
    value: "14d",
    label: "Last 14 days",
  },
  {
    value: "30d",
    label: "Last 30 days",
  },
  {
    value: "2m",
    label: "Last 2 months",
  },
  {
    value: "3m",
    label: "Last 3 months",
  },
  {
    value: "6m",
    label: "Last 6 months",
  },
  {
    value: "30",
    label: "Last 30 days",
  },
];

const BarChart = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Overview of the project</h1>
        <div className="flex gap-4">
          <Combobox combobox={types} />
          <Combobox combobox={days} />
        </div>
      </div>
      <div className="h-52 w-full bg-blue-400"></div>
      <div className="mx-14 my-4 flex justify-between">
        <div className="flex items-center gap-2">
          <Checkbox id="new" />
          <label
            htmlFor="new"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            New Projects
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="running" />
          <label
            htmlFor="running"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Running projects
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="finished" />
          <label
            htmlFor="finished"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Finished projects
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cancelled" />
          <label
            htmlFor="cancelled"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Cancelled projects
          </label>
        </div>
      </div>
    </div>
  );
};

const DonutChart = () => {
  return (
    <div>
      <h1 className="p-4 text-xl font-semibold">Overview of the project</h1>
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

const currentlyActiveProjects = [
  {
    name: "Chesterfield Table",
    projectImage:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Kitchen table",
    accountNo: "#436",
    client: "Jane Cooper",
    pricing: 15,
    pricingType: "Hourly",
    projectStartingDate: 1710838113,
    noOfProjects: 3,
    status: "Active",
    projectID: "PRJ001",
    messageLink: "https://www.facebook.com",
    timer: 189490,
  },
  {
    name: "Vesterfield Table",
    projectImage:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Dinner table",
    accountNo: "#436",
    client: "Jane Cooper",
    pricing: 15,
    pricingType: "Hourly",
    projectStartingDate: 1710838113,
    noOfProjects: 3,
    status: "Active",
    projectID: "PRJ001",
    messageLink: "https://www.facebook.com",
    timer: 189490,
  },
  {
    name: "Vesterfield Table",
    projectImage:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Dinner table",
    accountNo: "#436",
    client: "Jane Cooper",
    pricing: 15,
    pricingType: "Hourly",
    projectStartingDate: 1710838113,
    noOfProjects: 3,
    status: "Active",
    projectID: "PRJ001",
    messageLink: "https://www.facebook.com",
    timer: 189490,
  },
];

const ProjectDetails = () => {
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
          {currentlyActiveProjects.map((item) => {
            const timestamp = item.timer;
            const days = Math.floor(timestamp / (24 * 60 * 60));
            const hours = Math.floor((timestamp % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((timestamp % (60 * 60)) / 60);
            const seconds = timestamp % 60;

            const duration = `${days}d-${hours}h-${minutes}m-${seconds}s`;
            return (
              <TableRow key={item.accountNo}>
                <TableCell className="text-center font-medium">
                  <div className="flex gap-2">
                    <div className="relative h-10 w-10 rounded-md">
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
                      <p>Pricing Type: {item.pricingType}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.category}</TableCell>
                <TableCell className="text-center">
                  <p>
                    {format(
                      new Date(item.projectStartingDate * 1000),
                      "dd-MM-yy",
                    )}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  <p>{duration}</p>
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
