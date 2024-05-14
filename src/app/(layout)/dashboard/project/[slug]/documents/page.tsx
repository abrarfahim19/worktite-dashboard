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
import { apiRoutes } from "@/config/common";
import useDataFetch from "@/hooks/useDataFetch";
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
      <ProjectMetaData projectPath={newPath} />
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
  console.log("Project ID:", projectPath.split("/")[3]);
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

interface IProjectMetaDataProps {
  projectPath: string;
}

interface IProject {
  id: number;
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
  category: number;
  client: number;
}

const ProjectMetaData: React.FC<IProjectMetaDataProps> = ({ projectPath }) => {
  const projectPk = projectPath.split("/")[3];
  const { data, isLoading } = useDataFetch<IProject>(
    apiRoutes.PROTECTED.PROJECTS.PROJECT.GET(projectPk),
  );
  return (
    <div>
      <div className="mt-6 rounded-md bg-white p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-start">
            <p className="text-regular w-96 font-semibold">Title</p>
            <p className="font-bold">
              {isLoading ? "Loading..." : data?.title}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="text-regular w-96 font-semibold">Categories</p>
            <p className="font-bold">{data?.category}</p>
          </div>
          <div className="flex justify-start">
            <p className="text-regular w-96 font-semibold">Pricing type</p>
            <p className="font-bold">{data?.pricing_type}</p>
          </div>
          <div className="flex justify-start">
            <p className="text-regular w-96 font-semibold">Hourly Price</p>
            <p className="font-bold">This is not found!!!</p>
          </div>
        </div>
      </div>
      <GeneralProjectInformation description={data?.description} />
    </div>
  );
};

interface IProjectDescriptionProps {
  description?: string;
}

const GeneralProjectInformation: React.FC<IProjectDescriptionProps> = ({
  description,
}) => {
  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold">General Project Information</h4>
      <div className="mt-6 rounded-md bg-white p-4">
        <p>{description}</p>
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
