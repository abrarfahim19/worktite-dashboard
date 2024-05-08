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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4">
      <BreadcrumbMenu />
      <ProfilePhoto />
      <ProjectDetails />
    </div>
  );
};

export default Page;

const userData = {
  name: "John Doe",
  about:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  coverPhoto:
    "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  profilePhoto:
    "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  role: "Admin",
  phone: "+1234567890",
  social: {
    likedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "john@email.com",
    website: "",
  },
  runningProjects: [
    {
      id: 1,
      name: "Project Name",
      price: 1000,
      priceType: "Hourly",
      duration: 10,
      startDate: 1713972946,
      status: "completed",
      imageUrl:
        "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "Project Name",
      price: 1000,
      priceType: "Hourly",
      duration: 10,
      startDate: 1713972946,
      status: "Running",
      imageUrl:
        "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      name: "Project Name",
      price: 1000,
      priceType: "Hourly",
      duration: 10,
      startDate: 1713972946,
      status: "Running",
      imageUrl:
        "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ],
};

const BreadcrumbMenu = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/dashboard/profile">
              <p>Profile</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <p className="font-semibold">Edit Profile</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const ProfilePhoto = () => {
  return (
    <div className="z-10 my-10">
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-brand">
        <div className="flex h-[138px] w-[138px] items-center justify-center rounded-full bg-white">
          <Avatar className="h-[134px] w-[134px]">
            <AvatarImage src={userData.profilePhoto} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  return (
    <div className="mt-4">
      <p className="mb-2 font-semibold">Profile Details</p>
      <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Name"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="position">Position</Label>
          <Input
            type="text"
            id="position"
            placeholder="Position"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="mail">E-mail</Label>
          <Input
            type="text"
            id="mail"
            placeholder="Email"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="text"
            id="phone"
            placeholder="Phone Number"
            className="border-2 border-black"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            id="location"
            placeholder="Location of User"
            className="border-2 border-black"
          />
        </div>
      </div>
      <Label htmlFor="about">About Me</Label>
      <Textarea id="about" className="border-2 border-black bg-transparent" />
      <div className="mt-6">
        <Button
          variant={"outline"}
          size={"lg"}
          className="border-brand bg-transparent text-brand"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};
