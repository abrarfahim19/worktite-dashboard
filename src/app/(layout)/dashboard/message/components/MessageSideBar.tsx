"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {
    apiRoutes,
    debounce, debounce2,
    decodeDataFromBase64,
    encodeDataToBase64,
    frontendLinks
} from "@/config/common";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import {cn, Icons, truncateText} from "@/lib/utils";
import {formatDate} from "date-fns";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";


interface MessageListUser {
    sender: {
        name: string;
        email: string;
        time: number;
        profileImage: string;
    };
    receiver: {
        name: string;
        email: string;
        time: number;
        profileImage: string;
    };
    id: number;
    created_at: string;
}

interface MessageListItemProps {
    user: MessageListUser;
}

export const MessageSideBar = () => {
    const [searchString, setSearchString] = useState("");
    return (
        <div className="">
            <MessageSearch searchString={searchString} setSearchString={setSearchString}/>
            <MessageList searchString={searchString}/>
        </div>
    );
};

const MessageSearch = ({searchString, setSearchString}: {
    searchString: string,
    setSearchString: any
}) => {
    return (
        <div
            className="flex h-12 items-center justify-start gap-2 self-center rounded-sm border-[1px] border-gray-600 p-2">
            <Icons.search className="ml-2 h-6 w-6"/>
            <Input
                onChange={debounce2((e) => setSearchString(e.target.value), 500)}
                className="my-2 w-full border-0 bg-transparent pl-0 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                placeholder="Search Messages..."
            />
        </div>
    );
};


const MessageList = ({searchString}: { searchString?: string }) => {
    const {data: chats} = useAxiosSWR(apiRoutes.PROTECTED.GENERAL.CHAT.LIST({
        limit: 10,
        expand: 'receiver',
        receiver_email: searchString
    }))
    return (
        <div className="mt-4 ">
            {chats.map((userData) => (
                <MessageListItem key={userData.id} user={userData}/>
            ))}
        </div>
    );
};

const MessageListItem: React.FC<MessageListItemProps> = ({user}) => {
    const timeString = formatDate(new Date(user.created_at), "hh/mm");
    const searchParams = useSearchParams()
    const chatId = decodeDataFromBase64(searchParams.get("chat") || "")?.id || 0
    const encodedUrl = encodeDataToBase64(user)


    return (
        <Link href={frontendLinks.PRIVATE.CHAT(encodedUrl)}>
            <div aria-checked={user?.id == chatId}
                 className={cn("flex my-1.5 h-16 w-full items-center rounded-md hover:bg-brand ", user?.id == chatId && "bg-brand")}>
                <div className="flex h-full cursor-pointer w-full items-center justify-between">
                    <div className="flex h-full w-full ">
                        <div className="mx-2 cursor-pointer self-center">
                            <Avatar className="h-10 cursor-pointer w-10">
                                <AvatarImage src={user?.receiver?.profileImage}/>
                                <AvatarFallback></AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex flex-col items-start cursor-pointer justify-center">
                            <p className="truncate cursor-pointer font-semibold">
                                {truncateText(user?.receiver?.email, 15)}
                            </p>
                            {/*<p>{user?.message}</p>*/}
                        </div>
                    </div>
                    <div className="flex h-full cursor-pointer items-end">
                        <span>{timeString}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
