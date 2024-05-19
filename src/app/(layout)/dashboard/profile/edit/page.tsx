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
import { Icons } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Page = () => {
  return (
    <div className="p-4">
      <BreadcrumbMenu />
      <ProfilePhoto />
      <ProfileDetails />
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
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
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

  console.log("Files are", files);
  return (
    <div className="w-full">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="absolute z-10 flex h-36 w-36 items-center justify-center rounded-full bg-black bg-opacity-10"
      >
        <input {...getInputProps()} />
        <Icons.upload className="m-auto" />
      </div>
      <div className="my-10">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-brand">
          <div className="flex h-[138px] w-[138px] items-center justify-center rounded-full bg-white">
            <Avatar className="h-[134px] w-[134px]">
              <AvatarImage
                src={
                  files[0]?.preview ? files[0].preview : userData.profilePhoto
                }
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
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

const ProfileDetails = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      position: "",
      email: "",
      phone: "",
      location: "",
      about: "",
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
