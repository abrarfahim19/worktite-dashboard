"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/authLib";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await login(data);
      console.log("OK!", response);
      toast("Successfully Logged In!", {
        position: "top-right",
        description: "You will be redirected to Dashboard",
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
      router.push("/dashboard");
    } catch (error) {
      if (error.isAxiosError) {
        console.error("Axios Error:", error);
        // Handle specific Axios errors (e.g., status codes)
      } else {
        console.error("Not Axios Error:", error);
        toast("Invalid Credentials!", {
          position: "top-right",
          description: "Password or email is incorrect",
          // action: {
          //   label: "Undo",
          //   onClick: () => console.log("Undo"),
          // },
        });
        // Handle non-Axios errors (network, etc.)
      }
    }
  };
  return (
    <div className="container bg-brandBackground px-16 py-24">
      <div className="grid grid-cols-7">
        <div className="relative col-span-3">
          <div className="relative h-full w-full">
            <Image
              src={"/images/bg_login.png"}
              layout="fill"
              objectFit="cover"
              quality={100}
              alt="logo"
            />
          </div>
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="relative flex flex-col items-center gap-4  ">
              <p className="text-sm font-semibold">Welcome to</p>
              <h1 className="text-2xl font-bold text-brand">
                Worktite Dashboard
              </h1>
              <p className="w-2/3 text-center  text-sm">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex items-center justify-center bg-white p-10 py-20">
          <div className="w-full">
            <h5 className="mb-4 font-semibold">Login</h5>
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                          className="border-2 border-black"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mb-2 flex w-full flex-row items-center justify-between">
                  <div className="flex w-1/2 items-center gap-2 ">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link href={"/forgotpassword"}>
                    <Button
                      variant={"link"}
                      className="mr-0 inline p-0 font-semibold text-black "
                    >
                      Forgot Password
                    </Button>
                  </Link>
                </div>

                <Button className="w-full" type="submit">
                  {/* <Link href={"/dashboard"}> */}
                  Login
                  {/* </Link> */}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
