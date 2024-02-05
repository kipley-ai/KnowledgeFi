"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

import Dashboard from "./(dashboard)/dashboard/page";
import LayoutDashboard from "./(dashboard)/dashboard/layout";

export default function Home() {
  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);

  const { address, isConnected } = useAccount();

	const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/dashboard";

  useEffect(() => {
    if (isConnected) {
      setIsDefinitelyConnected(true);
    } else {
      setIsDefinitelyConnected(false);
    }
  }, [address]);

  if (isConnected) {
    redirect(nextUrl);
  } else {
    return (
      <>
        <LayoutDashboard>
          <Dashboard />
        </LayoutDashboard>
      </>
    );
  }
}
