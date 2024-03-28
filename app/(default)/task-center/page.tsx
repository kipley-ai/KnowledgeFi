"use client";
import { useAppProvider } from "@/providers/app-provider"
import { useEffect, useState } from "react";
import { useTaskBasePoint } from "@/hooks/api/task";
import Header from "./header";
import TaskSection from "./task-rewards";

export default function TaskCenter() {
    const { setHeaderTitle } = useAppProvider();

    useEffect(() => {
        setHeaderTitle("Task Center");
    });

    const [startPoints, setStartPoints] = useState<number>(0);
    const [endPoints, setEndPoints] = useState<number>(0);

    const { data, refetch: refetchBasePoints } = useTaskBasePoint();
  
    useEffect(() => {
      if (data?.data?.base_point) {
        setStartPoints(endPoints);
        setEndPoints(data.data.base_point);
      }
    }, [data?.data?.base_point]);

    return (
        <>
            <Header startPoints={startPoints} endPoints={endPoints} />
            <TaskSection refetchBasePoints={refetchBasePoints} />
        </>
    )
}
