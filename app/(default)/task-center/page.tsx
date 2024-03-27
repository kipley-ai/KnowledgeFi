"use client";
import { useAppProvider } from "@/providers/app-provider"
import { useEffect } from "react";
import Header from "./header";
import TaskSection from "./task-rewards";

export default function TaskCenter() {
    const { setHeaderTitle } = useAppProvider();

    useEffect(() => {
        setHeaderTitle("Task Center");
    })

    return (
        <>
            <Header />
            <TaskSection />
        </>
    )
}