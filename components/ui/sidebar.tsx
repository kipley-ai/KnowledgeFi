'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppProvider } from '@/app/app-provider'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Transition } from '@headlessui/react'
import { getBreakpoint } from '../utils/utils'
import SidebarLinkGroup from './sidebar-link-group'
import SidebarLink from './sidebar-link'
import Logo from './logo'
import Image from 'next/image'
import home_logo from '@/public/images/logo-home.png'
import ModalLoginTwitter from '../modal-login-twitter'
import { useAccount } from 'wagmi'
import dynamic from 'next/dynamic'

const GetInvolvedButton = dynamic(() => import("../GetInvolvedButton/get-involved-button"), {
  ssr: false,
});

export default function Sidebar() {
  const sidebar = useRef<HTMLDivElement>(null)
  const { sidebarOpen, setSidebarOpen } = useAppProvider()
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false)
  const segments = useSelectedLayoutSegments()  
  const [breakpoint, setBreakpoint] = useState<string | undefined>(getBreakpoint())
  const expandOnly = !sidebarExpanded && (breakpoint === 'lg' || breakpoint === 'xl')
  const { isConnected } = useAccount() 

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {      
      if (!sidebar.current) return
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })
  
  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint())      
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleBreakpoint)
    return () => {
      window.removeEventListener('resize', handleBreakpoint)
    }
  }, [breakpoint])    
  const {modalLogin,setModalLogin} = useAppProvider()
  


  return (
    <>
    <ModalLoginTwitter
      isOpen={modalLogin} setIsOpen={setModalLogin}
    />
    <div className={`min-w-fit ${sidebarExpanded ? 'sidebar-expanded' : ''}`} style={{ boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
      {/* Sidebar backdrop (mobile only) */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto"
        show={sidebarOpen}
        enter="transition-opacity ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-out duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        aria-hidden="true"
      />      

      {/* Sidebar */}
      <Transition
        show={sidebarOpen}
        unmount={false}
        as="div"
        id="sidebar"
        ref={sidebar}
        className="flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-neutral-900 p-4 transition-all duration-200 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >      
        {/* Sidebar header */}
        <div className="flex justify-between mb-5 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <h2 className="text-slate-500 font-semibold pl-3">
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block text-[28px] font-black text-neutral-300">KnowledgeFi</span>
            </h2>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="">
              {/* Inbox */}
              <li className={`px-3 py-2  mb-3 last:mb-0 ${(segments.includes('home') || segments.includes('dashboard')) && 'bg-slate-900'} border-2 border-aqua-700 rounded-3xl py-1.5 px-2.5`} >
              {/* style={{ border: '2px solid #01F7FF', borderRadius: '24px', padding: '6px 10px' }}> */}
                <SidebarLink href="/#">
                  <div className="flex items-center">
                    <Image
                      className="h-9 w-9"
                      alt="home"
                     src={home_logo}/>
                    {/* <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24" style={{ padding: '8px', margin: '0 8px' }}>
                      <path className={`fill-current ${segments.includes('calendar') ? 'text-indigo-500' : 'text-slate-600'}`} d="M1 3h22v20H1z" />
                      <path
                        className={`fill-current ${segments.includes('calendar') ? 'text-indigo-300' : 'text-slate-400'}`}
                        d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                      />
                    </svg> */}
                    <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">Home</span>
                  </div>
                </SidebarLink>
              </li>
              {/* Login */}
              <li className={`px-3 py-2  mb-0.5 last:mb-0 ${segments.includes('login') && 'bg-slate-900'}`}>
                
                <SidebarLink href="/dashboard" >
                  <div className="flex items-center">
                    {
                      isConnected // wallet connected
                      ? <><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36"
                      onClick={()=>{
                        //check if twitter is logged in 
                      }}
                        >
                          <path fill="#F1F5F9" fillRule="evenodd" d="M18 7C11.925 7 7 11.925 7 18s4.925 11 11 11 11-4.925 11-11S24.075 7 18 7zm0 6a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z" clipRule="evenodd"> </path>
                        </svg>
                        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
                        
                          Create chat bot
                        </span></>
                      : <GetInvolvedButton
                          buttonStyle='flex items-center '
                          wrapStyle='flex items-center '
                          chainStyle='flex items-center '
                          content={
                            <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 36 36"
                            >
                              <path fill="#F1F5F9" fillRule="evenodd" d="M18 7C11.925 7 7 11.925 7 18s4.925 11 11 11 11-4.925 11-11S24.075 7 18 7zm0 6a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z" clipRule="evenodd"> </path>
                            </svg>
                            <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
                            
                              Create chat bot
                            </span>
                            </>
                          }
                        />
                    }
                    
                  </div>
                </SidebarLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
    </div>
    </>
  )
}