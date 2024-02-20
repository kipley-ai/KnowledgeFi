import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { IUpdateUserParams } from "../interfaces";
import axios from "axios";
import { IPaginate } from "../interfaces";
import { EarningReportResponse, UserDetailResponse } from "@/lib/types";

export const useUserDetail = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["user", "detail", address],
    queryFn: () =>
      axios.post<UserDetailResponse>(
        "/api/user/detail",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    select: (data) => data.data.data,
  });
};

export const useProfpic = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["user", "profpic", address],
    queryFn: () =>
      axios.post<UserDetailResponse>(
        "/api/user/detail",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    select: (data) => data.data.data.profile_image,
  });
};

export const useUpdateProfpic = () => {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  return useMutation({
    mutationFn: (profilePicture: string) =>
      axios.post(
        "/api/user/update",
        { profile_image: profilePicture },
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profpic"] });
    },
  });
};

export const useCreateUser = () => {
  // const { address } = useAccount();

  return useMutation({
    mutationFn: (address: string) =>
      axios.post(
        "/api/user/create",
        { wallet_addr: address },
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};

export const useDepositHistory = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["deposit", params.page],
    queryFn: () =>
      axios.post("/api/user/deposit", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useWithdrawHistory = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["withdraw", params.page],
    queryFn: () =>
      axios.post("/api/user/withdraw", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useUpdateUserAPI = () => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: (params: IUpdateUserParams) =>
      axios.post("/api/user/update", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useEarningReport = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["earning", params.page],
    queryFn: () =>
      axios.post<EarningReportResponse>("/api/user/earning", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
    select: (data) => data.data.data,
  });
};

export const useCreditUsage = (
  params: IPaginate,
  placeholderData: typeof keepPreviousData | undefined = undefined,
) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["credit", params.page],
    queryFn: () =>
      axios.post("/api/user/credit", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};
