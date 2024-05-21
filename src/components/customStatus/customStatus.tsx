"use client";

import {
    addClientStatus,
    deleteClientStatus,
    updateClientStatus,
} from "@/app/(layout)/dashboard/project/manager/projectManager";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {apiRoutes} from "@/config/common/apiRoutes";
import {useAxiosSWR} from "@/hooks/useAxiosSwr";
import {Check, ChevronsUpDown, PlusCircle} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Command, CommandGroup} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {cn, Icons, truncateText} from "@/lib/utils";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {KeyedMutator} from "swr/_internal";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {Input} from "../ui/input";
import {toast} from "sonner"

interface FieldType {
    id: string | number;
    title: string;
    is_selected: boolean;
    selected_at: string;
    created_at: string;
    updated_at: string;

    [key: string]: any;
}

interface CustomStatusProps {
    project_id: string | number;
}

export const CustomStatus: React.FC<CustomStatusProps> = ({project_id}) => {
    const {data: statuses, mutate} = useAxiosSWR<FieldType>(
        apiRoutes.PROTECTED.PROJECTS.CLIENT_STATUS.LIST(project_id)({limit: 10}),
    );
    const activateItem = React.useMemo(() => {
        if (!statuses || statuses.length === 0) {
            return undefined;
        }

        const sorted = [...statuses].sort(
            (a, b) =>
                new Date(b.selected_at).getTime() - new Date(a.selected_at).getTime(),
        );
        for (const status of sorted) {
            if (status?.is_selected) {
                return status;
            }
        }

        return undefined;
    }, [statuses]);
    const [open, setOpen] = useState(false);

    const selectStatus = (item: FieldType) => async () => {
        setOpen(false);
        await updateClientStatus(project_id, item?.id, {
            ...item,
            is_selected: true,
        });
        if (mutate) {
            await mutate();
        }
    };
    const deleteFieldItemHandler = async (item: FieldType) => {
        await deleteClientStatus(project_id, item.id);
        if (mutate) {
            await mutate();
        }
    };
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn("w-[200px] justify-between")}
                >
                    {truncateText(activateItem?.title ?? "", 20)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                <Command>
                    <CommandGroup>
                        {statuses?.map((item) => (
                            <div key={item.id} className="flex">
                                <Button
                                    variant={"ghost"}
                                    key={item.id}
                                    disabled={item?.is_selected}
                                    onClick={selectStatus(item)}
                                    className={cn(
                                        "w-full justify-start text-left",
                                        item?.id == activateItem?.id ? " font-bold text-brand" : "",
                                    )}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            item.is_active ? "opacity-100" : "opacity-0",
                                        )}
                                    />
                                    {item?.title}
                                </Button>
                                <div className="flex gap-2 justify-self-end">
                                    <StatusDialogue
                                        mutate={mutate}
                                        project_id={project_id}
                                        title={"Edit Status"}
                                        trigger={
                                            <DialogTrigger asChild>
                                                <Button variant={"ghost"}>
                                                    <Icons.edit className="ml-auto h-4 w-4"/>
                                                </Button>
                                            </DialogTrigger>
                                        }
                                        item={item}
                                        setOpen={setOpen}
                                    />
                                    {!item?.is_selected ? (
                                        <Button
                                            variant={"ghost"}
                                            onClick={() => deleteFieldItemHandler(item)}
                                        >
                                            <Icons.delete className="ml-auto h-4 w-4"/>
                                        </Button>
                                    ) : (
                                        <Button variant={"ghost"} disabled>
                                            <Icons.delete className="ml-auto h-4 w-4 opacity-0"/>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <StatusDialogue

                            mutate={mutate}
                            project_id={project_id}
                            title={"Add A New Status"}
                            trigger={
                                <DialogTrigger asChild>
                                    <Button
                                        variant={"ghost"}
                                        className={cn("w-full justify-start text-left")}
                                    >
                                        <PlusCircle className={cn("mr-2 h-4 w-4", "opacity-100")}/>
                                        Add Status
                                    </Button>
                                </DialogTrigger>
                            }
                            setOpen={setOpen}
                        />
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

interface IStatusDialogueProps {
    mutate?: KeyedMutator<any>;
    project_id: string | number;
    title: string;
    trigger: React.ReactNode;
    item?: FieldType;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const StatusDialogue: React.FC<IStatusDialogueProps> = ({
                                                            mutate,
                                                            project_id,
                                                            title,
                                                            trigger,
                                                            item,
                                                            setOpen,
                                                        }) => {
    const form = useForm({
        defaultValues: {
            title: item?.title ?? "",
        },
    });

    const onSubmit = async (data: any) => {
        if (item) {
            await updateClientStatus(project_id, item?.id, data);
            toast.info(`status update to ${item?.title}`)
        } else {
            await addClientStatus(project_id, data);
            toast.success(`${data?.title} added `)

        }
        if (mutate) {
            await mutate();
        }
        setOpen(false);
    };
    return (
        <Dialog>
            {trigger}

            <DialogContent className="w-full px-10">
                <DialogHeader className="">
                    <DialogTitle className="text-center text-lg font-bold text-black">
                        {title}
                    </DialogTitle>
                    <DialogDescription className=""></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex items-center justify-center space-x-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Status Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Status Name"
                                                className="mb-6 mt-2 border-black py-6"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="sm:justify-center">
                            <Button
                                type="submit"
                                className="w-full py-8 text-lg font-semibold"
                            >
                                {title}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
