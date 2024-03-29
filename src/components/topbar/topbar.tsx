import { Icons } from "@/lib/utils";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
const TopBarData = {
  numberOfAppointments: 5,
  currentDate: 1710838113,
  numberOfNotification: 3,
  userName: "John Doe",
  userImage: "https://github.com/shadcn.png",
};
export const TopBar = () => {
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
          <Icons.bell className="h-6 w-6" />
          <Badge className="absolute right-[-8px] top-[-8px] rounded-full">
            {TopBarData.numberOfNotification}
          </Badge>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={TopBarData.userImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-xl font-semibold">{TopBarData.userName}</p>
      </div>
    </div>
  );
};
