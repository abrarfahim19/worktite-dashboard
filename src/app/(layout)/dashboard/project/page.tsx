"use client";
import {CustomStatus} from "@/components/customStatus";
import {useLoader} from "@/components/loader/loader";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {PLACE_HOLDER_IMAGE} from "@/config/common";
import {apiRoutes} from "@/config/common/apiRoutes";
import {STATUS} from "@/config/common/AppEnums";
import {IUser} from "@/config/common/interfaces";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import {truncateText} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {useMemo} from "react";


interface Category {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    created_by: number;
    images: any;
}

interface ClientStatus {
    id: number | string;
    title: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Pricing {
    id: number;
    created_at: string;
    updated_at: string;
    pricing_type: number;
    currency: string;
    created_by: number;
}

interface IItems {
    id: number;
    category: Category;
    client_status: ClientStatus[];
    pricing_type: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    started_at: string;
    ended_at: string;
    status: number;
    title: string;
    description: string;
    price: string;
    created_by: number;
    client: IUser;
}

interface ProjectTab {
    name?: string;
    value: string;

    [key: string]: any;
}

enum ProjectTabValues {
    ACTIVE = 'active',
    COMPLETE = 'complete',
    CANCELLED = 'cancelled',
    PENDING = 'pending'
}

const projectData = [
    {
        name: "Active project",
        value: ProjectTabValues.ACTIVE,
        numberOfProjects: 1,
        status: STATUS.ACTIVE
    },
    {
        name: "Complete project",
        value: ProjectTabValues.COMPLETE,
        numberOfProjects: 1,
        status: STATUS.COMPLETE
    },
    {
        name: "Cancelled project",
        value: ProjectTabValues.CANCELLED,
        numberOfProjects: 1,
        status: STATUS.CANCELLED
    },
    {
        name: "Pending project",
        value: ProjectTabValues.PENDING,
        numberOfProjects: 1,
        status: STATUS.PENDING
    },
];

const Page = () => {
    const {data: projectStatusCount, isLoading} = useAxiosSWR<ProjectTab>(
        apiRoutes.PROTECTED.PROJECTS.PROJECT_STATUS_LIST_COUNT({
            limit: 100
        }),
    );
    const ProjectDataModified = useMemo(() => {
        const countMap = new Map<number, number | string>();
        projectStatusCount.forEach(item => countMap.set(item.status, item.count));

        const merged: ProjectTab[] = projectData.map(item => ({
            ...item,
            numberOfProjects: countMap.get(item.status)
        }));

        return merged;
    }, [projectStatusCount])
    return (
        <div className="">
            <Tabs defaultValue={ProjectTabValues.ACTIVE} className="w-full">
                <TabsList className="bg-transparent">
                    {ProjectDataModified.map((project) => {
                        return (
                            <TabsTrigger
                                className="py-0 text-sm group data-[state=active]:rounded-none data-[state=active]:border-b-brand data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none "
                                value={project.value}
                                key={project.name}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <p
                                            className="group-data-[state=active]:font-semibold group-data-[state=inactive]:text-md"
                                        >
                                            {project.name}
                                        </p>
                                        <Badge
                                            className="group-data-[state=active]:bg-brand group-data-[state=inactive]:bg-softDark"
                                        >
                                            {project.numberOfProjects}
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
                    <TabsContent className="w-full" value={projectData[0].value}>
                        <ActiveTableProjects items={projectData[0]}/>
                    </TabsContent>
                    <TabsContent className="w-full" value={projectData[1].value}>
                        <CompletedTableProjects items={projectData[1]}/>
                    </TabsContent>
                    <TabsContent className="w-full" value={projectData[2].value}>
                        <TableProjects items={projectData[2]}/>
                    </TabsContent>
                    <TabsContent className="w-full" value={projectData[3].value}>
                        <TableProjects items={projectData[3]}/>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default Page;

function ActiveTableProjects({items}: { items: ProjectTab }) {
    const {data: projects, isLoading} = useAxiosSWR<IItems>(
        apiRoutes.PROTECTED.PROJECTS.LIST({
            limit: 100,
            offset: 0,
            status: STATUS.ACTIVE,
            fields: "id,started_at,title,pricing_type,category.title,client.email",
            expand: "pricing,category,client",
        }),
    );
    useLoader({isLoading});
    return (
        <Table className="">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center font-bold text-black">
                        Projects
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Acc no
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Category
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        No of Projects
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Project starting date
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Status
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Details
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects?.map((item) => {
                    const date = new Date(item?.started_at);

                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
                    const year = date.getFullYear();

                    const formattedDate = `${day}-${month}-${year}`;
                    return (
                        <TableRow key={item?.id}>
                            <TableCell className="text-center font-medium">
                                <div className="flex gap-2">
                                    <div className="relative h-12 w-12">
                                        <Image
                                            layout="fill"
                                            objectFit="cover"
                                            quality={100}
                                            src={PLACE_HOLDER_IMAGE}
                                            alt="project image"
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="font-bold">{truncateText(item?.title, 10)}</p>
                                        <p>Price: {truncateText(item?.pricing_type, 6)}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-center font-medium">
                                {truncateText(item?.client?.email, 10)}
                            </TableCell>
                            <TableCell className="text-center">
                                {truncateText(item?.category?.title, 10)}
                            </TableCell>
                            <TableCell className="text-center">{10}</TableCell>
                            <TableCell className="text-center">{formattedDate}</TableCell>
                            <TableCell className="text-center">
                                <CustomStatus project_id={item?.id}/>
                            </TableCell>
                            <TableCell className="text-center">
                                <Link href={`/dashboard/project/${item.id}`}>
                                    <Button variant={"link"}>Details</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

function CompletedTableProjects({items}: { items: ProjectTab }) {
    const {data: projects} = useAxiosSWR<IItems>(
        apiRoutes.PROTECTED.PROJECTS.LIST({
            limit: 10,
            offset: 0,
            status: STATUS.COMPLETE,
            fields:
                "id,started_at,title,price,pricing_type,category.title,client.email",
            expand: "pricing,category,client",
        }),
    );
    return (
        <Table className="">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center font-bold text-black">
                        Projects
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Acc no
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Total price of the project
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Total time spent
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="text-center font-medium">
                            <div className="flex gap-2">
                                <div className="relative h-12 w-12">
                                    {/*<Image*/}
                                    {/*    layout="fill"*/}
                                    {/*    objectFit="cover"*/}
                                    {/*    quality={100}*/}
                                    {/*    src={item.projectImage}*/}
                                    {/*    alt="project image"*/}
                                    {/*/>*/}
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <p className="font-bold">{item?.title}</p>
                                    <p>Pricing type: {item?.pricing_type}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                            {item?.client?.email}
                        </TableCell>
                        <TableCell className="text-center">{item?.price}</TableCell>
                        <TableCell className="text-center">{item?.started_at}</TableCell>
                        <TableCell className="text-center">
                            <Link href={`/dashboard/project/${item?.id}`}>
                                <Button
                                    size={"lg"}
                                    variant={"outline"}
                                    className="border-brand text-brand"
                                >
                                    Publish
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function TableProjects({items}: { items: ProjectTab }) {
    const {data: projects} = useAxiosSWR<IItems>(
        apiRoutes.PROTECTED.PROJECTS.LIST({
            limit: 10,
            offset: 0,
            status: STATUS.CANCELLED,
            fields:
                "id,started_at,title,price,pricing.pricing_type,category.title,client.email",
            expand: "pricing,category,client",
        }),
    );

    return (
        <Table className="">
            <TableHeader>
                <TableRow>
                    <TableHead className="text-center font-bold text-black">
                        Projects
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Acc no
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Category
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Project starting date
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Status
                    </TableHead>
                    <TableHead className="text-center font-bold text-black">
                        Details
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {projects.map((item) => (
                    <TableRow key={item?.id}>
                        <TableCell className="text-center font-medium">
                            <div className="flex gap-2">
                                <div className="relative h-12 w-12">
                                    {/*<Image*/}
                                    {/*    layout="fill"*/}
                                    {/*    objectFit="cover"*/}
                                    {/*    quality={100}*/}
                                    {/*    src={item.projectImage}*/}
                                    {/*    alt="project image"*/}
                                    {/*/>*/}
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <p className="font-bold">{item?.title}</p>
                                    <p>Pricing type: {item?.pricing_type}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                            {item?.client?.email}
                        </TableCell>
                        <TableCell className="text-center">
                            {item?.category?.title}
                        </TableCell>
                        <TableCell className="text-center">{item?.started_at}</TableCell>
                        <TableCell className="text-center">{item?.started_at}</TableCell>
                        <TableCell className="text-center">
                            <Link href={`/dashboard/project/${item?.id}`}>
                                <Button variant={"link"}>Details</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
