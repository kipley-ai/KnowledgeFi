import React from "react";
import Link from "next/link";

interface SidebarRightProps {
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-64 z-50 transform transition-transform pt-6 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } bg-neutral-900 duration-300 ease-in-out`}
      >
        {children}
        <button
          className="absolute right-4 top-4 text-white hover:text-gray-800"
          onClick={onClose}
        >
          &#10006;
        </button>
      </div>
      {/* Darkened overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-slate-900 bg-opacity-30 z-40" onClick={onClose}></div>
      )}
    </>
  );
};

export default SidebarRight;
