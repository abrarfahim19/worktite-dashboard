import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="px-4">
      <ProfileHeader />
      <CoverPhoto />
      <div className="flex">
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default Page;

const ProfileHeader = () => {
  return (
    <div className="relative">
      <p className="w-20 text-sm font-bold text-black">Profile</p>
      <div className="absolute top-[25px] h-[2px] w-6 bg-brand"></div>
    </div>
  );
};

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

const CoverPhoto = () => {
  return (
    <div className="container absolute -z-10 mt-4 h-52 w-[1065px] overflow-hidden rounded-md border-[1px] border-black">
      <Image
        src={userData.coverPhoto}
        fill={true}
        alt="Cover Photo"
        objectFit="cover"
      />
    </div>
  );
};

const ProfilePhoto = () => {
  return (
    <div className="z-10 ">
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

const LeftSection = () => {
  return (
    <div className="mt-36 flex w-[300px] flex-col items-center">
      <ProfilePhoto />
      <p className="mt-2 text-xl font-bold">{userData.name}</p>
      <p className="text-md mt-1">{userData.role}</p>
      <p className="mt-1 text-sm">{userData.phone}</p>
      <Link href={"profile/edit"}>
        <Button
          variant={"outline"}
          size={"lg"}
          className="mt-4 border-brand bg-transparent text-brand"
        >
          Edit Profile
        </Button>
      </Link>
      <p className="mt-6 font-semibold">About Me</p>
      <p className="mt-2 text-center text-sm">{userData.about}</p>
      <SocialMediaIcons />
    </div>
  );
};

const SocialMediaIcons = () => {
  return (
    <div className="my-4 flex gap-4">
      <Link href={userData.social.likedIn}>
        <Icons.linkedIn className="h-6 w-6" />
      </Link>
      <Link href={userData.social.twitter}>
        <Icons.twitter className="h-6 w-6" />
      </Link>
      <Link href={userData.social.email}>
        <Icons.mail className="h-6 w-6" />
      </Link>
      <Link href={userData.social.website}>
        <Icons.website className="h-6 w-6" />
      </Link>
    </div>
  );
};

const AllProjects = () => {
  return (
    <div className="mt-4 rounded-md p-4">
      <p className="mb-3 font-semibold">All Projects</p>
      <div className="grid grid-cols-1 gap-4">
        {userData.runningProjects.map((project) => {
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

const RightSection = () => {
  return (
    <div className="mt-56">
      <AllProjects />
    </div>
  );
};
