"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    signIn("twitter", {
      callbackUrl: "/knowledge/create/iframe?ts=1",
    });
  }, []);

  return null;
}

export default Page;
