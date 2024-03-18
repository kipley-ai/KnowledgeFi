import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import axios from "axios";

export const useSuperAdmin = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["access"],
    queryFn: () =>
      axios.post(
        "/api/access",
        {},
        {
          headers: {
            "x-kf-user-id": address,
          },
        },
      ),
  });
};
