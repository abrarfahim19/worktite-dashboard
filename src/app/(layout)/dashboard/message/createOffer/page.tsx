import { Timeline } from "@/components/timeline";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <div className="px-4">
        <BreadcrumbMenu />
        <Timeline />
        <MetaData />
        <GeneralInformation />
        <DesignDocuments />
        <TechnicalDocuments />
        <ArchiveDocuments />
        <AddNewField />
        <InternalNotes />
        <MeetingNotes />
        <NextBack />
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
          <BreadcrumbPage>
            <p className="font-semibold">Create an Offer</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const MetaData = () => {
  return (
    <div className="mt-20">
      <div className="flex gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            className="border-2 border-black bg-transparent"
            placeholder="Title Name"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Categories</Label>
          <Input
            type="text"
            id="categories"
            className="border-2 border-black bg-transparent"
            placeholder="Categories"
          />
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Pricing type</Label>
          <Input
            type="text"
            id="title"
            className="border-2 border-black bg-transparent"
            placeholder="Title Name"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Hourly rate</Label>
          <Input
            type="text"
            id="categories"
            className="border-2 border-black bg-transparent"
            placeholder="Categories"
          />
        </div>
      </div>
    </div>
  );
};

const GeneralInformation = () => {
  return (
    <div className="mt-4">
      <Label htmlFor="info">General project information</Label>
      <Textarea
        placeholder="Type your message here."
        className="border-2 border-black bg-transparent"
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
  return (
    <div className="mt-4 rounded bg-white p-4">
      <p className="text-base font-bold">Design Documents</p>
      {designDocumentsData.map((item, index) => {
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
      <Link href={"createOffer/invoice"}>
        <Button size={"lg"}>Next</Button>
      </Link>
      <Button variant={"link"} className="">
        <p className="border-b-2 border-brand">Back</p>
      </Button>
    </div>
  );
};
