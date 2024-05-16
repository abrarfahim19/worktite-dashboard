"use client";
import { Icons } from "@/lib/utils";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

export const DragAndDrop = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpeg", ".jpg", ".png"],
    },
  });

  const files = acceptedFiles.map((file: any) => {
    const turncated =
      file.path.length > 10 ? file.path.substring(0, 10) + "..." : file.path;
    return (
      <li key={file.path}>
        {turncated} - {file.size} bytes
      </li>
    );
  });
  const handleUpload = () => {
    console.log("Upload Image");
  };
  return (
    <div className="h-full w-full items-center justify-center">
      <div
        {...getRootProps({
          className:
            "h-full w-full rounded-md border-[1px] border-dashed border-black bg-transparent flex justify-center items-center ",
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Icons.upload className="h-12 w-12" />
          <p className="w-1/2 text-xs">
            Drag and drop or click to upload your invoice
          </p>
        </div>
      </div>
      <ul>
        File Ready To Upload: <span>{files}</span>
      </ul>
      <div>
        <Button className="mt-2 flex w-full gap-2" onClick={handleUpload}>
          <Icons.uploadWhite className="h-4 w-4" />
          <p>Upload Image</p>
        </Button>
      </div>
    </div>
  );
};
