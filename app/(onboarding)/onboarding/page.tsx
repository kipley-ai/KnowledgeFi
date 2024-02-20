"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Welcome from "./welcome";
import InviteCode from "./invite-code";

export default function Onboarding() {
  const { isConnected } = useAccount();
  // const isConnected = true;

  if (!isConnected) {
    return (
      <>
        <Welcome />
      </>
    );
  }

  return (
    <>
      <InviteCode />
    </>
  );
}
