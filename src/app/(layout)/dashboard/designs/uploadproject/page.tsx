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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  IMAGE,
  PROJECT_CATEGORY_TYPE,
  PROJECT_DESIGN_TYPE,
  PROJECT_PRICING_TYPE,
  PROJECT_TYPE,
} from "@/config/common";
import { Icons } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { uploadNewProject } from "../manager/manager";

const Page = () => {
  const [uploadResponses, setUploadResponses] = useState<IMAGE[]>([]);
  return (
    <div className="p-4">
      <BreadcrumbMenu />
      <UploadImage
        uploadResponses={uploadResponses}
        setUploadResponses={setUploadResponses}
      />
      <ProjectDetails uploadResponses={uploadResponses} />
    </div>
  );
};

export default Page;

const BreadcrumbMenu = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/designs">
            Worktite design
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">
            Upload New Project
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface UploadImageProps {
  uploadResponses: IMAGE[];
  setUploadResponses: React.Dispatch<React.SetStateAction<IMAGE[]>>;
}

const UploadImage: React.FC<UploadImageProps> = ({
  uploadResponses,
  setUploadResponses,
}) => {
  return (
    <div className="mt-4">
      <p className="mb-4 font-bold">Upload Image</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 ">
          <div className="mb-10 h-[300px]">
            <DragAndDrop
              uploadResponses={uploadResponses}
              setUploadResponses={setUploadResponses}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Value should be at least 1 character long" }),
  pricing_type: z
    .string()
    .min(1, { message: "Please select one" })
    .transform((val) => Number(val)),
  design_type: z
    .string()
    .min(1, { message: "Please select one" })
    .transform((val) => Number(val)),
  price: z
    .string()
    .min(1, { message: "Value should be at least 1 character long" }),
  duration: z
    .string()
    .min(1, { message: "Value should be at least 1 character long" }),
  quantity: z
    .string()
    .min(1, { message: "Value should be at least 1 character long" }),
  category: z
    .string()
    .min(1, { message: "Please select one" })
    .transform((val) => Number(val)),
  project_type: z
    .string()
    .min(1, { message: "Please select one" })
    .transform((val) => Number(val)),
  description: z
    .string()
    .min(1, { message: "Value should be at least 1 character long" }),
  extra_fields: z.record(
    z.string().min(1, { message: "Value should be at least 1 character long" }),
  ),
});

