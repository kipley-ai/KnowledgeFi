import { Dialog, Transition } from "@headlessui/react";
import { useRef } from "react";

interface ModalBlankProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ModalBlank({
  children,
  isOpen = false,
  setIsOpen,
}: ModalBlankProps) {
  const divRef = useRef(null);
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={() => {}} initialFocus={divRef}>
        <Transition.Child
          className="fixed inset-0 z-50 bg-stone-800 bg-opacity-100 transition-opacity"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-out duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          aria-hidden="true"
        />
        <Transition.Child
          className="fixed inset-0 z-50 my-4 flex items-center justify-center overflow-hidden px-4 sm:px-6"
          enter="transition ease-in-out duration-200"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <Dialog.Panel className="max-h-full max-w-xl overflow-auto rounded-2xl bg-neutral-900 shadow-lg dark:bg-slate-800">
            <div ref={divRef} />
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
