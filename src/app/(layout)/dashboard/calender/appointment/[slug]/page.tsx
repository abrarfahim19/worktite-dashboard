"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {Button} from "@/components/ui/button";
import {apiRoutes} from "@/config/common";
import useDataFetch from "@/hooks/useDataFetch";
import Link from "next/link";

interface IData {
    id: number;
    status: string;
    project_type: string;
    name: string;
    email: string;
    message: string;
    appointment_date_at: string;
    slot: number
}

const Page = ({
                  params,
              }: {
    params: {
        slug: string;
    };
}) => {

    const {data: appointmentData} = useDataFetch<IData>(apiRoutes.PROTECTED.GENERAL.APPOINTMENTS.GET(params?.slug))

    return (
        <div className="p-4">
            <BreadcrumbMenu/>
            <AppointmentDetails name={appointmentData?.name} appointment_date_at={appointmentData?.appointment_date_at}
                                email={appointmentData?.email}/>
            <Message message={appointmentData?.message}/>
            <FooterButtons/>
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
                        <Link href="/dashboard/calender">
                            <p>Calender</p>
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        <p className="font-semibold">Appointment Details</p>
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

interface AppointmentDetailsProps {
    name?: string;
    email?: string;
    appointment_date_at?: string;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
                                                                   name,
                                                                   email,
                                                                   appointment_date_at,
                                                               }) => {
    return (
        <div className="mt-6">
            <p className="mb-4 font-semibold">Appointment details</p>
            <div className="grid w-1/3 grid-cols-2 gap-3">
                <p className="text-gray-700">Client`s Name:</p>
                <p className="font-semibold text-black"> {name} </p>
                <p className="text-gray-700">Email address: </p>
                <p className="font-semibold text-black"> {email} </p>
                <p className="text-gray-700">Date and Time: </p>
                <p className="font-semibold text-black"> {appointment_date_at} </p>
            </div>
        </div>
    );
};

interface MessageProps {
    message: string | undefined;
}

const Message: React.FC<MessageProps> = ({message}) => {
    return (
        <div className="mt-6">
            <p className="mb-4 font-semibold">Message</p>
            <p className="text-gray-700">{message}</p>
        </div>
    );
};

const FooterButtons = () => {
    return (
        <div className="mt-4">
            <Button size={"lg"}>
                <p>Join Meeting</p>
            </Button>
            <Button size={"lg"} variant={"link"}>
                <p className="underline">Send Mail</p>
            </Button>
        </div>
    );
};
