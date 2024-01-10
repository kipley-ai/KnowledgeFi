'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  headerTitle: string
  setHeaderTitle: Dispatch<SetStateAction<string>>
}

const AppContext = createContext<ContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
  headerTitle: "",
  setHeaderTitle: (): string => "",
})

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {  
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [headerTitle,setHeaderTitle] = useState("")
  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen,
      headerTitle, setHeaderTitle
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppProvider = () => useContext(AppContext)