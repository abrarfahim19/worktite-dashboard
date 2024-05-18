"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  password: z.string().min(6, "Password is too short"),
  passwordre: z.string().min(6, "Password is too short"),
});

const Page = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      passwordre: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <div className="container p-20">
      <div className="flex items-center justify-center ">
        <div className="w-1/2 bg-white px-10 py-10">
          <h5 className="mb-4 font-semibold">Reset your password</h5>
          <p className="mb-4">Please enter your new password bellow.</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="mb-4">
                    <FormLabel htmlFor="password">New password</FormLabel>
                    <Input
                      type="password"
                      id="password"
                      placeholder="************"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="passwordre"
                render={({ field }) => (
                  <div className="mb-4">
                    <FormLabel htmlFor="passwordre">Retype password</FormLabel>
                    <Input
                      type="password"
                      id="passwordre"
                      placeholder="************"
                      {...field}
                    />

                    <FormMessage />
                  </div>
                )}
              />
              <Button className="mb-4 w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
          {/* <Label htmlFor="password">New password</Label>
          <Input
            type="passwod"
            id="password"
            className="mb-4"
            placeholder="************"
          />

          <Label htmlFor="passwordre">Retype password</Label>
          <Input
            type="passwod"
            id="passwordre"
            className="mb-4"
            placeholder="************"
          />
          <Link href={"/emailverification"}>
            <Button className="mb-4 w-full">Submit</Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
