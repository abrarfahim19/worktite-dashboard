import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container p-20">
      <div className="flex items-center justify-center ">
        <div className="w-1/2 bg-white px-10 py-10">
          <h5 className="mb-4 font-semibold">Email Verification</h5>
          <p className="mb-4">
            We sent a code to your Email. Please enter the code below
          </p>
          <Label htmlFor="code">Verification code</Label>
          <Input
            type="text"
            id="code"
            className="mb-4"
            placeholder="12345678"
          />
          <div className="mb-4 flex items-center justify-start gap-2">
            <p>Didn’t get the code?</p>
            <Button variant={"link"} className="m-0 inline p-0 font-semibold">
              Send again
            </Button>
          </div>
          <Link href={"/resetpassword"}>
            <Button className="mb-4 w-full">Verify Code</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
