"use client";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, Icons, truncateText } from "@/lib/utils";
import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FieldType {
  value: string;
  label: string;
}

interface CustomStatusProps {
  statuses: FieldType[];
}

export const CustomStatus: React.FC<CustomStatusProps> = ({ statuses }) => {
  const [fields, setFields] = useState<FieldType[]>(statuses);
  const [fieldItem, setFieldItem] = useState<FieldType>(fields[0]);
  const [open, setOpen] = useState(false);
  const deleteFieldItemHandler = (item: FieldType) => {
    setFields(fields.filter((field) => field.value !== item.value));
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("w-[200px] justify-between")}
        >
          {truncateText(fieldItem.label, 20)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandGroup>
            {fields.map((item) => (
              <div key={item.value} className="flex">
                <Button
                  variant={"ghost"}
                  key={item.value}
                  onClick={() => {
                    setFieldItem(item);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full justify-start text-left",
                    item.value === fieldItem.value
                      ? " font-bold text-brand"
                      : "",
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.value === fieldItem.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item.label}
                </Button>
                <div className="flex gap-2 justify-self-end">
                  <EditStatusDialogue
                    setOpen={setOpen}
                    fields={fields}
                    fieldItem={fieldItem}
                    item={item}
                    setFieldItem={setFieldItem}
                    setFields={setFields}
                  />
                  {fieldItem.value !== item.value ? (
                    <Button
                      variant={"ghost"}
                      onClick={() => deleteFieldItemHandler(item)}
                    >
                      <Icons.delete className="ml-auto h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant={"ghost"} disabled>
                      <Icons.delete className="ml-auto h-4 w-4 opacity-0" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <AddStatusDialogue
              setOpen={setOpen}
              fields={fields}
              setFieldItem={setFieldItem}
              setFields={setFields}
            />
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface AddStatusDialogueProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fields: FieldType[];
  setFields: React.Dispatch<React.SetStateAction<FieldType[]>>;
  setFieldItem: React.Dispatch<React.SetStateAction<FieldType>>;
}

const AddStatusDialogue: React.FC<AddStatusDialogueProps> = ({
  setOpen,
  fields,
  setFields,
  setFieldItem,
}) => {
  const [newStatus, setNewStatus] = useState<FieldType>({
    value: "",
    label: "",
  });
  const addStatusHandler = (event: FormEvent) => {
    event.preventDefault();
    setFields([...fields, newStatus]);
    setFieldItem(newStatus);
    console.log("Status Added");
    setOpen(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("w-full justify-start text-left")}
        >
          <PlusCircle className={cn("mr-2 h-4 w-4", "opacity-100")} />
          Add Status
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full px-10">
        <DialogHeader className="">
          <DialogTitle className="text-center text-lg font-bold text-black">
            Add A New Status
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>

        <form
          action="
          "
          onSubmit={addStatusHandler}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-full">
              <Label htmlFor="status" className="">
                Status Name
              </Label>
              <Input
                type="text"
                id="status"
                placeholder="Status Name"
                className="mb-6 mt-2 border-black py-6"
                onChange={(e) => {
                  setNewStatus({
                    value: e.target.value,
                    label: e.target.value,
                  });
                }}
                // className="w-full border-black bg-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="submit" className="w-full py-8 text-lg font-semibold">
              Add Status
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface EditStatusDialogueProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: FieldType;
  fieldItem: FieldType;
  fields: FieldType[];
  setFields: React.Dispatch<React.SetStateAction<FieldType[]>>;
  setFieldItem: React.Dispatch<React.SetStateAction<FieldType>>;
}

const EditStatusDialogue: React.FC<EditStatusDialogueProps> = ({
  setOpen,
  item,
  fieldItem,
  fields,
  setFields,
  setFieldItem,
}) => {
  const [newStatus, setNewStatus] = useState<FieldType>({
    value: item.value,
    label: item.label,
  });
  const editStatusHandler = (event: FormEvent) => {
    event.preventDefault();
    setFields(
      fields.map((field) => (field.value === item.value ? newStatus : field)),
    );
    if (item.value === fieldItem.value) setFieldItem(newStatus);
    setOpen(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Icons.edit className="ml-auto h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full px-10">
        <DialogHeader className="">
          <DialogTitle className="text-center text-lg font-bold text-black">
            Edit Status
          </DialogTitle>
          <DialogDescription className=""></DialogDescription>
        </DialogHeader>

        <form
          action="
          "
          onSubmit={editStatusHandler}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-full">
              <Label htmlFor="status" className="">
                Status Name
              </Label>
              <Input
                type="text"
                id="status"
                defaultValue={item.value}
                placeholder="Status Name"
                className="mb-6 mt-2 border-black py-6"
                onChange={(e) => {
                  setNewStatus({
                    value: e.target.value,
                    label: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="submit" className="w-full py-8 text-lg font-semibold">
              Edit Status
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Check, ChevronsUpDown } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Command, CommandGroup, CommandList } from "@/components/ui/command";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";
// import { useToast } from "../ui/use-toast";

// const languages = [
//   { label: "English", value: "en" },
//   { label: "French", value: "fr" },
//   { label: "German", value: "de" },
//   { label: "Spanish", value: "es" },
//   { label: "Portuguese", value: "pt" },
//   { label: "Russian", value: "ru" },
//   { label: "Japanese", value: "ja" },
//   { label: "Korean", value: "ko" },
//   { label: "Chinese", value: "zh" },
// ] as const;

// const FormSchema = z.object({
//   language: z.string({
//     required_error: "Please select a language.",
//   }),
// });

// export function ComboboxForm() {
//   const { toast } = useToast();
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   });

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     {
//       console.log("Form data: ", data);
//     }
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="language"
//           render={({ field }) => (
//             <FormItem className="flex flex-col">
//               <FormLabel>Language</FormLabel>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <FormControl>
//                     <Button
//                       variant="outline"
//                       role="combobox"
//                       className={cn(
//                         "w-[200px] justify-between",
//                         !field.value && "text-muted-foreground",
//                       )}
//                     >
//                       {field.value
//                         ? languages.find(
//                             (language) => language.value === field.value,
//                           )?.label
//                         : "Select language"}
//                       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                     </Button>
//                   </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-[200px] p-0">
//                   <Command>
//                     <CommandGroup>
//                       <CommandList>
//                         {languages.map((language) => (
//                           <Button
//                             variant={"outline"}
//                             key={language.value}
//                             onClick={() => {
//                               form.setValue("language", language.value);
//                             }}
//                           >
//                             <Check
//                               className={cn(
//                                 "mr-2 h-4 w-4",
//                                 language.value === field.value
//                                   ? "opacity-100"
//                                   : "opacity-0",
//                               )}
//                             />
//                             {language.label}
//                           </Button>
//                         ))}
//                       </CommandList>
//                     </CommandGroup>
//                   </Command>
//                 </PopoverContent>
//               </Popover>
//               <FormDescription>
//                 This is the language that will be used in the dashboard.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }
