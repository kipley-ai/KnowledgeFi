"use client";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useUserDetail } from "@/hooks/api/user";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useAccount();
  const pathname = usePathname();

  const { data: userDetail, isLoading, isSuccess } = useUserDetail();

  if (isLoading) return null;

  switch (status) {
    case "connected":
      if (
        userDetail?.data?.status !== "error" &&
        !userDetail?.data.data.onboarding &&
        pathname !== "/knowledge/create/iframe"
      ) {
        return redirect("/onboarding");
      }

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
    case "disconnected":
      return redirect(`/?next=${pathname}`);
    default:
      break;
  }
}