interface ProjectDetailsProps {
  uploadResponses: IMAGE[];
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ uploadResponses }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      // pricing_type: PROJECT_PRICING_TYPE.HOURLY_BASIS,
      // design_type: PROJECT_DESIGN_TYPE.GLOSSY,
      price: "",
      duration: "",
      quantity: "",
      // category: PROJECT_CATEGORY_TYPE.CHAIR,
      // project_type: PROJECT_TYPE.SIMPLE,
      description: "",
      extra_fields: {},
    },
  });

  const onDelete = (key: string) => () => {
    if (form.getValues("extra_fields")) {
      form.unregister(`extra_fields.${key}`);
    }
    if (!form.getValues("extra_fields")) {
      form.setValue(`extra_fields`, {});
    }
  };
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const images = uploadResponses.map((image) => image.id);
    // const transformedData = {
    //   title: data["title"],
    //   pricing_type: Math.round(parseInt(data["pricing_type"])),
    //   design_type: Math.round(parseInt(data["design_type"])),
    //   price: data["price"],
    //   duration: Math.round(parseInt(data["duration"])),
    //   quantity: Math.round(parseInt(data["quantity"])),
    //   category: Math.round(parseInt(data["category"])),
    //   project_type: Math.round(parseInt(data["project_type"])),
    //   description: data["description"],
    // };

    // const payload = {
    //   ...transformedData,
    //   extra_fields,
    //   images,
    // };
    const payload = {
      ...data,
      images,
    };
    console.log("This is data", payload);
    // const payload = {
    //   ...data,
    //   images,
    // };
    // console.log("Upload project data: ", payload);
    await uploadNewProject(payload);
  };
  return (
    <FormProvider {...form}>
      <div className="mt-4">
        <p className="mb-2 font-semibold">Project Details</p>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-x-4 gap-y-2"
            >
              <div className="col-span-1 w-full">
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

              <div className="col-span-1 w-full">
                <FormField
                  control={form.control}
                  name="project_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full border-2 border-black bg-transparent">
                            <SelectValue placeholder="Project Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={PROJECT_TYPE.SIMPLE.toString()}>
                            Simple
                          </SelectItem>
                          <SelectItem value={PROJECT_TYPE.COMPLEX.toString()}>
                            Complex
                          </SelectItem>
                          <SelectItem value={PROJECT_TYPE.ANY.toString()}>
                            Complex
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 w-full">
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

              <div className="col-span-1 w-full">
                <FormField
                  control={form.control}
                  name="design_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Design Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full border-2 border-black bg-transparent">
                            <SelectValue placeholder="Select Design Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            value={PROJECT_DESIGN_TYPE.MATERIAL.toString()}
                          >
                            Material
                          </SelectItem>
                          <SelectItem
                            value={PROJECT_DESIGN_TYPE.GLOSSY.toString()}
                          >
                            Complex
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 w-full">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Price</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Total Price of the Project"
                          {...field}
                          className="border-2 border-black bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 w-full">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (number of days)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Duration of the project"
                          {...field}
                          className="border-2 border-black bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 w-full">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Quantity"
                          {...field}
                          className="border-2 border-black bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 w-full">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        // defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full border-2 border-black bg-transparent">
                            <SelectValue placeholder="Category Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            value={PROJECT_CATEGORY_TYPE.CHAIR.toString()}
                          >
                            Chair
                          </SelectItem>
                          <SelectItem
                            value={PROJECT_CATEGORY_TYPE.DESK.toString()}
                          >
                            Desk
                          </SelectItem>
                          <SelectItem
                            value={PROJECT_CATEGORY_TYPE.TABLE.toString()}
                          >
                            Bookself
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 w-full">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description about the project</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          {...field}
                          className="border-2 border-black bg-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {Object?.keys(form.getValues("extra_fields"))?.map((key) => {
                return (
                  <div key={key} className="relative col-span-1 w-full">
                    <X
                      onClick={onDelete(key)}
                      className="absolute right-0 top-3 h-4 w-4 cursor-pointer rounded-full bg-brand text-white"
                    />
                    <FormField
                      control={form.control}
                      name={`extra_fields.${key}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{key}</FormLabel>
                          <FormControl>
                            <Input
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
              })}

              <div className="col-span-2">
                <AddFieldDialogue />
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
      </div>
    </FormProvider>
  );
};

interface AddFieldDialogueProps {
  // setFieldsData: React.Dispatch<
  //   React.SetStateAction<z.infer<typeof FormSchema>>
  // >;
}

const FieldSchema = z.object({
  label: z.string().min(2, {
    message: "Title should be at least 2 characters long.",
  }),
});

const AddFieldDialogue: React.FC<AddFieldDialogueProps> = () => {
  const parentForm = useFormContext();
  const form = useForm<z.infer<typeof FieldSchema>>({
    resolver: zodResolver(FieldSchema),
    defaultValues: {
      label: "",
    },
  });

  function onSubmit(data: z.infer<typeof FieldSchema>) {
    const label = data.label;
    if (label !== null) {
      parentForm.setValue(`extra_fields.${label}`, "");
    }
    form.reset(); // Clear the form
  }

  const stopPropagate = (callback: () => void) => {
    return (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      callback();
    };
  };

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
          <form onSubmit={stopPropagate(form.handleSubmit(onSubmit))}>
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
                  // onClick={form.handleSubmit(onSubmit)}
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
