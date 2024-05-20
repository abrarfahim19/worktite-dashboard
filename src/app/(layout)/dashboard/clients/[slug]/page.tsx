"use client";

import {
  apiRoutes,
  getFirstCharCapitalized,
  PLACE_HOLDER_IMAGE,
} from "@/config/common";
import { timezoneToDDMMYYYY } from "@/config/common/timeFunctions";
import { useAxiosSWR } from "@/hooks/useAxiosSwr";
import useDataFetch from "@/hooks/useDataFetch";
import { Icons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";

export interface IProfilePicture {
  id: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image: string;
  created_by: number;
}

interface IUserDetails {
  name?: string;
  company_name?: string;
  contact_name?: string;
  phone?: string;
  vat?: string;
  bill_email?: string;
  mail_address?: string;
  gender?: string;
  about?: string;
  note?: string;
  profile_picture?: IProfilePicture;
}

export interface IUser {
  id?: number;
  email?: string;
  username?: string | null;
  user_details?: IUserDetails;
  user_type?: string;
  project_count?: number;
  date_joined?: string;
  last_login?: string | null;
}

const Page = () => {
  const pathName = usePathname();
  const userID = pathName.split("/")[3];
  const { data: clientData, isLoading } = useDataFetch<IUser>(
    apiRoutes.PROTECTED.CLIENTS.CLIENT.GET(userID)({
      expand: "user_details,user_details.profile_picture",
    }),
  );
  console.log("The client Data is: ", clientData);
  return (
    <div className="p-4">
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2">
          <LeftBar {...clientData} />
        </div>
        <div className="col-span-3">
          <RightBar {...clientData?.user_details} />
        </div>
      </div>
    </div>
  );
};

export default Page;

const LeftBar: React.FC<IUser> = ({ email, user_details }) => {
  return (
    <div className="rounded-lg bg-white p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-32 w-32 items-center justify-center rounded-full ring-2 ring-brand">
          <Avatar className="h-28 w-28 ">
            <AvatarImage src={user_details?.profile_picture?.image} />
            <AvatarFallback>
              {getFirstCharCapitalized(
                user_details?.name ? user_details?.name : "U",
              )}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold">{user_details?.name}</p>
          <p className="text-sm">{email}</p>
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
        <p className="col-span-4">{user_details?.gender}</p>
        <p className="col-span-3">Contact Number</p>
        <p className="col-span-4">{user_details?.phone}</p>
        <p className="col-span-3">Company Name</p>
        <p className="col-span-4">{user_details?.company_name}</p>
        <p className="col-span-3">Vat Number </p>
        <p className="col-span-4">{user_details?.vat}</p>
        <p className="col-span-3">Contact Name</p>
        <p className="col-span-4">{user_details?.contact_name}</p>
        <p className="col-span-3">Billing e-mail</p>
        <p className="col-span-4">{user_details?.bill_email}</p>
        <p className="col-span-3">Billing address</p>
        <p className="col-span-4">{user_details?.mail_address}</p>
        <p className="col-span-3">Mailing address (if different)</p>
        <p className="col-span-4">{user_details?.mail_address}</p>
      </div>
    </div>
  );
};

interface INote {
  note?: string;
}

const RightBar: React.FC<INote> = ({ note }) => {
  return (
    <div className="rounded-lg px-4">
      {note ? (
        <ClientNote note={note} />
      ) : (
        <Button
          variant={"outline"}
          size={"lg"}
          className="border-brand bg-transparent"
        >
          <Icons.addNote className="h-5 w-5" />
          <p className="text-brand">Add Note</p>
        </Button>
      )}
      <AllProjects />
    </div>
  );
};

const ClientNote = ({ note }: { note: string }) => {
  return (
    <div className="rounded-md bg-white p-4">
      <p className="font-semibold">Client Note</p>
      <div className="my-2 flex justify-between">
        <p className="font-semibold">Summery</p>
        <p>Date is not found</p>
      </div>
      <p className="text-justify">{note}</p>
    </div>
  );
};

const AllProjects = () => {
  const { data: projectsData, isLoading } = useAxiosSWR(
    apiRoutes.PROTECTED.PROJECTS.LIST({ limit: 10, client: 3 }),
  );
  console.log("Project Data", projectsData);
  return (
    <div className="mt-4 rounded-md py-4">
      <p className="mb-3 font-semibold">All Projects</p>
      <div className="grid grid-cols-1 gap-4">
        {projectsData.map((project) => {
          return <ProjectCard key={project.id} {...project} />;
        })}
      </div>
    </div>
  );
};

interface IImage {
  id: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image: string;
  created_by: number;
}

interface IProject {
  id: number;
  pricing_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  started_at: string;
  ended_at: string;
  title: string;
  description: string;
  price: string;
  created_by: number;
  category: number;
  client: number;
  image: IImage;
}

const ProjectCard: React.FC<IProject> = ({
  id,
  title,
  price,
  created_at,
  status,
  image,
  pricing_type,
}: IProject) => {
  return (
    <div className="grid w-full grid-cols-4 gap-2 rounded-md bg-white p-4">
      <div className="relative col-span-1 rounded-md">
        <Image
          layout="fill"
          // objectFit={"cover"}
          quality={100}
          src={image?.image ? image.image : PLACE_HOLDER_IMAGE}
          alt="project image"
        />
      </div>
      <div className="col-span-2">
        <p className="font-semibold">Title: {title}</p>
        <p className="">Price: {pricing_type}</p>
        <p className="">Duration: Duration Needed</p>
        <p className="">Start date: {timezoneToDDMMYYYY(created_at)}</p>
        <p className="">Project status: {status}</p>
      </div>
      <div className="col-span-1 flex items-end justify-end pb-2">
        <Link href={`/dashboard/project/${id}`}>
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
