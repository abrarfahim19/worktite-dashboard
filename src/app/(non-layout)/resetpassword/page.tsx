import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container p-20">
      <div className="flex items-center justify-center ">
        <div className="w-1/2 bg-white px-10 py-10">
          <h5 className="mb-4 font-semibold">Reset your password</h5>
          <p className="mb-4">Please enter your new password bellow.</p>
          <Label htmlFor="password">New password</Label>
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
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
