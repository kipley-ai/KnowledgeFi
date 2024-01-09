'use client'

import { useState } from 'react'
import { useAppProvider } from '@/app/app-provider'

import SearchModal from '@/components/search-modal'
import Notifications from '@/components/dropdown-notifications'
import DropdownHelp from '@/components/dropdown-help'
import ThemeToggle from '@/components/theme-toggle'
import DropdownProfile from '@/components/dropdown-profile'
import SearchForm from '../search-form'

export default function Header() {

  const { sidebarOpen, setSidebarOpen } = useAppProvider()
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)

  return (
    <header className="sticky top-0 dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30" style={{ boxShadow:'0px 4px 6px rgba(0, 0, 0, 0.1);', backgroundColor: '#292D31' }}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => { setSidebarOpen(!sidebarOpen) }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

            <div className="flex items-center">
              <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24" style={{ padding: '8px', margin: '0 8px' }}>
                <path className={`fill-current`} d="M1 3h22v20H1z" />
                <path
                  className={`fill-current`}
                  d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                />
              </svg>
              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200" style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                Create NFT
              </span>
            </div>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <SearchForm />
            <button>
              <div className="flex items-center" style={{ border: '2px solid #353945', borderRadius: '90px', padding: '12px 16px' }}>
                <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24" style={{ padding: '8px', margin: '0 8px' }}>
                  <path className={`fill-current`} d="M1 3h22v20H1z" />
                  <path
                    className={`fill-current`}
                    d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"
                  />
                </svg>
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200" style={{ fontSize: '14px', fontWeight: 600, color: '#DDDDDD' }}>Connect Wallet</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}
