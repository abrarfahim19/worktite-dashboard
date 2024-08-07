"use client";

import {StaticTimeline} from "@/components/timeline";
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {
    IChat,
    decodeDataFromBase64,
    IFiles,
    PROJECT_PRICING_TYPE,
    stopPropagate
} from "@/config/common";
import {timezoneToDDMMYYYY} from "@/config/common/timeFunctions";
import {cn, Icons, truncateText} from "@/lib/utils";
import {format} from "date-fns";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {FormProvider, useForm, useFormContext} from "react-hook-form";
import CategoryField from "../../designs/uploadproject/components/CategoryField";
import {documentDelete, uploadDocuments} from "../manager";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

const steps = [
    {
        name: "General documents",
        is_complete: true,
    },
    {
        name: "Invoice",
        is_complete: false,
    },
    {
        name: "Confirmation",
        is_complete: false,
    },
];

interface ProjectDocument {
    doc_type: number;
    note?: string | null;
    file: number
}

interface InternalNotes {
    note: string;
    date: string
}

const Page = () => {
    const searchParams = useSearchParams();
    // console.log("Search Params", searchParams.toString());
    const form = useForm();

    const onSubmit = (data: any) => {
        // {
        //   "project_invoice": [
        //     {
        //       "file_type": 1,
        //       "is_receive": true,
        //       "file": 0
        //     }
        //   ],
        //   "project_documents": [
        //     {
        //       "doc_type": 1,
        //       "note": "string",
        //       "file": 0
        //     }
        //   ],
        //   "project_internal_notes": [
        //     {
        //       "note": "string",
        //       "date": "2024-06-29"
        //     }
        //   ],
        //   "is_active": true,
        //   "started_at": "2024-06-29T04:27:18.550Z",
        //   "ended_at": "2024-06-29T04:27:18.550Z",
        //   "status": 0,
        //   "title": "string",
        //   "description": "string",
        //   "pricing_type": 1,
        //   "price": "string",
        //   "category": 0,
        //   "client": 0,
        //   "image": 0
        // }

        //
        const project_documents: ProjectDocument[] = []
        if (data?.archive_file) {
            data?.archive_file?.forEach((file: IFiles) => {
                project_documents.push({file: file.id, doc_type: 3, note: null})
            })
        }
        if (data?.design_file) {
            data?.design_file?.forEach((file: IFiles) => {
                project_documents.push({file: file.id, doc_type: 1, note: null})
            })
        }
        if (data?.technical_file) {
            data?.technical_file?.forEach((file: IFiles) => {
                project_documents.push({file: file.id, doc_type: 2, note: null})
            })
        }
        data.project_documents = project_documents;
        data.client = decodeDataFromBase64<IChat>(searchParams.get("chat") || "")?.receiver?.id
        data.category = data?.category?.value
        data.price = data?.rate
        data.started_at = new Date().toISOString()

        delete data?.design_file;
        delete data?.archive_file;
        delete data?.technical_file;
        delete data?.rate;
        console.log("Form Data", data);

    };
    return (
        <div>
            <div className="px-4">
                <BreadcrumbMenu/>
                <StaticTimeline steps={steps}/>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <MetaData/>
                        <GeneralInformation/>
                        <DesignDocuments/>
                        <TechnicalDocuments/>
                        <ArchiveDocuments/>
                        <AddNewField/>
                        <InternalNotes/>
                        {/* <MeetingNotes /> */}
                        <NextBack/>
                    </form>
                </FormProvider>
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
                    <BreadcrumbLink href="/dashboard/message">
                        <p>Message</p>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        <p className="font-semibold">Create an Offer</p>
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

const MetaData = () => {
    const form = useFormContext();
    return (
        <div className="mt-20">
            <div className="flex gap-4">
                <div className="gap-15 grid w-full items-center">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Title"
                                        {...field}
                                        className="border-2 border-black bg-transparent"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <CategoryField/>
                </div>
            </div>
            <div className="mt-2 flex gap-4">
                <div className="grid w-full items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="pricing_type"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Pricing Type</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    // defaultValue={field.value.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className="w-full border-2 border-black bg-transparent">
                                            <SelectValue placeholder="Select Pricing Type"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            value={PROJECT_PRICING_TYPE.HOURLY_BASIS.toString()}
                                        >
                                            Hourly Basis
                                        </SelectItem>
                                        <SelectItem
                                            value={PROJECT_PRICING_TYPE.ONE_TIME_BASIS.toString()}
                                        >
                                            One Time Basiis
                                        </SelectItem>
                                        <SelectItem
                                            value={PROJECT_PRICING_TYPE.MILESTONE_BASIS.toString()}
                                        >
                                            Milestone Basis
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className=""/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Rate</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Rate"
                                        {...field}
                                        className="border-2 border-black bg-transparent"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

const GeneralInformation = () => {
    const form = useFormContext();
    return (
        <div className="mt-4">
            <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                    <FormItem>
                        <FormLabel>General project information</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Type your project information here..."
                                {...field}
                                className="border-2 border-black bg-transparent"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
};

const DesignDocuments = () => {
    const form = useFormContext();
    const [designDocumentsList, setDesignDocumentsList] = useState<IFiles[]>([]);
    const documentDeleteHandler = async (id: number | string) => {
        const response = await documentDelete(id);
        if (response) {
            setDesignDocumentsList((prevResponses) =>
                prevResponses.filter((response) => response.id !== id),
            );
        }
    };

    form.setValue("design_file", designDocumentsList || null);
    return (
        <div className="mt-4 rounded bg-white p-4">
            <p className="text-base font-bold">Design Documents</p>

            {designDocumentsList.map((item, index) => {
                return (
                    <div key={item.id} className="mt-2">
                        <div className="flex items-center justify-between">
                            <p className="font-semibol font-sm">
                                {truncateText(item.file_name, 10)}
                            </p>
                            <div className="flex">
                                <Icons.attacthment className="h-6 w-6"/>
                                <p className="font-semibold">
                                    {truncateText(item.file_name, 10)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant={"ghost"}>
                                    <Icons.edit className="h-6 w-6"/>
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    onClick={async () => documentDeleteHandler(item.id)}
                                >
                                    <Icons.delete className="h-6 w-6"/>
                                </Button>
                            </div>
                        </div>
                        {index !== designDocumentsList.length - 1 && (
                            <hr className="mt-3"/>
                        )}
                    </div>
                );
            })}
            <DocumentDialog setDesignDocumentsList={setDesignDocumentsList}/>
        </div>
    );
};

const TechnicalDocuments = () => {
    const form = useFormContext();
    const [technicalDocumentsList, setTechnicalDocumentsList] = useState<
        IFiles[]
    >([]);
    const documentDeleteHandler = async (id: number | string) => {
        const response = await documentDelete(id);
        if (response) {
            setTechnicalDocumentsList((prevResponses) =>
                prevResponses.filter((response) => response.id !== id),
            );
        }
    };

    form.setValue("technical_file", technicalDocumentsList || null);
    return (
        <div className="mt-4 rounded bg-white p-4">
            <p className="text-base font-bold">Technical Documents</p>

            {technicalDocumentsList.map((item, index) => {
                return (
                    <div key={item.id} className="mt-2">
                        <div className="flex items-center justify-between">
                            <p className="font-semibol font-sm">
                                {truncateText(item.file_name, 10)}
                            </p>
                            <div className="flex">
                                <Icons.attacthment className="h-6 w-6"/>
                                <p className="font-semibold">
                                    {truncateText(item.file_name, 10)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant={"ghost"}>
                                    <Icons.edit className="h-6 w-6"/>
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    onClick={async () => documentDeleteHandler(item.id)}
                                >
                                    <Icons.delete className="h-6 w-6"/>
                                </Button>
                            </div>
                        </div>
                        {index !== technicalDocumentsList.length - 1 && (
                            <hr className="mt-3"/>
                        )}
                    </div>
                );
            })}
            <DocumentDialog setDesignDocumentsList={setTechnicalDocumentsList}/>
        </div>
    );
};

const ArchiveDocuments = () => {
    const form = useFormContext();
    const [archiveDocumentsList, setArchiveDocumentsList] = useState<IFiles[]>(
        [],
    );
    useEffect(() => {
        console.log("This is the archive documents list", archiveDocumentsList);
    }, [archiveDocumentsList]);
    const documentDeleteHandler = async (id: number | string) => {
        const response = await documentDelete(id);
        if (response) {
            setArchiveDocumentsList((prevResponses) =>
                prevResponses.filter((response) => response.id !== id),
            );
        }
    };

    form.setValue("archive_file", archiveDocumentsList || null);
    return (
        <div className="mt-4 rounded bg-white p-4">
            <p className="text-base font-bold">Archive Documents</p>

            {archiveDocumentsList.map((item, index) => {
                return (
                    <div key={item.id} className="mt-2">
                        <div className="flex items-center justify-between">
                            <p className="font-semibol font-sm">
                                {truncateText(item.file_name, 10)}
                            </p>
                            <div className="flex">
                                <Icons.attacthment className="h-6 w-6"/>
                                <p className="font-semibold">
                                    {truncateText(item.file_name, 10)}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant={"ghost"}>
                                    <Icons.edit className="h-6 w-6"/>
                                </Button>
                                <Button
                                    variant={"ghost"}
                                    onClick={async () => documentDeleteHandler(item.id)}
                                >
                                    <Icons.delete className="h-6 w-6"/>
                                </Button>
                            </div>
                        </div>
                        {index !== archiveDocumentsList.length - 1 && (
                            <hr className="mt-3"/>
                        )}
                    </div>
                );
            })}
            <DocumentDialog setDesignDocumentsList={setArchiveDocumentsList}/>
        </div>
    );
};

const AddNewField = () => {
    return (
        <div className="my-8">
            <Button size={"lg"} className="flex h-12 gap-2">
                <Icons.addCircle className="h-4 w-4"/>
                <p className="text-white">Add New</p>
            </Button>
        </div>
    );
};

const internalNotesData = [
    {
        id: 1,
        date: 1711159239,
        title: "Internal Note 1",
        note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,",
    },
    {
        id: 2,
        date: 1711159239,
        title: "Internal Note 2",
        note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,",
    },
    {
        id: 3,
        date: 1711159239,
        title: "Internal Note 3",
        note: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,",
    },
];

interface IInternalNotes {
    id: number;
    date: string;
    note: string;
}

const InternalNotes = () => {
    const form = useFormContext();
    const [internalNotesData, setInternalNotesData] = useState<IInternalNotes[]>(
        [],
    );
    const onDelete = (index: number) => () => {
        setInternalNotesData(prevData => prevData.filter((_, i) => i !== index));
    };

    form.setValue("internal_notes", internalNotesData || null);
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <p className="font-bold">Internal notes</p>
                <InternalNotesDialog setInternalNotesData={setInternalNotesData}/>
            </div>
            {internalNotesData.map((item, index) => {
                return (
                    <div key={item.id} className="mt-4 rounded border-2 border-black p-4">
                        {/* <p className="text-base font-bold">{item.title}</p> */}
                        <div className="flex justify-between">
                            <p className="mb-4 text-sm">{timezoneToDDMMYYYY(item.date)}</p>
                            <Icons.menu onClick={onDelete(index)} className="h-4 w-4"/>
                        </div>
                        <p className="text-sm">{item.note}</p>
                    </div>
                );
            })}
        </div>
    );
};

const meetingNoteData = [
    {
        date: 1711159239,
        title: "Criteria discussion",
        noteCreator: {
            name: "John Doe",
            role: "Designer",
            image: "https://github.com/shadcn.png",
        },
        meetingWithPersonData: {
            name: "Jane Cooper",
            role: "Client",
            profile: "https://www.facebook.com",
        },
        note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus.",
    },
    //   {
    //     date: 1711159239,
    //     title: "Pricing discussion",
    //     noteCreator: {
    //       name: "John Doe",
    //       role: "Designer",
    //       image: "https://github.com/shadcn.png",
    //     },
    //     meetingWithPersonData: {
    //       name: "Jane Cooper",
    //       role: "Client",
    //       profile: "https://www.facebook.com",
    //     },
    //     note: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia eos libero esse sunt laudantium culpa, distinctio expedita repellendus eligendi amet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, dolores maiores? Deserunt, culpa sequi aperiam sint quibusdam autem vero temporibus similique. Consequuntur architecto repudiandae odit delectus, veritatis veniam quis, accusamus impedit magni tempore cumque facere sunt enim porro officiis repellendus.",
    //   },
];

const MeetingNotes = () => {
    return (
        <div className="mt-6 bg-white p-4">
            <h3 className="text-lg font-semibold">Meeting Notes</h3>
            {meetingNoteData.map((item, index) => (
                <div key={index} className="mt-4 px-2">
                    <div className="flex justify-between">
                        <div className="">
                            <div className="mt-4 flex gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={item.noteCreator.image}/>
                                    <AvatarFallback>{item.noteCreator.name}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">
                                        {item.noteCreator.name}, {item.noteCreator.role}
                                    </p>
                                    <p className="">
                                        Meeting with{" "}
                                        <span className="font-semibold underline">
                      <Link href={item.meetingWithPersonData.profile}>
                        {item.meetingWithPersonData.name}{" "}
                      </Link>
                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <p>
                                {format(new Date(item.date * 1000), "dd-MM-yyyy 'at' h:mma")}
                            </p>
                            <Icons.menu className="h-4 w-4"/>
                        </div>
                    </div>
                    <div>
                        <h4 className="mt-4 text-lg font-semibold">{item.title}</h4>
                        <p className="mt-2 text-justify">{item.note}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const NextBack = () => {
    return (
        <div className="my-8 flex gap-6">
            {/* <Link href={"createOffer/invoice"}> */}
            <Button type="submit" size={"lg"}>
                Next
            </Button>
            {/* </Link> */}
            <Button variant={"link"} className="">
                <p className="border-b-2 border-brand">Back</p>
            </Button>
        </div>
    );
};

interface IDocumentDialog {
    setDesignDocumentsList: React.Dispatch<React.SetStateAction<IFiles[]>>;
}

const DocumentDialog: React.FC<IDocumentDialog> = ({
                                                       setDesignDocumentsList,
                                                   }) => {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        accept: {
            "application/pdf": [".pdf", ".doc"],
        },
    });
    const files = acceptedFiles.map((file: any) => {
        const turncated =
            file.path.length > 10 ? file.path.substring(0, 10) + "..." : file.path;
        return (
            <li key={file.path}>
                {turncated} - {file.size} bytes
            </li>
        );
    });

    const additionalInvoiceHandler = () => {
        console.log("invoice Completed");
    };

    const invoiceHandler = async () => {
        console.log("Start executing!");
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append("file", file);
            console.log("File Type is following", file.type);
            let file_type = 2;
            if (file.type === "application/pdf") {
                file_type = 1;
            }
            const payLoad = {
                // id,
                formData,
                file_type,
            };
            try {
                const response: any = await uploadDocuments(payLoad);
                setDesignDocumentsList((prevResponses) => [
                    ...prevResponses,
                    response?.data,
                ]);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
            // if
            // await postInvoice(id, formData, );
            // try {
            //   const response = await apiPost(
            //     apiRoutes.FILES.DOCUMENTS.POST,
            //     formData,
            //     {
            //       headers: {
            //         "Content-Type": "application/pdf",
            //       },
            //     },
            //   );
            //   console.log("File uploaded successfully:", response.data);
            // } catch (error) {
            //   console.error("Error uploading file:", error);
            // }
        } else {
            console.log("No files to upload");
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="mt-4 border-brand" size={"lg"}>
                    <Icons.attacthmentBrand className="h-6 w-6"/>
                    <p className="text-brand">Attach File</p>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-full px-10">
                <DialogHeader className="">
                    <DialogTitle className="text-center text-lg font-semibold text-black">
                        Upload the design documents here
                    </DialogTitle>
                    <DialogDescription className=""></DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-full">
                        <h5 className="text-md font-semibold">Upload PDF (Optional)</h5>
                        <div className="mt-4 flex gap-4">
                            <div className="w-full items-center justify-center">
                                <div
                                    {...getRootProps({
                                        className:
                                            "h-32 w-full rounded-md border-[1px] border-dashed border-black bg-transparent flex justify-center items-center ",
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <div
                                        className="flex flex-col items-center justify-center gap-2">
                                        <Icons.upload className="h-12 w-12"/>
                                        <p className="w-2/3 text-center text-xs">
                                            Drag and drop or click to upload document
                                        </p>
                                    </div>
                                </div>
                                <h4 className="my-2 font-semibold">Files</h4>
                                <ul>{files}</ul>
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter className="">
                    <div className="flex flex-1 flex-row gap-8">
                        <Button
                            className={`w-44 py-8 text-lg text-white`}
                            onClick={invoiceHandler}
                        >
                            Create Invoice
                        </Button>

                        <div>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant={"link"}
                                    className={`w-full py-8 text-lg font-semibold underline `}
                                    onClick={additionalInvoiceHandler}
                                >
                                    Send
                                </Button>
                                {/* <InvoiceSentDialog /> */}
                            </DialogClose>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

interface IInternalNotesDialog {
    setInternalNotesData: React.Dispatch<React.SetStateAction<IInternalNotes[]>>;
}

const InternalNotesDialog: React.FC<IInternalNotesDialog> = ({
                                                                 setInternalNotesData,
                                                             }) => {
    const noteForm = useForm();
    const onSubmit = async (data: any) => {
        setInternalNotesData((prev) => [...prev, data])
        noteForm.reset()
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="border-brand" size={"lg"}>
                    <Icons.addNote className="h-6 w-6"/>
                    <p className="text-brand">Add New</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full px-10">
                <Form {...noteForm}>
                    <form onSubmit={stopPropagate(noteForm.handleSubmit(onSubmit))}>
                        <DialogHeader className="">
                            <DialogTitle className="text-center text-lg font-semibold text-black">
                                Add New Internal Note
                            </DialogTitle>
                            <DialogDescription className=""></DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-full">
                                <FormField
                                    control={noteForm.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Date</span>
                                                            )}
                                                            <CalendarIcon
                                                                className="ml-auto h-4 w-4 opacity-50"/>
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0"
                                                                align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(e) => {

                                                            field.onChange(e?.toLocaleDateString('en-CA'))
                                                        }}
                                                        disabled={(date) =>
                                                            date < new Date()
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={noteForm.control}
                                    name="note"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Internal Notes</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Type your internal notes here..."
                                                    {...field}
                                                    className="border-2 border-black bg-transparent"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="">
                            <div className="mt-4 flex flex-1 flex-row gap-8">
                                <DialogClose asChild>
                                    <Button
                                        type="submit"
                                        className={`w-44 py-8 text-lg text-white`}
                                        // onClick={() => console.log("Note Created")}
                                    >
                                        Create Note
                                    </Button>
                                </DialogClose>

                                <div>
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant={"link"}
                                            className={`w-full py-8 text-lg font-semibold underline `}
                                            // onClick={() => console.log("Note Cancelled")}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </div>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
