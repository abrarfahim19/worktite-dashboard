"use client";
import {changeAppointmentStatus, deleteAppointment} from "@/app/(layout)/dashboard/appointment/manager";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {apiRoutes, convertTo12Hour} from "@/config/common";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import {Icons} from "@/lib/utils";

enum AppointmentStatus {
    PENDING = 0,
    APPROVED,
    COMPLETE,
    CANCELED
}

enum AppointmentTabs {
    PENDING = 'pending',
    APPROVED = 'approved',
    COMPLETE = 'complete',
    CANCELED = 'canceled'
}

interface Slot {
    id: number;
    created_at: string;
    updated_at: string;
    start_at: string;
    end_at: string;
    created_by: number;
}

interface IAppointment {
    id: number;
    status: string;
    project_type: string;
    name: string;
    email: string;
    message: string;
    appointment_date_at: string;
    slot: Slot;
}


const appointmentData = [
    {
        name: "Appointment request",
        value: AppointmentTabs.PENDING,
        numberOfAppointment: 3,
        query: {status: AppointmentStatus.PENDING}
    },
    {
        name: "Appointment Schedule",
        value: AppointmentTabs.APPROVED,
        numberOfAppointment: 2,
        query: {status: AppointmentStatus.APPROVED}
    },
    {
        name: "Finished Appointment",
        value: AppointmentTabs.COMPLETE,
        numberOfAppointment: 1,
        query: {status: AppointmentStatus.COMPLETE}
    },
    {
        name: "Cancel Appointment",
        value: AppointmentTabs.CANCELED,
        numberOfAppointment: 1,
        query: {status: AppointmentStatus.CANCELED}
    },
];

