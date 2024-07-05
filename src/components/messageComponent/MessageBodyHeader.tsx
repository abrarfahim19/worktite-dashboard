import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {apiRoutes, decodeDataFromBase64, encodeDataToBase64} from "@/config/common";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import {Icons, truncateText} from "@/lib/utils";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useMemo} from "react";

export const MessageBodyHeader = () => {
    const searchParams = useSearchParams();
    const chat = useMemo(() => decodeDataFromBase64(searchParams.get("chat") || ""), [searchParams]);

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
                            {truncateText(chat?.receiver?.email, 15)}
                        </p>
                        <div className="flex items-center gap-1">
                            <div
                                className={`h-2 w-2 rounded-full bg-green-600`}
                            ></div>
                            <p className="text-xs ">
                                Active Now
                            </p>
                        </div>
                    </div>
                </div>
                {/* <PlainCombobox combobox={combobox} /> */}
                <ProjectSelect/>
                <DropDownMenuItem/>
            </div>
            <hr/>
        </div>
    );
};

const ProjectSelect = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const project = useMemo(() => decodeDataFromBase64(searchParams.get("project") || ""), [searchParams]);


    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const clientId = decodeDataFromBase64(searchParams.get("chat") || "")?.receiver?.id || 0
    const {data: projects} = useAxiosSWR(apiRoutes.PROTECTED.PROJECTS.LIST({
        limit: 10,
        client: clientId
    }))

    function onSelect(value: any) {
        router.push(pathname + '?' + createQueryString('project', encodeDataToBase64(value)))
    }

    return <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[180px] mr-2">
            <SelectValue placeholder={project?.title ?? "Select a project"}/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {
                    projects?.map((project) => <SelectItem key={project.id}
                                                                  value={project}>{project?.title}</SelectItem>)
                }
            </SelectGroup>
        </SelectContent>
    </Select>
}


const DropDownMenuItem = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Icons.threeMenuDot className="h-4 w-4"/>
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