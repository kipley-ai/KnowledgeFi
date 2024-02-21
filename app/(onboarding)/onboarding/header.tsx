"use client";

import { useAccount } from "wagmi";
import AvatarWithStatus from "@/components/ui/avatar-with-status";

const Header = () => {
  const { isConnected } = useAccount();
  return (
    <header className="flex items-center justify-between border-b-2 border-gray-600 bg-[#292D32] px-8 py-6">
      <h1 className="text-3xl font-black text-white">KnowledgeFi</h1>
      {isConnected ? <AvatarWithStatus image="" status="away" /> : null}
    </header>
  );
};

export default Header;
