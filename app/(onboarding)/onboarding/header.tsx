"use client";

import { useAccount } from "wagmi";
import AvatarWithStatus from "@/components/ui/avatar-with-status";

const Header = () => {
  // TODO: Integrate user profile picture
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-[#292D32] border-b-2 border-gray-600">
      <h1 className="text-3xl font-black text-white">KnowledgeFi</h1>
      <AvatarWithStatus image="" status="away" />
    </header>
  );
};

export default Header;
