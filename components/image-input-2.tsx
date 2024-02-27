import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Dropzone from "react-dropzone";
import ModalImageGallery from "@/components/modal-image-gallery";
import GalleryImages from "@/public/json/image-gallery-app.json";
import UploadingIcon from "public/images/upload-file/uploading-icon-white.svg";
import LoadingIcon from "public/images/loading-icon.svg";

const ImageInput = ({
  selectedFile,
  setSelectedFile,
  useDefaultImage = true,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingCover, setLoadingCover] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const uploadFile = async (newFile: any, callback: any) => {
    try {
      const response = await axios.post("/api/upload/s3/asset", newFile);

      if (response.status === 200) {
        const data = response.data;
        callback(data.link);
        return data;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCoverChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files) {
      // console.log(e.target.files)
      Array.from(e.target.files).map((newFileObj) => {
        const newFile = new FormData();
        // return
        newFile.append("input-file-upload", newFileObj);
        newFile.append("file-dir", "cover_image/nft");
        setLoadingCover(true);
        const uploadedFile = uploadFile(newFile, (uploadedFile: string) => {
          setSelectedFile(uploadedFile);
          setLoadingCover(false);
        });
      });
      // handleFiles(e.target.files);
    }
  };

  const handleFileDrop = (acceptedFiles: any) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRandomCover = () => {
    const randomIndex = Math.floor(Math.random() * GalleryImages.length);
    setSelectedFile(GalleryImages[randomIndex]);
  };

  return (
    <>
      <div className="flex w-60 flex-col gap-4">
        <label
          className="form-label mb-1 self-start text-sm font-semibold text-[#DDD] lg:text-base"
          htmlFor="email"
        >
          Cover Image
        </label>
        <Dropzone
          onDrop={handleFileDrop}
          accept={{ "image/*": [] }}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone cursor-pointer " {...getRootProps()}>
              <input
                {...getInputProps()}
                onChange={handleCoverChange}
                ref={inputRef}
              />
              {loadingCover ? (
                <Image
                  width={30}
                  height={30}
                  className={"animate-spin"}
                  src={LoadingIcon}
                  alt="Loading Icon"
                />
              ) : useDefaultImage ? (
                <Image
                  src={selectedFile}
                  alt="Edit Preview"
                  width={250}
                  height={250}
                  className="rounded-2xl object-cover"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center rounded-md border-2 border-dashed border-[#777E90] px-2 py-12 text-center">
                  <p className="text-xs text-white">Drop your files here OR</p>
                  <p className="text-xs text-[#01F7FF]">Click here to browse</p>
                  <p className="text-xs text-[#777E90]">
                    PNG, GIF, WEBP,PDF or JPEG. Max 250MB.
                  </p>
                </div>
              )}
            </div>
          )}
        </Dropzone>
        <div className="flex flex-col gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsImageModalOpen(true);
            }}
            className="rounded-md bg-[#01F7FF] px-1 py-2 text-xs font-semibold text-black hover:brightness-75"
          >
            CHOOSE IMAGE FROM GALLERY
          </button>
          <button
            onClick={handleChangeImage}
            className="rounded-md bg-[#01F7FF] px-1 py-2 text-xs font-semibold text-black hover:brightness-75"
          >
            CHOOSE IMAGE FROM DEVICE
          </button>
          <div
            className="w-full cursor-pointer rounded-md border-2 border-gray-700 py-1 text-center text-xs font-bold text-gray-400 hover:brightness-75"
            onClick={handleRandomCover}
          >
            RANDOM
          </div>
        </div>
        <ModalImageGallery
          isOpen={isImageModalOpen}
          setIsOpen={setIsImageModalOpen}
          title="Cover Image Gallery"
          setImage={setSelectedFile}
          setUploadedFile={setSelectedFile}
        />
      </div>
    </>
  );
};

export default ImageInput;
