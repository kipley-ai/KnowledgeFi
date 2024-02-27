import {
  deleteFileS3,
  fetchPresignedUrlS3,
  uploadFileS3,
} from "@/app/api/upload/s3/helper";
import { formatBytes } from "lib/string";
import type { ReactSetter } from "lib/aliases";
import Image from "next/image";
import SuccessIcon from "public/images/check-icon.svg";
import CrossIcon from "public/images/cross-icon.svg";
import UploadingIcon from "public/images/upload-file/uploading-icon-white.svg";
import FailedIcon from "public/images/upload-file/failed-icon.svg";
import UploadIcon from "public/images/upload-file/upload-file.svg";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import type { UIFile } from "./select-data-elements";
import { useCreateChatbotContext } from "./create-knowledge-context";
import Toast from "@/components/toast";
import { useAppProvider } from "@/providers/app-provider";
import ArrowRight from "public/images/arrow-right.svg";

export default function Local({
  files,
  setFiles,
}: {
  files: UIFile[];
  setFiles: ReactSetter<UIFile[]>;
}) {
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createKb, handleChangeKb, setStep } = useCreateChatbotContext();
  const { toast, setToast } = useAppProvider();

  const formats =
    ".docx, .doc, .odt, .pptx, .ppt, .xlsx, .csv, .tsv, .eml, .msg, .rtf, .epub, .html, .xml, .json, .jpg, .png, .pdf, .txt";

  const handleNewFiles = (newFileObjects: File[]) => {
    newFileObjects.forEach(async (newFileObject: File) => {
      const filenameArray = newFileObject.name.split(".");
      const fileformat = filenameArray.pop();

      // Check if format valid
      if (
        formats.split(", ").filter((format) => "." + fileformat === format)
          .length == 0
      ) {
        setShowInvalidModal(true);
        return;
      }

      // Check if there's actual new unprocessed new files
      if (
        newFileObjects &&
        newFileObject &&
        (files.length === 0 ||
          files.filter((file) => file.filename == newFileObject.name).length ==
            0)
      ) {
        console.log("New file detected");
        const { presignedUrl, bucketPath } = await fetchPresignedUrlS3(
          newFileObject.name,
        );

        // Use aborter if the file is bigger than 10 MB
        const aborter =
          newFileObject.size > 1024 * 1024 * 10 ? new AbortController() : null;

        console.log(presignedUrl, bucketPath);

        setFiles((prevFiles) => {
          return [
            ...prevFiles,
            {
              filename: newFileObject.name,
              size: newFileObject.size,
              status: "uploading",
              bucketPath: bucketPath,
              link: `${process.env.NEXT_PUBLIC_KBFILES_S3_URL}/${bucketPath}`,
              aborter: aborter,
            },
          ];
        });

        await uploadFileS3(newFileObject, presignedUrl, aborter)
          .then(async (res) => {
            if (res.ok) {
              console.log("Uploading file succeed: " + newFileObject.name);
              setFiles((prevFiles) => {
                return prevFiles.map((prevFile) => {
                  if (prevFile.filename === newFileObject.name) {
                    return {
                      ...prevFile,
                      status: "success",
                    };
                  }
                  return prevFile;
                });
              });
            }
          })
          .catch((e) => {
            console.error(e);

            setFiles((prevFiles) => {
              return prevFiles.map((file) => {
                if (file.filename === newFileObject.name) {
                  file.aborter?.abort();

                  return {
                    ...file,
                    status: "failed",
                  };
                }
                return file;
              });
            });

            // TODO: Add toast
            // setToastAttribute({
            // 	open: true,
            // 	message: "Unpredictable error",
            // 	type: "danger",
            // 	noteElement: null,
            // });
          });
      }
    });
  };

  // Check file limit exceed function
  const [fileLimitExceeded, setFileLimitExceeded] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log("Inserted a new file from drop");

    const newFileObjects = Array.from(e.dataTransfer?.files || []) as File[];

    handleNewFiles(newFileObjects);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Insert a new file from manual upload");
    e.preventDefault();
    e.stopPropagation();

    const newFileObjects = Array.from(e.target.files || []) as File[];
    handleNewFiles(newFileObjects);
  };

  const handleDelete =
    (index: number) => async (e: React.MouseEvent<HTMLImageElement>) => {
      const filename = files[index].filename;

      files[index].aborter?.abort();

      setFiles((prevFiles: UIFile[]) => {
        return prevFiles.filter((_, i) => {
          return index !== i;
        });
      });

      await deleteFileS3(files[index].bucketPath);

      console.log("Deleted the item: " + filename);
    };

  const handleDivClick = useDebouncedCallback(
    () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    },
    300, // 300ms debounce time
    {
      leading: true,
      trailing: false,
    },
  );

  const showStateIcon = (state: "uploading" | "success" | "failed") => {
    switch (state) {
      case "uploading":
        return (
          <Image
            width={30}
            height={30}
            className={"animate-spin"}
            src={UploadingIcon}
            alt="Loading Icon"
          />
        );
      case "failed":
        return (
          <Image width={30} height={30} src={FailedIcon} alt="Failed Icon" />
        );
      case "success":
        return (
          <Image width={30} height={30} src={SuccessIcon} alt="Success Icon" />
        );
    }
  };

  useEffect(() => {
    console.log(files);
    if (files.length > 10) {
      setFileLimitExceeded(true);
    } else {
      setFileLimitExceeded(false);
    }
  }, [files, toast]);

  return (
    <div className="flex flex-col px-6 py-10 pb-20 lg:px-8 xl:px-32">
      <Toast
        children={"KB creation successful"}
        open={toast}
        setOpen={setToast}
        className="mx-auto"
      />
      <div className="">
        <h1 className="text-2xl font-semibold text-white">
          <span
            className="rotate-90 transform text-center text-[#01F7FF]"
            style={{ writingMode: "vertical-rl" }}
          >
            ↳
          </span>{" "}
          UPLOAD KNOWLEDGE FILES
        </h1>
        <hr className="my-4 border border-gray-600" />
      </div>
      <div className="">
        <div
          className="color-[#aaa] font-inter mb-4 mt-5 flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed border-[#777E90] px-20 py-24 text-center text-white "
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleDivClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            id="file-input"
            multiple
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <div className="shrink-0 grow-0 rounded-full p-4">
            <Image width={36} height={36} src={UploadIcon} alt="Upload Icon" />
          </div>
          <label className="text-md mb-3 cursor-pointer font-semibold">
            Drop your files here OR{" "}
            <span className="text-[#01F7FF]">Click here to browse</span>
          </label>
          <p className="text-xs text-slate-400">
            Supported file formats: .pdf, .csv, .txt, .json, .pptx, .xlsx,
            .docx.
          </p>
          <p className="text-xs text-slate-400">
            Maximum number of files allowed: 10
          </p>
        </div>
        {/* Warning if file exceeded */}
        <div>
          {fileLimitExceeded && (
            <div className="mt-4 text-center text-red-500">
              Maximum number of files exceeded.
            </div>
          )}
        </div>
        <div>
          {files.map((file, index) => {
            return (
              <div
                key={file.bucketPath}
                className="my-5 flex justify-between rounded-3xl bg-neutral-900 px-8 py-5 text-white"
              >
                <div className="flex flex-row">
                  {showStateIcon(file.status)}
                  <div className="ml-8 flex flex-col">
                    <h3 className="font-semibold">{file.filename}</h3>
                    <p className="text-xs">{formatBytes(file.size)}</p>
                  </div>
                </div>
                <Image
                  onClick={handleDelete(index)}
                  src={CrossIcon}
                  alt="Cross Icon"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          className="mt-8 flex flex-row items-center justify-between rounded-3xl p-2 px-5"
          type="submit"
          onClick={() => {
            setStep("data_source");
          }}
        >
          <h5 className="text-sm font-semibold text-[#777E90]">BACK</h5>
        </button>
        <button
          className={`mt-8 flex flex-row items-center justify-between rounded-sm px-6 py-4 hover:brightness-75 ${
            files.length === 0 || fileLimitExceeded
              ? "bg-gray-400"
              : "bg-[#01F7FF]"
          }`}
          type="submit"
          disabled={files.length === 0 || fileLimitExceeded}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!fileLimitExceeded && files.length > 0) {
              handleChangeKb(
                "kb_data",
                files.map((file) => {
                  return {
                    type: "file",
                    name: file.filename,
                    file: file.bucketPath,
                  };
                }),
              );
              setStep("mint_nft");
            }
          }}
        >
          <h5
            className={`pr-2 text-sm font-semibold ${files.length === 0 || fileLimitExceeded ? "text-gray-700" : "text-black"}`}
          >
            CONTINUE
          </h5>

          <Image
            width={24}
            height={24}
            src={ArrowRight}
            alt="Arrow Right Icon"
          />
        </button>
      </div>
    </div>
  );
}
