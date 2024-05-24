"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRoutes } from "@/config/common";
import useDataFetch from "@/hooks/useDataFetch";
import { Icons } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IUser } from "../../clients/[slug]/page";
import { imageUpload, putProfileData } from "../manager/manager";

const Page = () => {
  const { data: completeUserData } = useDataFetch<IUser>(
    apiRoutes.AUTH.USER_PROFILE({
      expand: "user_details,user_details.profile_picture",
    }),
  );
  return (
    <div className="p-4">
      <BreadcrumbMenu />
      <CoverPhoto
        coverPhoto={completeUserData?.user_details?.cover_picture?.image || ""}
      />
      <ProfilePhoto
        profilePhoto={
          completeUserData?.user_details?.profile_picture?.image || ""
        }
      />
      {completeUserData && (
        <ProfileDetails profileData={completeUserData || {}} />
      )}
    </div>
  );
};

export default Page;

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

interface CoverPhotoProps {
  coverPhoto: string;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({ coverPhoto }) => {
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const coverPhotoUploadHandler = async () => {
    if (acceptedFiles.length === 0) {
      toast.error("Nothing to upload!", {
        position: "top-right",
      });
    } else {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);
      const imageID = await imageUpload(formData);
      await putProfileData({ cover_picture: imageID });
    }
  };
  return (
    <div className="mt-4 w-full">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="absolute z-10 flex h-[250px] w-[1000px] items-center justify-center bg-black bg-opacity-10"
      >
        <input {...getInputProps()} />
        <Icons.upload className="m-auto" />
      </div>
      <div className="relative h-[250px] w-[1000px] rounded-lg border-2 border-brand">
        <Image
          src={files[0]?.preview ? files[0].preview : coverPhoto}
          fill={true}
          alt="Cover Photo"
          objectFit="cover"
        />
      </div>
      <Button
        variant={"outline"}
        className="my-4 border-brand bg-transparent text-brand"
        onClick={coverPhotoUploadHandler}
      >
        Update Cover Photo
      </Button>
    </div>
  );
};

interface ProfilePhotoProps {
  profilePhoto: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ profilePhoto }) => {
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  // console.log("Files are", files);
  return (
    <div className="w-full">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="absolute z-10 flex h-36 w-36 items-center justify-center rounded-full bg-black bg-opacity-10"
      >
        <input {...getInputProps()} />
        <Icons.upload className="m-auto" />
      </div>
      <div className="my-4">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-brand">
          <div className="flex h-[138px] w-[138px] items-center justify-center rounded-full bg-white">
            <Avatar className="h-[134px] w-[134px]">
              <AvatarImage
                src={files[0]?.preview ? files[0].preview : profilePhoto}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      <Button
        variant={"outline"}
        className="my-4 border-brand bg-transparent text-brand"
      >
        Update Profile Picture
      </Button>
    </div>
  );
};

const FormSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  position: z.string().min(3, "Position is too short"),
  email: z.string().email(),
  phone: z.string().min(3, "Phone number is too short"),
  location: z.string().min(3, "Location is too short"),
  about: z.string().min(3, "About is too short"),
});

interface ProfileDetailsProps {
  profileData: IUser;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profileData }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: profileData?.user_details?.name || "",
      position: profileData?.user_type || "",
      email: profileData?.email || "",
      phone: profileData?.user_details?.phone || "",
      location: profileData?.user_details?.mail_address || "",
      about: profileData?.user_details?.about || "",
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="mt-4">
      <p className="mb-2 font-semibold">Profile Details</p>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mb-3 grid grid-cols-2 gap-x-4 gap-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="border-2 border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Position"
                      {...field}
                      className="border-2 border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="border-2 border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      {...field}
                      className="border-2 border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Location of User"
                      {...field}
                      className="border-2 border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>About Me</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="About Me"
                      {...field}
                      className="border-2 border-black bg-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-6">
              <Button
                type="submit"
                variant={"outline"}
                size={"lg"}
                className="border-brand bg-transparent text-brand"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
