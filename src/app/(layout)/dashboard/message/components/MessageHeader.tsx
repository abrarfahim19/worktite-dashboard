import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
const messageHeaderData = {
    numberOfUnreadMessages: 3,
};
export const MessageHeader = () => {
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
