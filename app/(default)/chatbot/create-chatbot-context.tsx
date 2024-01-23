'use client'

import { createContext, useContext, useState } from 'react'

interface CreateChatbotContextProps {
    createChatbot:any;
    handleChange:any;
}

const CreateChatbotContext = createContext<CreateChatbotContextProps | undefined>(undefined)

export const CreateChatbotProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [createChatbot,setCreateChatbot] = useState({
    type: "",
    profile_image: "",
    username: "",
    category_id: "",
    name: "",
    description: "",
    instruction: "",
    example_conversation: "",
  })

  const handleChange = (name: string, value: any) => {
    setCreateChatbot((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <CreateChatbotContext.Provider value={{ createChatbot, handleChange }}>
      {children}
    </CreateChatbotContext.Provider>
  )
}

export const useCreateChatbotContext = () => {
  const context = useContext(CreateChatbotContext)
  if (!context) {
    throw new Error('useCreateChatbotContext must be used within a CreateChatbotProvider')
  }
  return context
}