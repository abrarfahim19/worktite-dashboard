import { DragAndDrop } from "@/components/dragAndDrop";
import { ImageLoadProgress } from "@/components/imageLoadProgress";
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
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4">
      <BreadcrumbMenu />
      <UploadImage />
      <ProjectDetails />
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
            <Link href="/dashboard/designs">
              <p>Worktite design</p>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <p className="font-semibold">Upload New Project</p>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const UploadImage = () => {
  return (
    <div className="mt-4">
      <p className="mb-4 font-bold">Upload Image</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 ">
          <div className="h-[300px]">
            <DragAndDrop />
          </div>
        </div>
        <div className="col-span-1 rounded bg-white p-4">
          <ImageLoadProgress name="Photo1.jpg" progress={0} />
          <ImageLoadProgress name="Photo2.jpg" progress={0} />
          <ImageLoadProgress name="Photo3.jpg" progress={0} />
          <ImageLoadProgress name="Photo4.jpg" progress={0} />
          <Button className="mt-2 flex w-full gap-2">
            <Icons.uploadWhite className="h-4 w-4" />
            <p>Upload Image</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  return (
    <div className="mt-4">
      <p className="mb-2 font-semibold">Project Details</p>
      {/* <div className="grid w-full max-w-sm items-center gap-1.5"> */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="pricing">Pricing Type</Label>
          <Input
            type="text"
            id="pricing"
            placeholder="Pricing"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="design">Design Type</Label>
          <Input
            type="text"
            id="design"
            placeholder="Design Type"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="total">Total price</Label>
          <Input
            type="text"
            id="total"
            placeholder="Total Price"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration of the project</Label>
          <Input
            type="text"
            id="duration"
            placeholder="Duration"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="quality">Quality</Label>
          <Input
            type="text"
            id="quality"
            placeholder="Quality"
            className="border-2 border-black"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            type="text"
            id="category"
            placeholder="category"
            className="border-2 border-black"
          />
        </div>
      </div>
      <Button
        variant={"outline"}
        className="my-4 flex gap-2 border-brand bg-transparent"
      >
        <Icons.addCircleBrand className="h-4 w-4" />
        <p className="text-brand">Add New</p>
      </Button>
      <Label htmlFor="description">Description about Project</Label>
      <Textarea
        id="description"
        className="border-2 border-black bg-transparent"
      />
      <div className="mt-4">
        <Button size={"lg"}>Publish</Button>
        <Button variant={"link"}>
          <p className="text-brand underline">Cancel</p>
        </Button>
      </div>
      {/* </div> */}
    </div>
  );
};
