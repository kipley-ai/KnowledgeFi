"use client";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected } = useAccount();
  const pathname = usePathname();

  if (isConnected) {
    return (
      <div className="flex h-[100dvh] overflow-hidden bg-neutral-900">
        {/* Sidebar */}
        {pathname === "/knowledge/create/iframe" ? null : <Sidebar />}

        {/* Content area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-lg border-gray-700 bg-stone-800 lg:bg-neutral-900 lg:p-6 lg:pl-0">
          <div className="h-dvh rounded-lg border border-gray-700">
            {/*  Site header */}
            {pathname === "/knowledge/create/iframe" ? null : <Header />}

            <main className="grow [&>*:first-child]:scroll-mt-16">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  } else {
    console.log(isConnected);
    redirect(`/?next=${pathname}`);
  }
}
