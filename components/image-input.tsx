import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Dropzone from "react-dropzone";
import ModalImageGallery from "@/components/modal-image-gallery";
import GalleryImages from "@/public/json/image-gallery-app.json";
import LoadingIcon from "public/images/loading-icon.svg";

type ImageInputProps = {
  selectedFile: string;
  setSelectedFile: (value: any) => void;
  setUploadedFile: (value: File | null) => void;
};

const ImageInput = ({
  selectedFile,
  setSelectedFile,
  setUploadedFile,
}: ImageInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingCover, setLoadingCover] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

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

  const handleGalleryCover = (e: any) => {
    e.preventDefault();
    setIsGalleryModalOpen(true);
  };

  const handleDeviceCover = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        setSelectedFile(URL.createObjectURL(file));
        setUploadedFile(file);
      });
    }
  };

  const handleRandomCover = () => {
    const randomIndex = Math.floor(Math.random() * GalleryImages.length);
    setSelectedFile(GalleryImages[randomIndex]);
    setUploadedFile(null);
  };

  return (
    <div className="flex md:flex-col justify-center md:justify-start gap-2">
      <div>
        <label className="text-xs font-semibold text-[#DDD] lg:text-sm">
          Cover Image
        </label>
        <Dropzone
          onDrop={handleFileDrop}
          accept={{ "image/*": [] }}
          multiple={false}
          maxFiles={1}
          maxSize={2000000}
          disabled
        >
          {({ getRootProps, getInputProps }) => (
            <div className="px-auto" {...getRootProps()}>
              <input
                {...getInputProps()}
                accept="image/*"
                onChange={handleCoverChange}
                ref={inputRef}
              />
              {loadingCover ? (
                <Image
                  width={30}
                  height={30}
                  src={LoadingIcon}
                  alt="Loading Icon"
                />
              ) : (
                <Image
                  src={selectedFile}
                  alt="Edit Preview"
                  width={250}
                  height={250}
                  className="rounded-2xl object-cover"
                  priority
                />
              )}
            </div>
          )}
        </Dropzone>
      </div>
      <div className="flex flex-col pt-6 md:pt-0 gap-2">
        <button
          onClick={handleGalleryCover}
          className="rounded-md bg-[#01F7FF] px-1 py-2 text-xs font-semibold text-black hover:brightness-75 lg:text-sm"
        >
          CHOOSE IMAGE FROM GALLERY
        </button>
        <button
          onClick={handleDeviceCover}
          className="rounded-md bg-[#01F7FF] px-1 py-2 text-xs font-semibold text-black hover:brightness-75 lg:text-sm"
        >
          CHOOSE IMAGE FROM DEVICE
        </button>
        <div
          onClick={handleRandomCover}
          className="w-full cursor-pointer rounded-md border-2 border-gray-700 py-1 text-center text-xs font-bold text-gray-400 hover:brightness-75 lg:text-sm"
        >
          RANDOM
        </div>
      </div>
      <ModalImageGallery
        isOpen={isGalleryModalOpen}
        setIsOpen={setIsGalleryModalOpen}
        title="Cover Image Gallery"
        setImage={setSelectedFile}
        setUploadedFile={setUploadedFile}
      />
    </div>
  );
};

export default ImageInput;
