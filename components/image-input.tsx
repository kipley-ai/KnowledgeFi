import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Dropzone from "react-dropzone";
import ModalImageGallery from "@/components/modal-image-gallery";
import GalleryImages from "@/public/json/image-gallery-app.json";
import UploadingIcon from "public/images/upload-file/uploading-icon-white.svg";
import LoadingIcon from "public/images/loading-icon.svg";

const ImageInput = ({ selectedFile, setSelectedFile }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loadingCover, setLoadingCover] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const uploadFile = async (newFile: any, callback: any) => {
    try {
      const response = await axios.post("/api/upload/s3", newFile);

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

  useEffect(() => {
    handleRandomCover();
  }, []);

  return (
    <div className="flex flex-col justify-between gap-2">
      <label className="form-label font-semibold text-[#DDD]" htmlFor="email">
        Cover Image
      </label>
      <Dropzone
        onDrop={handleFileDrop}
        accept={{ "image/*": [] }}
        multiple={false}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone cursor-pointer mx-auto" {...getRootProps()}>
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
          onClick={(e) => {
            e.preventDefault();
            setIsImageModalOpen(true);
          }}
          className="font-semibold text-black rounded-md bg-[#01F7FF] hover:brightness-75 py-2 px-1"
        >
          Choose Image from Gallery
        </button>
        <button
          onClick={handleChangeImage}
          className="font-semibold text-black rounded-md bg-[#01F7FF] hover:brightness-75 py-2 px-1"
        >
          Choose Image from Device
        </button>
        <div
          className="w-full bg-slate-400 hover:brightness-75 cursor-pointer rounded-md font-bold text-center py-1 text-black"
          onClick={handleRandomCover}
        >
          Random
        </div>
      </div>
      <ModalImageGallery
        isOpen={isImageModalOpen}
        setIsOpen={setIsImageModalOpen}
        title="Cover Image Gallery"
        setImage={setSelectedFile}
      />
    </div>
  );
};

export default ImageInput;
