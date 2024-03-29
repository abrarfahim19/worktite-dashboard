import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
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
            <Label htmlFor="email">Your Email</Label>
            <Input
              type="email"
              id="email"
              className="mb-2"
              placeholder="johndoe@gmail.com"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              className="mb-2"
              placeholder="....."
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

            <Button className="w-full">
              <Link href={"/dashboard"}>Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
