import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import GalleryImages from "@/public/json/image-gallery-app.json";

interface ModalImageGalleryProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setImage: (value: string | undefined) => void;
  setUploadedFile: (value: File | null) => void;
}

export default function ModalImageGallery({
  title,
  isOpen,
  setIsOpen,
  setImage,
  setUploadedFile,
}: ModalImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={() => setIsOpen(false)}>
        <Transition.Child
          className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <Transition.Child
          className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <Dialog.Panel className="bg-white dark:bg-neutral-900 rounded shadow-lg overflow-auto max-w-3xl w-full max-h-full">
            {/* Modal header */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <Dialog.Title className="font-semibold text-slate-800 dark:text-slate-100">
                  {title}
                </Dialog.Title>
                <button
                  className="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                >
                  <div className="sr-only">Close</div>
                  <svg className="w-4 h-4 fill-current">
                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Modal body */}
            <div className="grid grid-cols-10 gap-4 overflow-y-scroll	max-h-[69vh] h-4/5 p-6">
              {GalleryImages.map((image, index: number) => {
                return (
                  <Image
                    key={index}
                    width={300}
                    height={300}
                    onClick={() => setSelectedImage(image)}
                    className={`border-4 ${
                      selectedImage == image
                        ? "border-[#01F7FF]"
                        : "border-transparent"
                    }  col-span-2 rounded-xl`}
                    style={{ aspectRatio: "300/300" }}
                    src={image}
                    alt="random image"
                  />
                );
              })}
            </div>
            {/* Modal footer */}
            <div className="px-5 py-3 border-t dark:border-slate-700 flex justify-center gap-16">
              <button
                className="dark:text-slate-100 hover:brightness-75 rounded-3xl px-4 py-2 font-semibold border-2 border-[#50575F]"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#01F7FF] text-black hover:brightness-75 rounded-3xl px-4 py-2 font-semibold"
                onClick={() => {
                  setImage(selectedImage);
                  // setUploadedFile(null);
                  setIsOpen(false);
                }}
              >
                Select
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
