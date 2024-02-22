import { Dialog, Transition } from "@headlessui/react";

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
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" onClose={() => {}}>
        <Transition.Child
          className="fixed inset-0 backdrop-blur bg-opacity-100 z-50 transition-opacity"
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
          <Dialog.Panel className="bg-neutral-900 dark:bg-zinc-900 rounded-2xl shadow-lg overflow-auto max-h-full">
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
