import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2">
          <LeftBar />
        </div>
        <div className="col-span-3">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Page;

const userData = {
  name: "Sergio Daughtry",
  email: "example@gmail.com",
  imageUrl: "https://github.com/shadcn.png",
  gender: "male",
  contactNumber: "0123213",
  companyName: "Company Name",
  vatNumber: "VAT123",
  contactName: "Contact Name",
  billingEmail: "example@gmail.com",
  billingAddress: "Billing Address",
  mailingAddress: "Mailing Address",
};

const LeftBar = () => {
  return (
    <div className="rounded-lg bg-white p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-32 w-32 items-center justify-center rounded-full ring-2 ring-brand">
          <Avatar className="h-28 w-28 ">
            <AvatarImage src={userData.imageUrl} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold">{userData.name}</p>
          <p className="text-sm">{userData.email}</p>
        </div>
        <Button
          size={"lg"}
          variant={"outline"}
          className="border-brand text-brand"
        >
          Send Message
        </Button>
      </div>
      <div className="mb-10 ml-2 mt-8 grid grid-cols-7 gap-y-3">
        <p className="col-span-3">Gender</p>
        <p className="col-span-4">{userData.gender}</p>
        <p className="col-span-3">Contact Number</p>
        <p className="col-span-4">{userData.contactNumber}</p>
        <p className="col-span-3">Company Name</p>
        <p className="col-span-4">{userData.companyName}</p>
        <p className="col-span-3">Vat Number </p>
        <p className="col-span-4">{userData.vatNumber}</p>
        <p className="col-span-3">Contact Name</p>
        <p className="col-span-4">{userData.contactName}</p>
        <p className="col-span-3">Billing e-mail</p>
        <p className="col-span-4">{userData.billingEmail}</p>
        <p className="col-span-3">Billing address</p>
        <p className="col-span-4">{userData.billingAddress}</p>
        <p className="col-span-3">Mailing address (if different)</p>
        <p className="col-span-4">{userData.mailingAddress}</p>
      </div>
    </div>
  );
};

const RightBar = () => {
  return (
    <div className="rounded-lg p-4 ">
      <Button
        variant={"outline"}
        size={"lg"}
        className="border-brand bg-transparent"
      >
        <Icons.addNote className="h-5 w-5" />
        <p className="text-brand">Add Note</p>
      </Button>
      <ClientNote />
      <AllProjects />
    </div>
  );
};

const clientNoteData = {
  id: 1,
  date: 1713972946,
  title: "Summery",
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
};

const ClientNote = () => {
  return (
    <div className="mt-4 rounded-md bg-white p-4">
      <p className="font-semibold">Client Note</p>
      <div className="my-2 flex justify-between">
        <p>{clientNoteData.title}</p>
        <p>{clientNoteData.date}</p>
      </div>
      <p className="text-justify">{clientNoteData.description}</p>
    </div>
  );
};

const projects = [
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
];

const AllProjects = () => {
  return (
    <div className="mt-4 rounded-md p-4">
      <p className="mb-3 font-semibold">All Projects</p>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => {
          return <ProjectCard key={project.id} {...project} />;
        })}
      </div>
    </div>
  );
};

interface IProject {
  id: number;
  name: string;
  price: number;
  duration: number;
  startDate: number;
  status: string;
  imageUrl: string;
  priceType: string;
}

const ProjectCard: React.FC<IProject> = ({
  id,
  name,
  price,
  duration,
  startDate,
  status,
  imageUrl,
  priceType,
}: IProject) => {
  return (
    <div className="grid w-full grid-cols-4 gap-2 rounded-md bg-white p-4">
      <div className="relative col-span-1 rounded-md">
        <Image
          layout="fill"
          // objectFit={"cover"}
          quality={100}
          src={imageUrl}
          alt="project image"
        />
      </div>
      <div className="col-span-2">
        <p className="font-semibold">Title: {name}</p>
        <p className="">Price: {priceType}</p>
        <p className="">Duration: {duration}</p>
        <p className="">Start date: {duration}</p>
        <p className="">Project status: {status}</p>
      </div>
      <div className="col-span-1 flex items-end justify-end pb-2">
        <Link href={"/dashboard/project/1234"}>
          <Button
            variant={"link"}
            size={"lg"}
            className="border-brand bg-transparent"
          >
            <p className="font-semibold text-brand underline">Project Page</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};
