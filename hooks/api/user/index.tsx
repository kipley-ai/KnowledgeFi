import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { IUpdateUserParams } from "../interfaces";
import axios from "axios";
import { IPaginate } from "../interfaces";

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
      axios.post("/api/user/earning", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
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

export const useUserDetail = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["user-detail"],
    queryFn: () =>
      axios.post(
        "/api/user/detail",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};

export const useCreatorOverview = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["creator-overview"],
    queryFn: () =>
      axios.post(
        "/api/user/creator_overview",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};
