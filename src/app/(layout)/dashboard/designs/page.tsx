"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
  IUploadedProject,
  PLACE_HOLDER_IMAGE,
} from "@/config/common";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import { Icons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4">
      <Header />
      <ProjectDetails />
    </div>
  );
};

export default Page;

const Header = () => {
  return (
    <div className="mb-4 flex justify-between">
      <div>
        <h2 className="font-bold">Published Project</h2>
        <div className="mt-1 h-[2px] w-10 bg-brand"></div>
      </div>
      <Link href={"designs/uploadproject"}>
        <Button size={"lg"} className="flex gap-2">
          <Icons.addCircle className="h-4 w-4" />
          <p>Upload New Project</p>
        </Button>
      </Link>
    </div>
  );
};

const ProjectDetails = () => {
  const { data: uploadedProjects, isLoading } = useAxiosSWR<IUploadedProject>(
    apiRoutes.PROTECTED.PUBLISH_PROJECT.LIST({ limit: 10, expand: "images" }),
  );
  console.log("Data is: ", uploadedProjects);
  return (
    <div className="rounded-md bg-white px-4">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-black">
              Projects
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Quantity
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Account Holder
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Project Type
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Total Price
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Duration
            </TableHead>
            {/* <TableHead className="text-center font-bold text-black">
              Update
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {uploadedProjects.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="text-center font-medium">
                  <div className="flex gap-2">
                    <div className="relative h-14 w-14 rounded-md">
                      <Image
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        src={
                          item.images[0]?.image
                            ? item.images[0].image
                            : PLACE_HOLDER_IMAGE
                        }
                        alt="project image"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <p className="font-bold">{item.title}</p>
                      <p>Category: {item.category}</p>
                      <p>Pricing: {item.pricing_type}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="">
                  <div className="flex items-center justify-center gap-2 self-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={PLACE_HOLDER_IMAGE} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <p>THIS IS NOT AVAILBLE</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <p>{item.project_type}</p>
                </TableCell>
                <TableCell className="text-center">
                  <p>${item.price}</p>
                </TableCell>
                <TableCell className="text-center">
                  <p>{item.duration} Days</p>
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`designs/${item.id}`}>
                    <Button variant={"link"}>
                      <p className="font-semibold text-brand underline">
                        Update
                      </p>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
