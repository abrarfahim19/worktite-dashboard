import {z} from "zod";
import React from "react";
import {useForm, useFormContext} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {convertSpaceToUnderscore} from "@/config/common";
import {
    Dialog, DialogClose,
    DialogContent, DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Icons} from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

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
        const label = convertSpaceToUnderscore(data.label);
        if (label !== null) {
            parentForm.setValue(`extra_fields.${label}`, "");
        }
        form.reset(); // Clear the form
    }

    const stopPropagate = (callback: (event: React.FormEvent<HTMLFormElement>) => void) => {
        return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            callback(event);
            event.stopPropagation();
        };
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    className="my-4 flex w-1/4 gap-2 border-brand bg-transparent"
                >
                    <Icons.addCircleBrand className="h-4 w-4"/>
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
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title Name" {...field} />
                                    </FormControl>
                                    <FormMessage/>
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
export default AddFieldDialogue;