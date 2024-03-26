import { keepPreviousData } from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { TaskListResponse } from "@/lib/types";
import { useAccount } from "wagmi";

export const useTaskList = (
  params: {
    page: number;
    page_size: number;
    sort_by: string;
  },
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["task", "list", params.page, params.page_size, params.sort_by],
    queryFn: () =>
      axios.post<TaskListResponse>("/api/task/list", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    placeholderData: placeholderData,
    select: (data) => data.data.data,
  });
};

export const useTakeTask = () => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: (params: { task_id: string }) =>
      axios.post("/api/task/take", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useCompleteTask = () => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: (params: { taken_id: string | null }) =>
      axios.post("/api/task/complete", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};
