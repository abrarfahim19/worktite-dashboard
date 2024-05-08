"use client";
import { CustomStatus } from "@/components/customStatus";
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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FieldType {
  value: string;
  label: string;
}
interface IItems {
  name: string;
  projectType: string;
  accountNo: string;
  category: string;
  noOfProjects: number;
  projectStartingDate: number;
  status: string;
  statuses: FieldType[];
  projectImage: string;
  projectID: string;
}

const projectData = [
  {
    name: "Active project",
    value: "active",
    numberOfProjects: 1,
    projects: [
      {
        name: "Project 1",
        projectType: "Hourly",
        accountNo: "#436",
        category: "Kitchen table",
        noOfProjects: 3,
        projectStartingDate: 1710838113,
        status: "Active",
        statuses: [
          {
            value: "Project Start",
            label: "Project Start",
          },
          {
            value: "Project Requirement Analyzed",
            label: "Project Requirement Analyzed",
          },
          {
            value: "Research Started",
            label: "Research Started",
          },
          {
            value: "Technical Development",
            label: "Technical Development",
          },
        ],
        projectImage:
          "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        projectID: "PRJ001",
      },
    ],
  },
  {
    name: "Complete project",
    value: "complete",
    numberOfProjects: 1,
    projects: [
      {
        name: "Project 1",
        projectType: "Hourly",
        accountNo: "#436",
        category: "Kitchen table",
        noOfProjects: 3,
        projectStartingDate: 1710838113,
        status: "Active",
        statuses: [
          {
            value: "Project Start",
            label: "Project Start",
          },
          {
            value: "Project Requirement Analyzed",
            label: "Project Requirement Analyzed",
          },
          {
            value: "Research Started",
            label: "Research Started",
          },
          {
            value: "Technical Development",
            label: "Technical Development",
          },
        ],
        projectImage:
          "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        projectID: "PRJ001",
      },
    ],
  },
  {
    name: "Cancelled project",
    value: "cancelled",
    numberOfProjects: 1,
    projects: [
      {
        name: "Project 1",
        projectType: "Hourly",
        accountNo: "#436",
        category: "Kitchen table",
        noOfProjects: 3,
        projectStartingDate: 1710838113,
        status: "Active",
        statuses: [
          {
            value: "Project Start",
            label: "Project Start",
          },
          {
            value: "Project Requirement Analyzed",
            label: "Project Requirement Analyzed",
          },
          {
            value: "Research Started",
            label: "Research Started",
          },
          {
            value: "Technical Development",
            label: "Technical Development",
          },
        ],
        projectImage:
          "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        projectID: "PRJ001",
      },
    ],
  },
  {
    name: "Pending project",
    value: "pending",
    numberOfProjects: 1,
    projects: [
      {
        name: "Project 1",
        projectType: "Hourly",
        accountNo: "#436",
        category: "Kitchen table",
        noOfProjects: 3,
        projectStartingDate: 1710838113,
        status: "Active",
        statuses: [
          {
            value: "Project Start",
            label: "Project Start",
          },
          {
            value: "Project Requirement Analyzed",
            label: "Project Requirement Analyzed",
          },
          {
            value: "Research Started",
            label: "Research Started",
          },
          {
            value: "Technical Development",
            label: "Technical Development",
          },
        ],
        projectImage:
          "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        projectID: "PRJ001",
      },
    ],
  },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState(projectData[0].value);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-transparent">
          {projectData.map((project) => {
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
                      {project.numberOfProjects}
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
          <TabsContent className="w-full" value={projectData[0].value}>
            <ActiveTableProjects items={projectData[0].projects} />
          </TabsContent>
          <TabsContent className="w-full" value={projectData[1].value}>
            <CompletedTableProjects items={projectData[1].projects} />
          </TabsContent>
          <TabsContent className="w-full" value={projectData[2].value}>
            <TableProjects items={projectData[2].projects} />
          </TabsContent>
          <TabsContent className="w-full" value={projectData[3].value}>
            <TableProjects items={projectData[3].projects} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Page;

function ActiveTableProjects({ items }: { items: IItems[] }) {
  return (
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
            Category
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            No of Projects
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Project starting date
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Status
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Details
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const date = new Date(item.projectStartingDate);

          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
          const year = date.getFullYear();

          const formattedDate = `${day}-${month}-${year}`;
          return (
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
                    <p>Pricing type: {item.projectType}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center font-medium">
                {item.accountNo}
              </TableCell>
              <TableCell className="text-center">{item.category}</TableCell>
              <TableCell className="text-center">{item.noOfProjects}</TableCell>
              <TableCell className="text-center">{formattedDate}</TableCell>
              <TableCell className="text-center">
                <CustomStatus statuses={item.statuses} />
              </TableCell>
              <TableCell className="text-center">
                <Link href={`/dashboard/project/${item.projectID}`}>
                  <Button variant={"link"}>Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function CompletedTableProjects({ items }: { items: IItems[] }) {
  return (
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
            No of Projects
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Total price of the project
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Total time spent
          </TableHead>
          <TableHead className="text-center font-bold text-black"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
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
                  <p>Pricing type: {item.projectType}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center font-medium">
              {item.accountNo}
            </TableCell>
            <TableCell className="text-center">{item.noOfProjects}</TableCell>
            <TableCell className="text-center">
              {item.projectStartingDate}
            </TableCell>
            <TableCell className="text-center">
              {item.projectStartingDate}
            </TableCell>
            <TableCell className="text-center">
              <Link href={`/dashboard/project/${item.projectID}`}>
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="border-brand text-brand"
                >
                  Publish
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
function TableProjects({ items }: { items: IItems[] }) {
  return (
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
            Category
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            No of Projects
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Project starting date
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Status
          </TableHead>
          <TableHead className="text-center font-bold text-black">
            Details
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
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
                  <p>Pricing type: {item.projectType}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center font-medium">
              {item.accountNo}
            </TableCell>
            <TableCell className="text-center">{item.category}</TableCell>
            <TableCell className="text-center">{item.noOfProjects}</TableCell>
            <TableCell className="text-center">
              {item.projectStartingDate}
            </TableCell>
            <TableCell className="text-center">
              {item.projectStartingDate}
            </TableCell>
            <TableCell className="text-center">
              <Link href={`/dashboard/project/${item.projectID}`}>
                <Button variant={"link"}>Details</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
