"use client"
import { useEffect } from "react";
import { useAppProvider } from "@/app/app-provider";
import ChatBotForm from "./create-chatbot-form"

export default function CreateChatBot() {
    const { setHeaderTitle } = useAppProvider();

    useEffect(() => {
        setHeaderTitle("Create Chatbot"); // Set the title when the component is mounted

        // Optional: Reset the title when the component is unmounted
        return () => setHeaderTitle("Default Title");
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            <ChatBotForm />
        </div>
    );
}