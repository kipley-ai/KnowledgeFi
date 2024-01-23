"use client"
import Sidebar from '@/components/ui/sidebar'
import Header from '@/components/ui/header'
import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  if (isConnected) {
  return (
    <div className="flex h-[100dvh] overflow-hidden bg-neutral-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-neutral-900 p-6 pl-0 border-gray-700 rounded-lg">
        <div className='border border-gray-700 rounded-lg'>

          {/*  Site header */}
          <Header />

          <main className="grow [&>*:first-child]:scroll-mt-16">
            {children}
          </main>
        </div>
      </div>

    </div>
  )} else {
        console.log(isConnected)
        redirect(`/?next=${pathname}`)
      }
}
