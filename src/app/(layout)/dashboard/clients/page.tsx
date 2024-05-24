"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiRoutes, getFirstCharCapitalized } from "@/config/common";
import { timezoneToDDMMYYYY } from "@/config/common/timeFunctions";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import { Icons } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface IItems {
  profileImage: string;
  name: string;
  accountNo: string;
  accountOpeningDate: number;
  noOfProjects: number;
  category: string;
  notes: string;
  userID: string;
}

const clientsData = [
  {
    name: "Total Account",
    value: "total",
    numberOfProjects: 3,
    clients: [
      {
        profileImage:
          "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Jane Cooper",
        accountNo: "#436",
        accountOpeningDate: 1710838113,
        noOfProjects: 3,
        category: "Kitchen table",
        notes: "www.google.com",
        userID: "PRJ001",
      },
    ],
  },
  {
    name: "Running Project Accounts",
    value: "running",
    numberOfProjects: 2,
    clients: [
      {
        profileImage:
          "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Jane Cooper",
        accountNo: "#436",
        accountOpeningDate: 1710838113,
        noOfProjects: 3,
        category: "Kitchen table",
        notes: "www.google.com",
        userID: "PRJ001",
      },
    ],
  },
];
const Page = () => {
  const [activeTab, setActiveTab] = useState(clientsData[0].value);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="">
      <Tabs defaultValue={clientsData[0].value} className="w-full">
        <TabsList className="bg-transparent">
          {clientsData.map((client) => {
            return (
              <TabsTrigger
                className="py-0 text-sm data-[state=active]:rounded-none data-[state=active]:border-b-brand data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none "
                value={client.value}
                key={client.name}
                onClick={() => {
                  handleTabChange(client.value);
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <p
                      className={`${activeTab === client.value ? "font-semibold" : ""} text-md `}
                    >
                      {client.name}
                    </p>
                    <Badge
                      className={`${activeTab === client.value ? "bg-brand" : "bg-softDark"} `}
                    >
                      {client.numberOfProjects}
                    </Badge>
                  </div>
                  <div
                    className={`h-[2px] w-8 ${activeTab === client.value ? "bg-brand" : "bg-transparent"} `}
                  ></div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="mx-4 rounded bg-white">
          <TabsContent className="w-full" value={clientsData[0].value}>
            <TotalAccount items={clientsData[0].clients} />
          </TabsContent>
          <TabsContent className="w-full" value={clientsData[1].value}>
            <RunningAccount items={clientsData[1].clients} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;

interface IProfilePicture {
  id: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image: string;
  created_by: number;
}

interface IUserDetails {
  name: string;
  company_name: string | null;
  contact_name: string | null;
  phone: string | null;
  vat: string | null;
  bill_email: string | null;
  mail_address: string | null;
  gender: string;
  about: string | null;
  note: string | null;
  profile_picture: IProfilePicture | null;
}

interface IUser {
  id: number;
  email: string;
  username: string | null;
  user_details: IUserDetails;
  user_type: string;
  project_count: number;
  date_joined: string;
  last_login: string | null;
}

interface ITotalAccountResponse {
  count: number;
  next: string;
  previous: string | null;
  results: IUser[];
}

function TotalAccount({ items }: { items: IItems[] }) {
  const {
    data: clientsData,
    isLoading,
    next,
  } = useAxiosSWR<IUser>(
    apiRoutes.PROTECTED.CLIENTS.LIST({
      limit: 3,
      offset: 0,
      expand: "user_details,user_details.profile_picture",
    }),
  );
  console.log("Data is:", clientsData?.[0]?.user_details.profile_picture);
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold text-black">
            Account Holder
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Account no
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Account Opening Date
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Number of projects
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Category
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Notes
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Start Project
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientsData?.map((client) => {
          // const formattedAccountOpeningDate = format(
          //   new Date(item.accountOpeningDate * 1000),
          //   "dd-MM-yyyy",
          // );
          return (
            <TableRow key={client.id}>
              <TableCell className="text-center font-medium">
                <div className="">
                  <Link href={`clients/${client.id}`} className="flex gap-2">
                    <div className="relative h-12 w-12">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={client?.user_details?.profile_picture?.image}
                        />
                        <AvatarFallback>
                          {getFirstCharCapitalized(client?.user_details?.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-bold hover:text-brand">
                        {client.user_details?.name}
                      </p>
                    </div>
                  </Link>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {client.id}
              </TableCell>
              <TableCell className="text-center">
                {timezoneToDDMMYYYY(client?.date_joined)}
              </TableCell>
              <TableCell className="text-center">
                {client?.project_count}
              </TableCell>
              <TableCell className="text-center">Not Valid</TableCell>
              <TableCell className="text-center">
                {client?.user_details?.note ? (
                  <NoteToolTip notes={client?.user_details?.note} />
                ) : (
                  <Button variant={"ghost"}>
                    <Icons.addNote className="h-6 w-6" />
                  </Button>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  className="border-brand bg-transparent text-brand hover:bg-brand hover:text-white"
                >
                  Start New Project
                </Button>
                {/* </Link> */}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function RunningAccount({ items }: { items: IItems[] }) {
  const {
    data: clientsData,
    isLoading,
    next,
  } = useAxiosSWR<IUser>(
    apiRoutes.PROTECTED.CLIENTS.LIST({
      limit: 3,
      offset: 0,
      status: 1,
      expand: "user_details,user_details.profile_picture",
    }),
  );
  console.log("Running Project Clients:", clientsData);
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold text-black">
            Account Holder
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Account no
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Account Opening Date
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Number of Running projects
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Category
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Notes
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clientsData.map((client) => {
          return (
            <TableRow key={client.id}>
              <TableCell className="text-center font-medium">
                <div className="">
                  <Link href={`clients/${client.id}`} className="flex gap-2">
                    <div className="relative h-12 w-12">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={client?.user_details?.profile_picture?.image}
                        />
                        <AvatarFallback>
                          {getFirstCharCapitalized(
                            client?.user_details?.name || "U",
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-bold hover:text-brand">
                        {client.user_details?.name || "USER NAME NOT SET"}
                      </p>
                    </div>
                  </Link>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {client.id}
              </TableCell>
              <TableCell className="text-center">
                {timezoneToDDMMYYYY(client?.date_joined)}
              </TableCell>
              <TableCell className="text-center">
                {client?.project_count}
              </TableCell>
              <TableCell className="text-center">Not Valid</TableCell>
              <TableCell className="text-center">
                {client?.user_details?.note ? (
                  <NoteToolTip notes={client?.user_details?.note} />
                ) : (
                  <Button variant={"ghost"}>
                    <Icons.addNote className="h-6 w-6" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const NoteToolTip = ({ notes }: { notes?: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"}>
            <Icons.note className="h-6 w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="w-96">
            <p>{notes && notes}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
