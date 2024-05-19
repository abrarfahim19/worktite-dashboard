"use client";

import { IUser } from "@/app/(layout)/dashboard/clients/[slug]/page";
import { apiRoutes } from "@/config/common";
import useDataFetch from "@/hooks/useDataFetch";
import { getUserData } from "@/lib/authLib";
import { Icons } from "@/lib/utils";
import { format } from "date-fns";
import { JWTPayload } from "jose";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const TopBarData = {
  numberOfAppointments: 5,
  currentDate: 1710838113,
  numberOfNotification: 3,
  userName: "John Doe",
  userImage: "https://github.com/shadcn.png",
};

export const TopBar = () => {
  const [userData, setUserData] = useState<JWTPayload | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchData();
  }, []);
  console.log("User Data is: ", userData);
  const { data: completeUserData } = useDataFetch<IUser>(
    apiRoutes.AUTH.USER_PROFILE({
      expand: "user_details,user_details.profile_picture",
    }),
  );
  console.log("Complete User Data is: ", completeUserData);
  const date = new Date(Number(TopBarData.currentDate) * 1000);
  const formattedDate = format(date, "h:mm a dd MMM yyyy");
  return (
    <div className="grid h-[100px] w-full grid-cols-3 justify-between p-4">
      <div className="col-span-1 flex flex-col justify-center">
        <h1 className="text-xl font-semibold">
          You have {TopBarData.numberOfAppointments} new appointments
        </h1>
        <p className="text-gray-700">{formattedDate}</p>
      </div>
      <div className="col-span-1 ml-8 flex h-12 items-center justify-start gap-2 self-center rounded-sm border-[1px] border-gray-600 p-2">
        <Icons.search className="ml-2 h-6 w-6" />
        <Input
          className="my-2 w-full border-0 bg-brandBackground pl-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder="Search..."
        />
      </div>
      <div className="col-span-1 flex items-center justify-end gap-6">
        <div className="relative">
          <Link href={"/dashboard/notification"}>
            <Button variant={"ghost"}>
              <Icons.bell className="h-6 w-6" />
              <Badge className="absolute right-[-1px] top-[-1px] rounded-full">
                {TopBarData.numberOfNotification}
              </Badge>
            </Button>
          </Link>
        </div>
        <Link href={"/dashboard/profile"}>
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={completeUserData?.user_details?.profile_picture?.image}
              />
              <AvatarFallback>
                {completeUserData?.user_details?.name}
              </AvatarFallback>
            </Avatar>
            <p className="text-xl font-semibold">
              {completeUserData?.user_details?.name}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
