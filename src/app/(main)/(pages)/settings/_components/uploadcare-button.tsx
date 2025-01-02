"use client";
import React, { useEffect } from "react";

import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
import { useRouter } from "next/navigation";

type Props = {
  onUpload?: any;
};

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };
  }, []);

  return (
    <div>
      <FileUploaderRegular
        sourceList="local, url, camera, dropbox"
        classNameUploader="uc-dark uc-gray"
        pubkey="bb602b3ee55b2b22cbee"
      />
    </div>
  );
};

export default UploadCareButton;
