import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import React from "react";
import { Separator } from "../ui/separator";

interface InputTimeFormProps {
  disabled?: boolean;
  hour?: string;
  minute?: string;
  meridiem?: string;
}

const FormSchema = z.object({
  hour: z
    .string({
      required_error: "Hours?",
    })
    .refine(
      (time) => {
        console.log("Time", time);
        const hours = Number(time);
        return hours >= 0 && hours <= 12;
      },
      {
        message: "Invalid time",
      },
    ),
  minute: z
    .string({
      required_error: "Minutes?",
    })
    .refine(
      (time) => {
        const minutes = Number(time);
        return minutes >= 0 && minutes < 60;
      },
      {
        message: "Invalid time",
      },
    ),
  meridiem: z
    .string({
      required_error: "meridiem",
    })
    .refine(
      (meridiem) => {
        return meridiem === "am" || "pm";
      },
      {
        message: "Meridiem?",
      },
    ),
});

export const InputTimeForm: React.FC<InputTimeFormProps> = ({
  disabled,
  hour,
  minute,
  meridiem,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hour: hour,
      minute: minute,
      meridiem: meridiem,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following Time:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="hour"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel></FormLabel>
                <FormControl>
                  <InputOTP maxLength={2} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot className="border-brand" index={0} />
                      <InputOTPSlot className="border-brand" index={1} />
                    </InputOTPGroup>
                    <p className="font-semibold">h</p>
                  </InputOTP>
                </FormControl>
                <FormMessage className="absolute bottom-[-20px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minute"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel></FormLabel>
                <FormControl>
                  <InputOTP maxLength={2} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot className="border-brand" index={0} />
                      <InputOTPSlot className="border-brand" index={1} />
                    </InputOTPGroup>
                    <p className="font-semibold">m</p>
                  </InputOTP>
                </FormControl>
                <FormMessage className="absolute bottom-[-20px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meridiem"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel></FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[95px]">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="am">AM</SelectItem>
                    <SelectItem value="pm">PM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="absolute bottom-[-20px]" />
              </FormItem>
            )}
          />
        </div>
        <Separator
          orientation="horizontal"
          color="black"
          className="w-full bg-black"
        />

        <Button disabled={disabled && disabled} type="submit" size={"lg"}>
          Add
        </Button>
      </form>
    </Form>
  );
};
