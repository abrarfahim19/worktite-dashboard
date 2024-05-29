"use client";
import { StaticTimeline } from "@/components/timeline";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/lib/utils";
import Link from "next/link";
import { useDropzone } from "react-dropzone";

const steps = [
  {
    name: "General documents",
    is_complete: true,
  },
  {
    name: "Invoice",
    is_complete: true,
  },
  {
    name: "Confirmation",
    is_complete: false,
  },
];
const Page = () => {
  return (
    <div>
      <div className="px-4">
        <BreadcrumbMenu />
        <StaticTimeline steps={steps} />
        <UploadDocuments />
        <CreateInvoice />
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
          <BreadcrumbLink>
            <Link href="/dashboard/message">
              <p>Message</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/dashboard/message/createOffer">
              <p>Create an Offer</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <p className="font-semibold">Invoice</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const UploadDocuments = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: any) => {
    const turncated =
      file.path.length > 10 ? file.path.substring(0, 10) + "..." : file.path;
    return (
      <li key={file.path}>
        {turncated} - {file.size} bytes
      </li>
    );
  });
  return (
    <div className="mt-20">
      <div className="w-full">
        <h5 className="text-md font-semibold">Upload PDF (Optional)</h5>
        <div className="mt-4 flex gap-4">
          <div className="w-full items-center justify-center">
            <div
              {...getRootProps({
                className:
                  "h-48 w-full rounded-md border-[1px] border-dashed border-black bg-transparent flex justify-center items-center ",
              })}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <Icons.upload className="h-12 w-12" />
                <p className="w-1/2 text-xs">
                  Drag and drop or click to upload your invoice
                </p>
              </div>
            </div>
            <ul>{files}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateInvoice = () => {
  return (
    <div className="mt-6">
      <div className="flex">
        <InvoiceSentDialog />
        <Button variant={"link"} size={"lg"}>
          <p className="border-b-2 border-brand text-brand">Send</p>
        </Button>
      </div>
    </div>
  );
};

const InvoiceSentDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {/* <Button
            type="button"
            variant={"link"}
            className={`w-full py-8 text-lg font-semibold underline `}
            // onClick={additionalInvoiceHandler}
          >
            Create Invoice
          </Button> */}

          <Button size={"lg"}>Create Invoice </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="">
            <DialogTitle className="text-center">Thank you</DialogTitle>
            <DialogTitle className="text-center">
              Invoice has been sent
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <Icons.thankYou className="h-44 w-44" />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Link href={"/dashboard/message"} className="w-full py-6">
                <Button type="submit" className="w-full">
                  Done
                </Button>
              </Link>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
