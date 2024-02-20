// import Sidebar from '@/components/ui/sidebar'
import HeaderOnboarding from '@/components/ui/header-onboarding'
import { CreateChatbotProvider } from './create-knowledge-context'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  
    return (
        <div className="flex h-[100dvh] overflow-hidden bg-neutral-800">

        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-[#292D32] p-0 pl-0 border-gray-700 rounded-lg">
            <div className='rounded-lg'>

            {/*  Site header */}
            <HeaderOnboarding />

            <main className="grow [&>*:first-child]:scroll-mt-16 h-[calc(100dvh-114px)]">
              <CreateChatbotProvider>{children}</CreateChatbotProvider>
            </main>
            </div>
        </div>

        </div>
    )
    
}
