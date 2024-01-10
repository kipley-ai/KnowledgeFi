"use client";


import WelcomeBanner from './welcome-banner'
import DashboardAvatars from './dashboard-avatars'
import FilterButton from '@/components/dropdown-filter'
import Datepicker from '@/components/datepicker'
import DashboardCard01 from './dashboard-card-01'
import DashboardCard02 from './dashboard-card-02'
import DashboardCard03 from './dashboard-card-03'
import DashboardCard04 from './dashboard-card-04'
import DashboardCard05 from './dashboard-card-05'
import DashboardCard06 from './dashboard-card-06'
import DashboardCard07 from './dashboard-card-07'
import DashboardCard08 from './dashboard-card-08'
import DashboardCard09 from './dashboard-card-09'
import DashboardCard10 from './dashboard-card-10'
import DashboardCard11 from './dashboard-card-11'
import Switcher from '@/components/switcher'
import { useEffect, useState } from 'react'
import chat_image from '@/public/images/chat-image.png'
import Image from 'next/image';
import ModalLoginTwitter from '@/components/modal-login-twitter';
import { useAppProvider } from '@/app/app-provider'
import { getBreakpoint } from '@/components/utils/utils';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { accounts } from '@/components/utils/twitter-account';

export default function Dashboard() {
  const [mode, setMode] = useState(0);
  const [breakpoint, setBreakpoint] = useState<string | undefined>(getBreakpoint())

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
    <div className='w-full bg-stone-800'>
      <ModalLoginTwitter
        isOpen={modalLogin} setIsOpen={setModalLogin}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] ">
        <Switcher
          texts={["All", "Custom", "Custom", "Custom", "Custom"]}
          setWhich={setMode}
        />

        {/* <div>
          <Image
            className="h-full w-full cursor-pointer"
            alt="chat"
            src={chat_image}
            onClick={()=>setModalLogin(true)}/>
        </div> */}

        {/* <div className="grid-cols-4 gap-4 mx-[-22px] my-[8px]"> */}
        <div className="w-full flex flex-wrap justify-left my-[8px]">
        {/* <div className="grid grid-cols-6"> */}
          {accounts.map((person, index) => (
            // <div className="col-span-2">
              <AnimationOnScroll
                className="relative flex flex-col cursor-pointer w-[100px]"
                // style={{ flex: '0 0 calc(16.667% - 44px)', width: 'calc(16.667% - 44px)', margin: '27px 11px 0' }}
                // style={{ flex: '0 0 175px', width: 'calc(16.667% - 44px)', margin: '27px 11px 0' }}
                style={{ width: '175px', margin: '27px 22px 0 0' }}
                initiallyVisible
                key={index}
                animateOnce
              >
                <div className="absolute top-[5px] right-px w-[60px] h-[60px] rounded-2xl bg-apricot-700"></div>
                <div className="p-2 rounded-tl-3xl bg-stone-500" style={{ clipPath: 'url(#polygonPhoto)' }}>
                <div className="relative h-[175px] bg-stone-400 rounded-[18px] overflow-hidden" style={{ clipPath: 'url(#polygonPhoto)' }} onClick={()=>setModalLogin(true)}>
                    <Image
                      src={person.image}
                      layout="fill"
                      objectFit="cover"
                      alt="Avatar"
                    />
                  </div>
                  <svg width="0" height="0" className="block">
                    <clipPath id="polygonPhoto" clipPathUnits="objectBoundingBox">
                      <path d="M1 1V.215C1 .196.993.177.98.162L.851.023C.838.008.819 0 .8 0H0v1" />
                    </clipPath>
                  </svg>
                </div>
                <div className="grow bg-stone-500 rounded-bl-3xl rounded-br-3xl" style={{ padding: '16px 16px 20px', overflowWrap: 'break-word' }} onClick={()=>setModalLogin(true)}>
                  <div className='text-neutral-300 font-semibold text-lg'>{person.name}</div>
                </div>
              </AnimationOnScroll>
            // </div>
          ))}
        </div>

        <div className='py-4 flex justify-center'>
          <button>
            <div className="flex items-center rounded-xl border-2 border-stone-900 px-5 py-3">
              <span className="text-[15px] font-bold text-neutral-300 text-center">Load more</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
