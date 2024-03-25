import { keepPreviousData } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
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
