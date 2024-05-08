import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { formatTime, Icons, truncateText } from "@/lib/utils";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4">
      <MessageHeader />
      <div className="mt-4 grid grid-cols-4 gap-2">
        <div className="col-span-1 rounded-md bg-white p-2">
          <MessageSideBar />
        </div>
        <div className="col-span-3 rounded-md bg-white p-2">
          <MessageBodySection />
        </div>
      </div>
    </div>
  );
};

export default Page;

const messageHeaderData = {
  numberOfUnreadMessages: 3,
};

const MessageHeader = () => {
  return (
    <div className="relative">
      <Button variant={"link"} className="ml-0 w-20 pl-0 font-bold text-black">
        Message
      </Button>
      <Badge>{messageHeaderData.numberOfUnreadMessages}</Badge>
      <div className="absolute left-[2px] top-[35px] h-[2px] w-8 bg-brand"></div>
    </div>
  );
};

const MessageSideBar = () => {
  return (
    <div className="">
      <MessageSearch />
      <MessageList />
    </div>
  );
};

const MessageBodySection = () => {
  return (
    <div>
      <MessageBody />
    </div>
  );
};

const MessageSearch = () => {
  return (
    <div className="flex h-12 items-center justify-start gap-2 self-center rounded-sm border-[1px] border-gray-600 p-2">
      <Icons.search className="ml-2 h-6 w-6" />
      <Input
        className="my-2 w-full border-0 bg-transparent pl-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        placeholder="Search Messages..."
      />
    </div>
  );
};

const messageListData = {
  messages: [
    {
      id: 1,
      name: "John Doe",
      message: "Hello",
      time: 1710838113,
      profileImage: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      name: "Jane Doe",
      message: "Hi",
      time: 1710838113,
      profileImage: "https://github.com/shadcn.png",
    },
    {
      id: 3,
      name: "John Doe John Doe John Doe",
      message: "Hello",
      time: 1710838113,
      profileImage: "https://github.com/shadcn.png",
    },
  ],
};

const MessageList = () => {
  return (
    <div className="mt-4 ">
      {messageListData.messages.map((userData) => (
        <MessageListItem key={userData.id} user={userData} />
      ))}
    </div>
  );
};

interface MessageListUser {
  name: string;
  message: string;
  time: number;
  profileImage: string;
}
interface MessageListItemProps {
  user: MessageListUser;
}
const MessageListItem: React.FC<MessageListItemProps> = ({ user }) => {
  const timeString = formatTime(user.time);
  return (
    <div className="flex h-16 w-full items-center rounded-md hover:bg-brand active:bg-brand">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex h-full w-full ">
          <div className="mx-2 self-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.profileImage} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="truncate font-semibold">
              {truncateText(user.name, 15)}
            </p>
            <p>{user.message}</p>
          </div>
        </div>
        <div className="flex h-full w-10 items-end">
          <p>{timeString}</p>
        </div>
      </div>
    </div>
  );
};

const messageBodyData = {
  metaData: [
    {
      user: {
        userId: "adfkbnci24",
        userName: "John Doe",
        activeStatus: true,
        userImage: "https://github.com/shadcn.png",
      },
    },
  ],
  messages: [
    {
      id: 1,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 2,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 3,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 4,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 5,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 4,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 5,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 4,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 5,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 4,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 5,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 4,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 5,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 4,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 5,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
    {
      id: 4,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "abcdefg",
      receiverId: "adfkbnci24",
    },
    {
      id: 5,
      message: "Hello Sam! Good to see you!",
      time: 1710838113,
      senderId: "adfkbnci24",
      receiverId: "abcdefg",
    },
  ],
};

const MessageBody = () => {
  return (
    <div className="flex h-full w-full flex-col ">
      <MessageBodyHeader />
      <MessageBodyChat />
      <MessageBodyFooter />
    </div>
  );
};

const DropDownMenuItem = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icons.threeMenuDot className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>View Profile</DropdownMenuItem>
        <DropdownMenuItem>Mark as Unread</DropdownMenuItem>
        <DropdownMenuItem>Mute Notification</DropdownMenuItem>
        <DropdownMenuItem>Delete Chat</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const MessageBodyHeader = () => {
  return (
    <div>
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex h-full w-full items-center">
          <div className="mx-2 self-center">
            {/* <Avatar className="h-10 w-10">
            <AvatarImage src={messageBodyData.metaData[0].user.userImage} />
            <AvatarFallback></AvatarFallback>
          </Avatar> */}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="truncate font-semibold">
              {truncateText(messageBodyData.metaData[0].user.userName, 15)}
            </p>
            <div className="flex items-center gap-1">
              <div
                className={`h-2 w-2 rounded-full ${messageBodyData.metaData[0].user.activeStatus ? "bg-green-600" : "bg-gray-400"} bg-brand`}
              ></div>
              <p className="text-xs ">
                {messageBodyData.metaData[0].user.activeStatus
                  ? "Active Now"
                  : "Offline"}
              </p>
            </div>
          </div>
        </div>
        {/* <PlainCombobox combobox={combobox} /> */}
        <DropDownMenuItem />
      </div>
      <hr />
    </div>
  );
};

const MessageBodyChat = () => {
  return (
    <div className="mt-4 flex h-full max-h-96 w-full flex-col overflow-auto">
      {messageBodyData.messages.map((message) => (
        <MessageBodyChatItem key={message.id} message={message} />
      ))}
    </div>
  );
};

interface MessageBodyChatItemInterface {
  message: {
    id: number;
    message: string;
    time: number;
    senderId: string;
    receiverId: string;
  };
}

const MessageBodyChatItem: React.FC<MessageBodyChatItemInterface> = ({
  message,
}) => {
  const receivedMessage = message.senderId === "adfkbnci24";
  return (
    <div>
      <div>
        {/* <p>{receivedMessage ? "Received" : "Sent"}</p>
        <p>{message.time}</p> */}
      </div>
      <div
        className={`w-ful flex gap-2 ${receivedMessage ? " " : "justify-end"}`}
      >
        {receivedMessage && (
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={messageBodyData.metaData[0].user.userImage} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        )}
        <div
          className={`${receivedMessage ? "bg-gray-200" : "bg-brand"} rounded-md p-4`}
        >
          <p className={`${receivedMessage ? "text-black" : "text-white"}`}>
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

const MessageBodyFooter = () => {
  return (
    <div className="mt-4">
      <div className="flex h-12 items-center justify-start gap-2 self-center rounded-sm border-[1px] border-gray-600 p-2">
        <Input
          className="my-2 w-full border-0 bg-transparent pl-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder="Type your message..."
        />
      </div>
      <hr className="my-4" />
      <div className="mb-4 ml-4 flex gap-4">
        <button>
          <Icons.microphone className="h-6 w-6" />
        </button>
        <button>
          <Icons.emojie className="h-6 w-6" />
        </button>
        <button>
          <Icons.imageChat className="h-6 w-6" />
        </button>
        <Link href={"message/createOffer"}>
          <Button
            variant={"outline"}
            className="h-12 rounded-sm border-brand text-brand"
          >
            Create an Offer
          </Button>
        </Link>
      </div>
    </div>
  );
};
