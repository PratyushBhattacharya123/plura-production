import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";

type Props = {
  apiEndpoint: "agencyLogo" | "avatar" | "subaccountLogo";
  onChange: (url?: string) => void;
  value?: string;
  buttonName: string;
};

const FileUpload = ({ apiEndpoint, onChange, value, buttonName }: Props) => {
  const type = value?.split(".").pop();
  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== "pdf" ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <Link
              href={value}
              target="_blank"
              rel="noopener_noreferer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </Link>
          </div>
        )}
        <Button variant="ghost" type="button" onClick={() => onChange("")}>
          <div className="flex items-center justify-center gap-2">
            <X className="h-4 w-4 border rounded-[50%] text-red-600 border-red-600" />
            {buttonName}
          </div>
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full bg-muted">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default FileUpload;
