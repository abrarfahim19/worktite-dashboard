import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { apiPost, apiRoutes, convertTo24Hour } from "@/config/common";
import React from "react";
import { Separator } from "../ui/separator";

interface FromToTimeProps {
  id: string;
  disabled?: boolean;
  fromHour?: string;
  fromMinute?: string;
  fromMeridiem?: string;
  toHour?: string;
  toMinute?: string;
  toMeridiem?: string;
}

const FormSchema = z
  .object({
    fromHour: z
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
    fromMinute: z
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
    fromMeridiem: z
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
    toHour: z
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
    toMinute: z
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
    toMeridiem: z
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
  })
  .refine(
    (data) => {
      // Convert the hours to 24-hour format
      const fromHour =
        data.fromMeridiem.toLowerCase() === "pm"
          ? parseInt(data.fromHour) + 12
          : parseInt(data.fromHour);
      const toHour =
        data.toMeridiem.toLowerCase() === "pm"
          ? parseInt(data.toHour) + 12
          : parseInt(data.toHour);

      // Convert the minutes to integers
      const fromMinute = parseInt(data.fromMinute);
      const toMinute = parseInt(data.toMinute);

      // Check if the "from" time is later than the "to" time
      if (fromHour > toHour || (fromHour === toHour && fromMinute > toMinute)) {
        console.log("False");
        toast("`From` time cannot be bigger than `To` time", {
          position: "top-right",
          description: (
            <div>
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(data, null, 2)}
                </code>
              </pre>
            </div>
          ),
          // action: {
          //   label: "Undo",
          //   onClick: () => console.log("Undo"),
          // },
        });

        return false; // Invalid
      }

      console.log("True");
      return true; // Valid
    },
    {
      message: "From time cannot be later than to time",
    },
  );

export const FromToTime: React.FC<FromToTimeProps> = ({
  id,
  disabled,
  fromHour,
  fromMinute,
  fromMeridiem,
  toHour,
  toMinute,
  toMeridiem,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fromHour: fromHour,
      fromMinute: fromMinute,
      fromMeridiem: fromMeridiem,
      toHour: toHour,
      toMinute: toMinute,
      toMeridiem: toMeridiem,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { fromHour, fromMinute, fromMeridiem, toHour, toMinute, toMeridiem } =
      data;
    const started_at = convertTo24Hour(fromHour, fromMinute, fromMeridiem);
    const ended_at = convertTo24Hour(toHour, toMinute, toMeridiem);
    const payload = {
      started_at,
      ended_at,
    };
    try {
      const response = await apiPost(
        apiRoutes.PROTECTED.PROJECTS.WORK_HISTORY.POST(id),
        payload,
      );
      console.log("time uploaded successfully:", response.data);
      form.reset();
    } catch (error) {
      console.error("Error uploading time:", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center justify-center space-y-12"
        >
          <div className="flex gap-24">
            <div>
              <h4 className="font-bold">From</h4>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="fromHour"
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
                  name="fromMinute"
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
                  name="fromMeridiem"
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
                className="mt-6 w-full bg-black"
              />
            </div>

            <div className="flex flex-col">
              <h4 className="self-end font-bold">To</h4>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="toHour"
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
                  name="toMinute"
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
                  name="toMeridiem"
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
                className="mt-6 w-full bg-black"
              />
            </div>
          </div>
          <Button disabled={disabled && disabled} type="submit" size={"lg"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
