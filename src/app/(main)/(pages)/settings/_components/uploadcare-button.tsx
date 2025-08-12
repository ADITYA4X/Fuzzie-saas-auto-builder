/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useRef } from "react";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

type Props = {
  onUpload?: (cdnUrl: string) => Promise<any>;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const ctxProviderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload?.(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };
    const currentRef = ctxProviderRef.current;

    if (currentRef) {
      currentRef.addEventListener("file-upload-success", handleUpload);
    }

    // Cleanup on component unmount
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("file-upload-success", handleUpload);
      }
    };
  }, [onUpload, router]);

  return (
    <div ref={ctxProviderRef}>
      <FileUploaderRegular
        sourceList="local, url, camera, dropbox"
        classNameUploader="uc-dark uc-gray"
        pubkey="bb602b3ee55b2b22cbee"
      />
    </div>
  );
};

export default UploadCareButton;
