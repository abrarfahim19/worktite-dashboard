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
import { Icons } from "@/lib/utils";
import { differenceInDays } from "date-fns";
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

const publishedProjects = [
  {
    name: "Chesterfield Table",
    projectImage:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Kitchen table",
    pricingType: "Hourly",
    quantity: 4,
    accountHolderImage:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    accountHolder: "Jane Cooper",
    projectType: "Simple",
    pricing: 15,
    projectDuration: 1710838113 - 1710838013,
    projectID: "PRJ001",
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
          {publishedProjects.map((item) => {
            const timestamp = item.projectDuration;
            const days = Math.floor(timestamp / (24 * 60 * 60));
            const hours = Math.floor((timestamp % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((timestamp % (60 * 60)) / 60);
            const seconds = timestamp % 60;

            const duration = `${days}d-${hours}h-${minutes}m-${seconds}s`;
            return (
              <TableRow key={item.projectID}>
                <TableCell className="text-center font-medium">
                  <div className="flex gap-2">
                    <div className="relative h-14 w-14 rounded-md">
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
                      <p>Category: {item.category}</p>
                      <p>Pricing Type: {item.pricingType}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="">
                  <div className="flex items-center justify-center gap-2 self-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.accountHolderImage} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <p>{item.accountHolder}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <p>{item.projectType}</p>
                </TableCell>
                <TableCell className="text-center">
                  <p>Per hour: ${item.pricing}</p>
                </TableCell>
                <TableCell className="text-center">
                  <p>
                    {differenceInDays(new Date(), item.projectDuration * 1000)}
                  </p>
                </TableCell>
                <TableCell className="text-center">
                  <Button variant={"link"}>
                    <p className="font-semibold text-brand underline">Update</p>
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
