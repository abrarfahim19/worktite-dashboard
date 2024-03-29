import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/utils";

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
  return <div>Message Body Section</div>;
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

const MessageList = () => {
  return <div>MessageList</div>;
};
