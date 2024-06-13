"use client";

import { StaticTimeline } from "@/components/timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IFiles, PROJECT_PRICING_TYPE } from "@/config/common";
import { Icons, truncateText } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import CategoryField from "../../designs/uploadproject/components/CategoryField";
import { documentDelete, uploadDocuments } from "../manager";

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
const Page = () => {
  const searchParams = useSearchParams();
  console.log("Search Params", searchParams.toString());
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data", data);
  };
  return (
    <div>
      <div className="px-4">
        <BreadcrumbMenu />
        <StaticTimeline steps={steps} />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <MetaData />
            <GeneralInformation />
            <DesignDocuments />
            <TechnicalDocuments />
            <ArchiveDocuments />
            <AddNewField />
            <InternalNotes />
            <MeetingNotes />
            <NextBack />
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
        <BreadcrumbSeparator />
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    className="border-2 border-black bg-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <CategoryField />
        </div>
      </div>
      <div className="mt-2 flex gap-4">
        <div className="grid w-full items-center gap-1.5">
          <FormField
            control={form.control}
            name="pricing_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pricing Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full border-2 border-black bg-transparent">
                      <SelectValue placeholder="Select Pricing Type" />
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
                <FormMessage className="" />
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rate"
                    {...field}
                    className="border-2 border-black bg-transparent"
                  />
                </FormControl>
                <FormMessage />
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>General project information</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Type your project information here..."
                {...field}
                className="border-2 border-black bg-transparent"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const designDocumentsData = [
  {
    title: "Design Document 1",
    id: 1,
    description: "This is the first design document",
    fileName: "BOM.pdf",
    link: "https://www.google.com",
  },
  {
    id: 2,
    title: "Design Document 2",
    description: "This is the second design document",
    fileName: "BOM.pdf",
    link: "https://www.google.com",
  },
];

const DesignDocuments = () => {
  const form = useFormContext();
  const [designDocumentsList, setDesignDocumentsList] = useState<IFiles[]>([]);
  useEffect(() => {
    console.log("This is the design documents list", designDocumentsList);
  }, [designDocumentsList]);
  const documentDeleteHandler = async (id: number | string) => {
    const response = await documentDelete(id);
    if (response) {
      setDesignDocumentsList((prevResponses) =>
        prevResponses.filter((response) => response.id !== id),
      );
    }
  };
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
                <Icons.attacthment className="h-6 w-6" />
                <p className="font-semibold">
                  {truncateText(item.file_name, 10)}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant={"ghost"}>
                  <Icons.edit className="h-6 w-6" />
                </Button>
                <Button
                  variant={"ghost"}
                  onClick={async () => documentDeleteHandler(item.id)}
                >
                  <Icons.delete className="h-6 w-6" />
                </Button>
              </div>
            </div>
            {index !== designDocumentsData.length - 1 && (
              <hr className="mt-3" />
            )}
          </div>
        );
      })}
      <DesignDocumentDialog setDesignDocumentsList={setDesignDocumentsList} />
    </div>
  );
};

const technicalDocumentsData = [
  {
    title: "Technical Document 1",
    id: 1,
    description: "This is the first design document",
    fileName: "BOM.pdf",
    link: "https://www.google.com",
  },
  {
    id: 2,
    title: "Tecnical Document 2",
    description: "This is the second design document",
    fileName: "BOM.pdf",
    link: "https://www.google.com",
  },
];
const TechnicalDocuments = () => {
  return (
    <div className="mt-4 rounded bg-white p-4">
      <p className="text-base font-bold">Technincal Documents</p>
      {technicalDocumentsData.map((item, index) => {
        return (
          <div key={item.id} className="mt-2">
            <div className="flex items-center justify-between">
              <p className="font-semibol font-sm">{item.title}</p>
              <div className="flex">
                <Icons.attacthment className="h-6 w-6" />
                <p className="font-semibold">{item.fileName}</p>
              </div>
              <div className="flex gap-2">
                <Button variant={"ghost"}>
                  <Icons.edit className="h-6 w-6" />
                </Button>
                <Button variant={"ghost"}>
                  <Icons.delete className="h-6 w-6" />
                </Button>
              </div>
            </div>
            {index !== designDocumentsData.length - 1 && (
              <hr className="mt-3" />
            )}
          </div>
        );
      })}
      <Button variant={"outline"} className="mt-4 border-brand" size={"lg"}>
        <Icons.attacthmentBrand className="h-6 w-6" />
        <p className="text-brand">Attach File</p>
      </Button>
    </div>
  );
};

const archiveDocumentsData = [
  {
    title: "Archive Document 1",
    id: 1,
    description: "This is the first design document",
    fileName: "BOM.pdf",
    link: "https://www.google.com",
  },
  {
    id: 2,
    title: "Archive Document 2",
    description: "This is the second design document",
    fileName: "BOM.pdf",
    link: "https://www.google.com",
  },
];
const ArchiveDocuments = () => {
  return (
    <div className="mt-4 rounded bg-white p-4">
      <p className="text-base font-bold">Archive Documents</p>
      {archiveDocumentsData.map((item, index) => {
        return (
          <div key={item.id} className="mt-2">
            <div className="flex items-center justify-between">
              <p className="font-semibol font-sm">{item.title}</p>
              <div className="flex">
                <Icons.attacthment className="h-6 w-6" />
                <p className="font-semibold">{item.fileName}</p>
              </div>
              <div className="flex gap-2">
                <Button variant={"ghost"}>
                  <Icons.edit className="h-6 w-6" />
                </Button>
                <Button variant={"ghost"}>
                  <Icons.delete className="h-6 w-6" />
                </Button>
              </div>
            </div>
            {index !== designDocumentsData.length - 1 && (
              <hr className="mt-3" />
            )}
          </div>
        );
      })}
      <Button variant={"outline"} className="mt-4 border-brand" size={"lg"}>
        <Icons.attacthmentBrand className="h-6 w-6" />
        <p className="text-brand">Attach File</p>
      </Button>
    </div>
  );
};

const AddNewField = () => {
  return (
    <div className="my-8">
      <Button size={"lg"} className="flex h-12 gap-2">
        <Icons.addCircle className="h-4 w-4" />
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

const InternalNotes = () => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="font-bold">Internal notes</p>
        <Button
          variant={"outline"}
          className="border-brand bg-transparent"
          size={"lg"}
        >
          <Icons.addNote className="h-4 w-4" />
          <p className="text-brand">Add New</p>
        </Button>
      </div>
      {internalNotesData.map((item, index) => {
        const formattedDate = format(new Date(item.date * 1000), "dd-MM-yyyy");
        return (
          <div key={item.id} className="mt-4 rounded border-2 border-black p-4">
            {/* <p className="text-base font-bold">{item.title}</p> */}
            <div className="flex justify-between">
              <p className="mb-4 text-sm">{formattedDate}</p>
              <Icons.menu className="h-4 w-4" />
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
                  <AvatarImage src={item.noteCreator.image} />
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
              <Icons.menu className="h-4 w-4" />
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

interface IDesignDocumentDialog {
  setDesignDocumentsList: React.Dispatch<React.SetStateAction<IFiles[]>>;
}

const DesignDocumentDialog: React.FC<IDesignDocumentDialog> = ({
  setDesignDocumentsList,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
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
          <Icons.attacthmentBrand className="h-6 w-6" />
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
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Icons.upload className="h-12 w-12" />
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
