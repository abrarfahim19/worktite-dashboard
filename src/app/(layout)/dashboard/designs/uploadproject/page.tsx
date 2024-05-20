"use client";

import { DragAndDrop } from "@/components/dragAndDrop";
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
        <div className="col-span-2 ">
          <div className="mb-10 h-[300px]">
            <DragAndDrop />
          </div>

          {/* <Button className="mt-2 flex w-full gap-2">
            <Icons.uploadWhite className="h-4 w-4" />
            <p>Upload Image</p>
          </Button> */}
        </div>
        {/* <div className="col-span-1 rounded bg-white p-4">
          <ImageLoadProgress name="Photo1.jpg" progress={0} />
          <ImageLoadProgress name="Photo2.jpg" progress={0} />
          <ImageLoadProgress name="Photo3.jpg" progress={0} />
          <ImageLoadProgress name="Photo4.jpg" progress={0} />
          <Button className="mt-2 flex w-full gap-2">
            <Icons.uploadWhite className="h-4 w-4" />
            <p>Upload Image</p>
          </Button>
        </div> */}
      </div>
    </div>
  );
};

const FormSchema = z.record(
  z.string().min(1, {
    message: "Value should be at least 1 character long",
  }),
);

const ProjectDetails = () => {
  const [fieldsData, setFieldsData] = useState<z.infer<typeof FormSchema>>({
    Title: "",
    "Pricing Type": "",
    "Design Type": "",
    "Total Price": "",
    "Duration of the Project": "",
    Quality: "",
    Category: "",
    "Description About Project": "",
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: fieldsData,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <div className="mt-4">
      <p className="mb-2 font-semibold">Project Details</p>
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-4 gap-y-2"
          >
            {Object.keys(fieldsData).map((key) => {
              if (key === "Description About Project")
                return (
                  <div key={key} className="col-span-2 w-full">
                    <FormField
                      key={key}
                      control={form.control}
                      name={key}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{key}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={key}
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
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={key}
                          {...field}
                          className="border-2 border-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
            <div className="col-span-2">
              <AddFieldDialogue setFieldsData={setFieldsData} />
            </div>
            <div className="col-span-2 mt-4">
              <Button size={"lg"} type="submit">
                Publish
              </Button>
              <Button variant={"link"}>
                <p className="text-brand underline">Cancel</p>
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* </div> */}
    </div>
  );
};

interface AddFieldDialogueProps {
  setFieldsData: React.Dispatch<
    React.SetStateAction<z.infer<typeof FormSchema>>
  >;
}

const FieldSchema = z.object({
  label: z.string().min(2, {
    message: "Title should be at least 2 characters long.",
  }),
});

const AddFieldDialogue: React.FC<AddFieldDialogueProps> = ({
  setFieldsData,
}) => {
  const form = useForm<z.infer<typeof FieldSchema>>({
    resolver: zodResolver(FieldSchema),
    defaultValues: {
      label: "",
    },
  });

  function onSubmit(data: z.infer<typeof FieldSchema>) {
    const label = data.label;
    if (label !== null) {
      setFieldsData((prev) => ({ ...prev, [label]: "" }));
    }
    form.reset(); // Clear the form
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="my-4 flex w-1/4 gap-2 border-brand bg-transparent"
        >
          <Icons.addCircleBrand className="h-4 w-4" />
          <p className="text-brand">Add New Field</p>
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
