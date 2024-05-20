"use client";
import { apiDelete, apiPost, apiRoutes } from "@/config/common";
import { Icons } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

interface ImageResponse {
  id: number;
  thumbnail: string;
  created_at: string;
  updated_at: string;
  image: string;
  created_by: number;
}

export const DragAndDrop = () => {
  const [uploadResponses, setUploadResponses] = useState<ImageResponse[]>([]);
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
  const handleUpload = async () => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await apiPost(apiRoutes.FILES.IMAGES.POST, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("File uploaded successfully:", response.data);
        setUploadResponses((prevResponses) => [
          ...prevResponses,
          response.data,
        ]);
        setA;
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No files to upload");
    }
  };
  const imageDeleteHandler = async (id: number) => {
    try {
      const response = await apiDelete(apiRoutes.FILES.IMAGES.DELETE(id));
      console.log("File deleted successfully:", response.data);
      setUploadResponses((prevResponses) =>
        prevResponses.filter((response) => response.id !== id),
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-x-4">
      <div className="col-span-1 h-[200px] w-full items-center justify-center">
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
              Drag and drop or click to upload your image. Upload 1 Image at a
              time.
            </p>
          </div>
        </div>
        <ul className="my-2 font-semibold">File Ready To Upload:</ul>
        <p>{files}</p>
        <div>
          <Button className="mt-2 flex w-full gap-2" onClick={handleUpload}>
            <Icons.uploadWhite className="h-4 w-4" />
            <p>Upload Image</p>
          </Button>
        </div>
      </div>
      <div>
        <h3 className="font-bold">Uploaded Image</h3>
        <div className="grid grid-cols-2 gap-4">
          {uploadResponses.map((response) => (
            <div key={response.id} className="relative col-span-1 h-36 rounded">
              <div className="absolute right-10 top-2 z-30 h-4 w-4 rounded-md bg-red-400">
                <Button
                  className="bg-white"
                  onClick={() => imageDeleteHandler(response.id)}
                >
                  <Icons.delete className="h-4 w-4" />
                </Button>
              </div>
              <Image
                src={response.image}
                fill={true}
                alt="Uploaded Image"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
