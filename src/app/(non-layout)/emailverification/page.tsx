"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time verification code must be 6 characters.",
  }),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("This is the Pin:", data);
  };
  return (
    <div className="container p-20">
      <div className="flex items-center justify-center ">
        <div className="w-1/2 bg-white px-10 py-10">
          <h5 className="mb-4 font-semibold">Email Verification</h5>
          <p className="mb-4">
            We sent a code to your Email. Please enter the code below
          </p>
          {/* <Label htmlFor="code">Verification code</Label>
          <Input
            type="text"
            id="code"
            className="mb-4"
            placeholder="12345678"
          /> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-2"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    {/* <FormDescription>
                      Please enter the one-time verification code sent to your
                      email.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-start gap-2">
                <p>Didn’t get the code?</p>
                <Button
                  variant={"link"}
                  className="m-0 inline p-0 font-semibold"
                >
                  Send again
                </Button>
              </div>
              <Button type="submit" className="mb-4 w-full">
                Verify Code
              </Button>
              {/* <Button type="submit">Submit</Button> */}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
