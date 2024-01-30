import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Dropzone from "react-dropzone";
import ModalImageGallery from "@/components/modal-image-gallery";
import GalleryImages from "@/public/json/image-gallery-app.json";
import LoadingIcon from "public/images/loading-icon.svg";

const ImageInput = ({ selectedFile, setSelectedFile, setUploadedFile }: any) => {
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
      for (const file of e.target.files) {
        setSelectedFile(URL.createObjectURL(file));
        setUploadedFile(file);
      }
    }
  };

  const handleRandomCover = () => {
    const randomIndex = Math.floor(Math.random() * GalleryImages.length);
    setSelectedFile(GalleryImages[randomIndex]);
    setUploadedFile(null);
  };

  useEffect(() => {
    handleRandomCover();
  }, []);

  return (
    <div className="flex flex-col justify-between gap-2">
      <label className="font-semibold text-[#DDD]">Cover Image</label>
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
      <div className="flex flex-col gap-2">
        <button
          onClick={handleGalleryCover}
          className="font-semibold text-black rounded-md bg-[#01F7FF] hover:brightness-75 py-2 px-1"
        >
          Choose Image from Gallery
        </button>
        <button
          onClick={handleDeviceCover}
          className="font-semibold text-black rounded-md bg-[#01F7FF] hover:brightness-75 py-2 px-1"
        >
          Choose Image from Device
        </button>
        <div
          onClick={handleRandomCover}
          className="w-full bg-slate-400 hover:brightness-75 cursor-pointer rounded-md font-bold text-center py-1 text-black"
        >
          Random
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