const Page = () => {
    return (
        <div className="">
            <Tabs defaultValue={AppointmentTabs.PENDING} className="w-full">
                <TabsList className="bg-transparent">
                    {appointmentData?.map((project) => {
                        return (
                            <TabsTrigger
                                className="py-0 group text-sm data-[state=active]:rounded-none data-[state=active]:border-b-brand data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none "
                                value={project.value}
                                key={project.name}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <p
                                            className="font-semibold text-md"
                                        >
                                            {project.name}
                                        </p>
                                        <Badge
                                            className="group-data-[state=active]:bg-brand group-data-[state=inactive]:bg-softDark"
                                        >
                                            {project.numberOfAppointment}
                                        </Badge>
                                    </div>
                                    <div
                                        className="h-[2px] w-8 group-data-[state=active]:bg-brand group-data-[state=inactive]:bg-transparent"
                                    ></div>
                                </div>
                            </TabsTrigger>
                        );
                    })}
                </TabsList>
                <div className="mx-4 rounded bg-white">
                    <TabsContent className="w-full" value={AppointmentTabs.PENDING}>
                        <PendingAppointment filter={appointmentData[0].query}/>
                    </TabsContent>
                    <TabsContent className="w-full" value={AppointmentTabs.APPROVED}>
                        <ApprovedAppointment filter={appointmentData[1].query}/>
                    </TabsContent>
                    <TabsContent className="w-full" value={AppointmentTabs.COMPLETE}>
                        <CompletedAppointment filter={appointmentData[2].query}/>
                    </TabsContent>
                    <TabsContent className="w-full" value={AppointmentTabs.CANCELED}>
                        <CanceledAppointment filter={appointmentData[3].query}/>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Page;

const PendingAppointment = ({filter}: { filter: { [key: string]: boolean | string | number } }) => {
    const {data: appointments, mutate} = useAxiosSWR<IAppointment>(apiRoutes.PROTECTED.GENERAL.APPOINTMENTS.LIST({
        ...filter,
        limit: 10,
        expand: 'slot'
    }))
    const onClick = (id: string | number, payload: any) => async () => {
        await changeAppointmentStatus(id, payload)
        await mutate()
    }
    return (
        <div>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">
                            Name
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Email
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Date and time
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Notes
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Accept
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Decline
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments?.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center font-medium">
                                    {item?.name}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {item?.email}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item?.appointment_date_at} <br/>
                                    {convertTo12Hour(item?.slot?.start_at)}-{convertTo12Hour(item?.slot?.end_at)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant={"link"}
                                        className="bg-brand_100 bg-opacity-50"
                                    >
                                        <Icons.addNote className="h-4 w-4"/>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        onClick={onClick(item?.id, {status: 1})}
                                        variant={"outline"}
                                        className="border-brand text-brand"
                                    >
                                        Accept
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button onClick={onClick(item?.id, {status: 3})} variant={"ghost"}
                                            className="text-brand">
                                        <p className="underline">Decline</p>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const ApprovedAppointment = ({filter}: { filter: { [key: string]: boolean | string | number } }) => {
    const {data: appointments, mutate} = useAxiosSWR<IAppointment>(apiRoutes.PROTECTED.GENERAL.APPOINTMENTS.LIST({
        ...filter,
        limit: 10,
        expand: 'slot'
    }))
    const onClick = (id: string | number, payload: any) => async () => {
        await changeAppointmentStatus(id, payload)
        await mutate()
    }
    return (
        <div>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">
                            Client
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Email
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Date and time
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Notes
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Start Meeting
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Complete Meeting
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center font-medium">
                                    {item?.name}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {item?.email}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item?.appointment_date_at} <br/>
                                    {convertTo12Hour(item?.slot?.start_at)}-{convertTo12Hour(item?.slot?.end_at)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant={"link"}
                                        className="bg-brand_100 bg-opacity-50"
                                    >
                                        <Icons.addNote className="h-4 w-4"/>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button

                                        variant={"outline"}
                                        className="border-brand text-brand"
                                    >
                                        Start
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button onClick={onClick(item?.id, {status: 2})} variant={"ghost"}
                                            className="text-brand">
                                        <p className="underline">Finish</p>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const CompletedAppointment = ({filter}: { filter: { [key: string]: boolean | string | number } }) => {
    const {data: appointments} = useAxiosSWR<IAppointment>(apiRoutes.PROTECTED.GENERAL.APPOINTMENTS.LIST({
        ...filter,
        limit: 10,
        expand: 'slot'
    }))
    return (
        <div>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">
                            Client
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Email
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Date and time
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Message
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Notes
                        </TableHead>
                        <TableHead className="text-center font-bold text-black"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center font-medium">
                                    {item?.name}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {item?.email}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item?.appointment_date_at}<br/>
                                    {convertTo12Hour(item?.slot?.start_at)}-{convertTo12Hour(item?.slot?.end_at)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant={"link"}
                                        className="bg-brand_100 bg-opacity-50"
                                    >
                                        <Icons.messageNew className="h-4 w-4"/>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <MeetingNoteDialog/>
                                </TableCell>
                                <TableCell className="text-center">
                                    <CreateAccountDialog/>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const CanceledAppointment = ({filter}: { filter: { [key: string]: boolean | string | number } }) => {
    const {data: appointments, mutate} = useAxiosSWR<IAppointment>(apiRoutes.PROTECTED.GENERAL.APPOINTMENTS.LIST({
        ...filter,
        limit: 10,
        expand: 'slot'
    }))
    const deleteAP = (id: string | number) => async () => {
        await deleteAppointment(id)
        await mutate()
    }
    return (
        <div>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center font-bold text-black">
                            Client
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Email
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Date and time
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Message
                        </TableHead>
                        <TableHead className="text-center font-bold text-black">
                            Notes
                        </TableHead>
                        <TableHead className="text-center font-bold text-black"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appointments.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center font-medium">
                                    {item?.name}
                                </TableCell>
                                <TableCell className="text-center font-medium">
                                    {item?.email}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item?.appointment_date_at}<br/>
                                    {convertTo12Hour(item?.slot?.start_at)}-{convertTo12Hour(item?.slot?.end_at)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant={"link"}
                                        className="bg-brand_100 bg-opacity-50"
                                    >
                                        <Icons.messageNew className="h-4 w-4"/>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant={"link"}
                                        className="bg-brand_100 bg-opacity-50"
                                    >
                                        <Icons.addNote className="h-4 w-4"/>
                                    </Button>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        onClick={deleteAP(item?.id)}
                                        variant={"outline"}
                                        size={"lg"}
                                        className="border-brand text-brand"
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const MeetingNoteDialog = () => {
    const meetingDialogHandler = () => {
        console.log("Meeting Dialog Updated");
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>
                    <div
                        className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-brand bg-opacity-10">
                        <Icons.addNote className="h-4 w-4"/>
                    </div>
                </button>
            </DialogTrigger>

            <DialogContent className="w-full px-10">
                <DialogHeader className="">
                    <DialogTitle className="text-center text-lg font-bold text-black">
                        Meeting notes
                    </DialogTitle>
                    <DialogDescription className=""></DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-full">
                        <Label htmlFor="subject" className="">
                            Subject of meeting notes
                        </Label>
                        <Input
                            type="text"
                            id="subject"
                            placeholder="Subject"
                            className="mb-6 mt-2 border-black py-6"
                            // className="w-full border-black bg-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        />
                        <Label htmlFor="note" className="">
                            Meeting note details
                        </Label>
                        <Textarea
                            id="note"
                            placeholder="Type your message here."
                            className="mt-2 border-black"
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-center">
                    <Button
                        type="button"
                        className="w-full py-8 text-lg font-semibold"
                        onClick={meetingDialogHandler}
                    >
                        Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const CreateAccountDialog = () => {
    const meetingDialogHandler = () => {
        console.log("Meeting Dialog Updated");
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"lg"}
                    className="border-brand text-brand"
                >
                    Create Account
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full px-10">
                <DialogHeader className="">
                    <DialogTitle className="text-center text-lg font-bold text-black">
                        Create Account
                    </DialogTitle>
                    <DialogDescription className=""></DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-full">
                        <Label htmlFor="email" className="">
                            Email
                        </Label>
                        <Input
                            type="text"
                            id="email"
                            placeholder="example@gmail.com"
                            className="mb-4 mt-2 border-black py-6"
                            // className="w-full border-black bg-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                        />
                        <Label htmlFor="password" className="">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="1234324345r"
                            className="mb-4 mt-2 border-black py-6"
                        />
                    </div>
                </div>
                <DialogFooter className="sm:justify-center">
                    <Button
                        type="button"
                        className="w-full py-8 text-lg font-semibold"
                        onClick={meetingDialogHandler}
                    >
                        Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
