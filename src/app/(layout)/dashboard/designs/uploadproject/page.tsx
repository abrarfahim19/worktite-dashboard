"use client";

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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
          <div className="mb-10 h-[300px]">
            <DragAndDrop />
          </div>

          {/* <Button className="mt-2 flex w-full gap-2">
            <Icons.uploadWhite className="h-4 w-4" />
            <p>Upload Image</p>
          </Button> */}
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

const fieldsData = [
  {
    label: "Title",
  },
  {
    label: "Pricing Type",
  },
  {
    label: "Design Type",
  },
  {
    label: "Total Price",
  },
  {
    label: "Duration of the Project",
  },
  {
    label: "Quality",
  },
  {
    label: "Category",
  },
];
const ProjectDetails = () => {
  const [fields, setFields] = useState(fieldsData);
  return (
    <div className="mt-4">
      <p className="mb-2 font-semibold">Project Details</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {fields.map((field) => {
          return (
            <div key={field.label}>
              <Label htmlFor={field.label}>{field.label}</Label>
              <Input
                type="text"
                id={field.label}
                placeholder={field.label}
                className="border-2 border-black"
              />
            </div>
          );
        })}
      </div>
      <AddFieldDialogue fields={fields} setFields={setFields} />
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

interface IFields {
  label: string;
}
interface AddFieldDialogueProps {
  fields: IFields[];
  setFields: React.Dispatch<React.SetStateAction<IFields[]>>;
}

const FieldSchema = z.object({
  label: z.string().min(2, {
    message: "Title shoudl be at leas 2 characters long.",
  }),
});

const AddFieldDialogue: React.FC<AddFieldDialogueProps> = ({
  fields,
  setFields,
}) => {
  const form = useForm<z.infer<typeof FieldSchema>>({
    resolver: zodResolver(FieldSchema),
    defaultValues: {
      label: "",
    },
  });

  function onSubmit(data: z.infer<typeof FieldSchema>) {
    setFields((prevFields) => [...prevFields, data]);
    form.reset(); // Clear the form
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="my-4 flex gap-2 border-brand bg-transparent"
          // onClick={handleCreateNewField}
        >
          <Icons.addCircleBrand className="h-4 w-4" />
          <p className="text-brand">Add New</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full px-10">
        <DialogHeader className="">
          <DialogTitle className="text-center text-lg font-bold text-black">
            Add Data Field
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-center">
              <DialogClose className="my-4 w-full">
                <Button
                  type="submit"
                  className="w-full py-8 text-lg font-semibold"
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
