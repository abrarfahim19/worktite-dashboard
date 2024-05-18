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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };
  return (
    <div className="container p-20">
      <div className="flex items-center justify-center ">
        <div className="w-1/2 bg-white px-10 py-10">
          <h5 className="mb-4 font-semibold">Forgot Password</h5>
          <p className="mb-4">
            Enter your email address below and we’ll send you a code to reset
            your password
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        {...field}
                        className="border-2 border-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Link href={"/emailverification"}> */}
              <Button className="my-4 w-full" type="submit">
                Submit
              </Button>
              {/* </Link> */}
              <Button
                variant={"link"}
                className=" w-full self-center font-semibold underline "
              >
                <Link href={"/login"}>Go Back</Link>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
