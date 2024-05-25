"use client";
import {createChat} from "@/app/(layout)/dashboard/calender/manager";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import {apiRoutes, convertTo12Hour, encodeDataToBase64, frontendLinks, getFirstCharCapitalized} from "@/config/common";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import useDataFetch from "@/hooks/useDataFetch";
import {Icons} from "@/lib/utils";
import {useRouter} from "next/navigation";

interface ISlot {
    id: number;
    created_at: string;
    updated_at: string;
    start_at: string;
    end_at: string;
    created_by: number;
}


interface IProfilePicture {
    id: number;
    thumbnail: string;
    created_at: string;
    updated_at: string;
    image: string;
    created_by: number;
}

interface IProject {
    id: number;
    created_at: string;
    updated_at: string;
    created_by: number;
    is_active: boolean;
    started_at: string;
    ended_at: string;
    status: string;
    title: string;
    description: string;
    pricing_type: string;
    price: string;
    category: number;
    client: number;
    image: number;
}

interface IOtherDetails {
    social: string;
}

interface IUserDetails {
    name: string;
    company_name: string;
    contact_name: string;
    phone: string;
    vat: string;
    bill_email: string;
    mail_address: string;
    gender: string;
    about: string;
    note: string;
    other: IOtherDetails;
    profile_picture: IProfilePicture;
    cover_picture: number;
}

interface IClient {
    id: number;
    email: string;
    user_details: IUserDetails;
    user_type: string;
    date_joined: string;
    last_login: string | null;
}

interface IEvent {
    id: number;
    status: string;
    type: string;
    created_at: string;
    updated_at: string;
    meeting_obj_notes: string;
    meeting_complete_notes: string;
    meeting_link: string | undefined;
    meeting_date_at: string;
    created_by: number;
    slot: ISlot;
    project: IProject;
    client: IClient;
}


const Page = ({
                  params,
              }: {
    params: {
        slug: string;
    };
}) => {
    const {data} = useDataFetch<IEvent>(apiRoutes.PROTECTED.GENERAL.MEETINGS.GET(params?.slug)({expand: "slot,client,client.user_details,client.user_details.profile_picture,project"}))
    return (
        <div className="p-4">
            <BreadcrumbMenu/>
            <div className="mt-4 grid grid-cols-7 gap-x-4">
                <LeftSection data={data?.client}/>
                <RightSection data={data}/>
            </div>
        </div>
    );
};

export default Page;

const BreadcrumbMenu = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="font-semibold" href={frontendLinks.PRIVATE.CALENDER}>
                        Calender
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold">
                        Meeting Details
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};


const LeftSection = ({data: clientData}: { data?: IClient }) => {
    const navigate = useRouter()
    const {data: chats} = useAxiosSWR(apiRoutes.PROTECTED.GENERAL.CHAT.LIST({
        limit: 1,
        expand: 'receiver',
        receiver: clientData?.id
    }))

    async function onClick() {
        if (chats?.length) {
            return navigate.push(frontendLinks.PRIVATE.MESSAGE(encodeDataToBase64(chats?.[0])))
        }
        const data = await createChat({receiver: clientData?.id})
        const chat = data?.data
        chat["receiver"] = clientData
        return navigate.push(frontendLinks.PRIVATE.MESSAGE(encodeDataToBase64(chat)))
    }

    return (
        <div className="col-span-3 flex flex-col items-center rounded-lg bg-white p-2">
            <div className="relative my-4">
                <Avatar className="h-[134px] w-[134px]">
                    <AvatarImage src={clientData?.user_details?.profile_picture?.image}/>
                    <AvatarFallback>
                        {getFirstCharCapitalized(
                            clientData?.user_details?.name
                                ? clientData.user_details.name
                                : "Client",
                        )}
                    </AvatarFallback>
                </Avatar>
            </div>
            <p className="mb-2 font-bold">{clientData?.user_details?.name}</p>
            <p className="mb-2 font-semibold">{clientData?.email}</p>
            <Button onClick={onClick}>Send Message</Button>
            <div className="mt-6 flex w-3/4 flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Icons.location className="h-6 w-6"/>
                    <p>From</p>
                    <p>{clientData?.user_details?.contact_name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Icons.user className="h-6 w-6"/>
                    <p>Member Since</p>
                    <p>{clientData?.user_details?.mail_address}</p>
                </div>
            </div>
        </div>
    );
};

const RightSection = ({data}: { data?: IEvent }) => {
    return (
        <div className="col-span-4 rounded-lg bg-white p-4">
            <MeetingDetails project={data?.project}/>
            <Message message={data?.meeting_obj_notes}/>
            <DateAndTime slot={data?.slot} date={data?.meeting_date_at}/>
            <MeetingMode type={data?.type}/>
            <FooterButtons meetingLink={data?.meeting_link}/>
        </div>
    );
};

interface MeetingDetailsProps {
    project?: IProject
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({
                                                           project
                                                       }) => {
    return (
        <div className="">
            <p className="mb-4 font-semibold">Meeting details</p>
            <div className="gap-3">
                <p className="font-bold text-gray-700">
                    Complex/Simple Project :{project?.title} <br/>
                    <span className="font-semibold text-brand">Project No: {project?.id}</span>
                </p>
            </div>
        </div>
    );
};

interface MessageProps {
    message?: string;
}

const Message: React.FC<MessageProps> = ({message}) => {
    return (
        <div className="mt-6">
            <p className="mb-4 font-semibold">Notes</p>
            <p className="text-gray-700">{message}</p>
        </div>
    );
};

const DateAndTime = ({slot, date}: { slot?: ISlot, date?: string }) => {
    return (
        <div>
            <div className="my-4 flex gap-2 font-bold">
                <p>Date and Time: </p>
                <p>{date} {convertTo12Hour(slot?.start_at)}</p>
                <p>TO</p>
                <p>{date} {convertTo12Hour(slot?.end_at)}</p>
            </div>
        </div>
    );
};

const MeetingMode = ({type}: { type?: string }) => {
    return (
        <div>
            <p>
                Meeting Mode: <span className="font-semibold">{type}</span>
            </p>
        </div>
    );
};

const FooterButtons = ({meetingLink}: { meetingLink?: string }) => {
    return (
        <div className="my-4">
            <Button
                size={"lg"}
                variant={"outline"}
                className="border-brand text-brand"
            >
                <p>Join Meeting</p>
            </Button>
            <Button size={"lg"} variant={"link"}>
                <p className="underline">Send Mail</p>
            </Button>
        </div>
    );
};
