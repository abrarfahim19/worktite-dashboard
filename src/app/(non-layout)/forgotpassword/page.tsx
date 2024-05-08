import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container p-20">
      <div className="flex items-center justify-center ">
        <div className="w-1/2 bg-white px-10 py-10">
          <h5 className="mb-4 font-semibold">Forgot Password</h5>
          <p className="mb-4">
            Enter your email address below and we’ll send you a code to reset
            your password
          </p>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            className="mb-4"
            placeholder="johndoe@gmail.com"
          />

          <Link href={"/emailverification"}>
            <Button className="mb-4 w-full">Submit</Button>
          </Link>

          <Button
            variant={"link"}
            className=" w-full self-center font-semibold underline "
          >
            <Link href={"/login"}>Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
