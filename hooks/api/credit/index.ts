import { useAccount } from "wagmi";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ICreditDeductionParams } from "../interfaces";

export const useCreditDeduction = () => {
  const { address } = useAccount();

  return useMutation({
    mutationFn: (params: ICreditDeductionParams) =>
      axios.post("/api/credit/use-app", params, {
        headers: {
          "x-kf-user-id": address,
        },
      }),
  });
};

export const useCreditBalance = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: [],
    queryFn: () =>
      axios.post(
        "/api/credit/balance",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        }
      ),
  });
};
