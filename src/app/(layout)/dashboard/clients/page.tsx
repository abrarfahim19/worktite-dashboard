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
          {clientsData.map((client) => {
            return (
              <TabsContent
                className="w-full"
                value={client.value}
                key={client.name}
              >
                <TableProjects items={client.clients} />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};

export default Page;

function TableProjects({ items }: { items: IItems[] }) {
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
        {items.map((item) => {
          const formattedAccountOpeningDate = format(
            new Date(item.accountOpeningDate * 1000),
            "dd-MM-yyyy",
          );
          return (
            <TableRow key={item.accountNo}>
              <TableCell className="text-center font-medium">
                <div className="">
                  <Link href={"clients/1234"} className="flex gap-2">
                    <div className="relative h-12 w-12">
                      <Image
                        layout="fill"
                        // objectFit="cover"
                        style={{ borderRadius: "50%" }}
                        quality={100}
                        src={item.profileImage}
                        alt="project image"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-bold hover:text-brand">{item.name}</p>
                    </div>
                  </Link>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {item.accountNo}
              </TableCell>
              <TableCell className="text-center">
                {formattedAccountOpeningDate}
              </TableCell>
              <TableCell className="text-center">{item.noOfProjects}</TableCell>
              <TableCell className="text-center">{item.category}</TableCell>
              <TableCell className="text-center">
                <Button variant={"ghost"}>
                  <Icons.note className="h-6 w-6" />
                </Button>
                {/* {item.notes} */}
              </TableCell>
              <TableCell className="text-center">
                {/* <Link href={`/dashboard/project/${item.projectID}`}> */}
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
