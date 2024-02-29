"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

function page() {
  const { status } = useAccount();

  useEffect(() => {
    if (status === "connected") {
      signIn("twitter", {
        callbackUrl: "/knowledge/create/iframe?ts=1",
      });
    }
  }, [status]);

  return null;
}

export default page;
