"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathName = usePathname();

  let parts = pathName.split("/");
  parts.pop();
  let newPath = parts.join("/");
  return (
    <div className="px-6">
      <BreadcrumbMenu projectPath={newPath} />
      <ProjectMetaData />
      <GeneralProjectInformation />
      <DesignDocuments />
      <TechnicalDocuments />
      <ArchiveDocuments />
      <BackButton projectPath={newPath} />
    </div>
  );
};

export default Page;

const BreadcrumbMenu = ({ projectPath }: { projectPath: string }) => {
  let parts = projectPath.split("/");
  parts.pop();
  let newPath = parts.join("/");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={newPath}>
              <p>Active Project</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={projectPath}>
              <p>Project Details</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <p className="font-semibold">View Documents</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const projectMetaData = {
  title: "DIY Kitchen",
  categories: "Table",
  pricingType: "Hourly",
  hourlyPrcing: 15,
};

const ProjectMetaData = () => {
  return (
    <div className="mt-6 rounded-md bg-white p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-start">
          <p className="text-regular w-96 font-semibold">Title</p>
          <p className="font-bold">{projectMetaData.title}</p>
        </div>
        <div className="flex justify-start">
          <p className="text-regular w-96 font-semibold">Categories</p>
          <p className="font-bold">{projectMetaData.categories}</p>
        </div>
        <div className="flex justify-start">
          <p className="text-regular w-96 font-semibold">Pricing type</p>
          <p className="font-bold">{projectMetaData.pricingType}</p>
        </div>
        <div className="flex justify-start">
          <p className="text-regular w-96 font-semibold">Hourly Price</p>
          <p className="font-bold">{projectMetaData.hourlyPrcing} $</p>
        </div>
      </div>
    </div>
  );
};

const GeneralProjectInformation = () => {
  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold">General Project Information</h4>
      <div className="mt-6 rounded-md bg-white p-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, repellat
          sint! Nostrum architecto aperiam fuga impedit deleniti consequuntur
          praesentium sunt eligendi iusto cumque soluta dolores quisquam earum
          est non molestiae a consectetur, cupiditate nisi? Laboriosam dolor
          modi officiis! Corporis, sequi!
        </p>
      </div>
    </div>
  );
};

const designDocumentsData = [
  {
    fileType: "PDF",
    fileName: "Design Document 1",
    url: "www.google.com",
    previewUrl:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    fileType: "image",
    fileName: "Sketch no 1",
    previewUrl:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "www.google.com",
  },
];

const DesignDocuments = () => {
  return (
    <div className="mt-6 rounded-md bg-white p-4">
      <h4 className="text-lg font-semibold">Design Documents</h4>
      {designDocumentsData.map((document, index) => {
        return (
          <div key={index} className="mt-4 flex justify-between">
            <div className="flex items-center gap-6">
              <div>
                {document.fileType === "PDF" ? (
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Icons.pdf className="h-12 w-12" />
                  </div>
                ) : (
                  <div className="relative h-12 w-12">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      src={document.previewUrl}
                      alt="project image"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold">{document.fileName}</p>
              </div>
            </div>
            <div>
              <Link href={document.url}>
                <Icons.downloadBlack className="h-6 w-6" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const technicalDocumentsData = [
  {
    fileType: "PDF",
    fileName: "Design Document 1",
    url: "www.google.com",
    previewUrl:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    fileType: "image",
    fileName: "Sketch no 1",
    previewUrl:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "www.google.com",
  },
];

const TechnicalDocuments = () => {
  return (
    <div className="mt-6 rounded-md bg-white p-4">
      <h4 className="text-lg font-semibold">Technical Documents</h4>
      {technicalDocumentsData.map((document, index) => {
        return (
          <div key={index} className="mt-4 flex justify-between">
            <div className="flex items-center gap-6">
              <div>
                {document.fileType === "PDF" ? (
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Icons.pdf className="h-12 w-12" />
                  </div>
                ) : (
                  <div className="relative h-12 w-12">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      src={document.previewUrl}
                      alt="project image"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold">{document.fileName}</p>
              </div>
            </div>
            <div>
              <Link href={document.url}>
                <Icons.downloadBlack className="h-6 w-6" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const archiveDocumentsData = [
  {
    fileType: "PDF",
    fileName: "Design Document 1",
    url: "www.google.com",
    previewUrl:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    fileType: "image",
    fileName: "Sketch no 1",
    previewUrl:
      "https://images.pexels.com/photos/3952048/pexels-photo-3952048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "www.google.com",
  },
];

const ArchiveDocuments = () => {
  return (
    <div className="mt-6 rounded-md bg-white p-4">
      <h4 className="text-lg font-semibold">Archive</h4>
      {archiveDocumentsData.map((document, index) => {
        return (
          <div key={index} className="mt-4 flex justify-between">
            <div className="flex items-center gap-6">
              <div>
                {document.fileType === "PDF" ? (
                  <div className="flex h-12 w-12 items-center justify-center">
                    <Icons.pdf className="h-12 w-12" />
                  </div>
                ) : (
                  <div className="relative h-12 w-12">
                    <Image
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      src={document.previewUrl}
                      alt="project image"
                    />
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold">{document.fileName}</p>
              </div>
            </div>
            <div>
              <Link href={document.url}>
                <Icons.downloadBlack className="h-6 w-6" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BackButton = ({ projectPath }: { projectPath: string }) => {
  return (
    <div className="my-8">
      <Link href={projectPath}>
        <Button
          variant={"outline"}
          className="w-36 border-brand bg-transparent py-8 text-lg font-semibold text-brand"
        >
          Back
        </Button>
      </Link>
    </div>
  );
};
