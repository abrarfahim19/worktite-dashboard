"use client";
import { Icons } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

export const DragAndDrop = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: any) => {
    const turncated =
      file.path.length > 10 ? file.path.substring(0, 10) + "..." : file.path;
    return (
      <li key={file.path}>
        {turncated} - {file.size} bytes
      </li>
    );
  });
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
      <h4 className="my-2 font-semibold">Files</h4>
      <ul>{files}</ul>
    </div>
  );
};
