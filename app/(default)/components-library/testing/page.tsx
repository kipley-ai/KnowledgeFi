"use client";

import React from "react";
import { useSwitchToSepolia } from "@/hooks/useSwitchNetwork";
import { useSwitchToPolygon } from "@/hooks/useSwitchNetwork";
import { useNetwork } from "wagmi";
// import Loader from "@/components/loader";

const SwitchNetwork = () => {
  const { chain } = useNetwork();

  return (
    <div>
      <span>Current Network: {chain?.name}</span>
      {/* <Loader /> */}
      <SwitchToPolygonButton />
      <SwitchToSepoliaButton />
    </div>
  );
};

const SwitchToPolygonButton = () => {
  const { isPolygon, switchToPolygon } = useSwitchToPolygon();

  return (
    <button
      disabled={isPolygon}
      className="flex flex-row items-center justify-center gap-2 rounded-3xl bg-aqua-700 p-2 px-5 hover:brightness-75"
      onClick={switchToPolygon}
    >
      Switch to Polygon
    </button>
  );
};

const SwitchToSepoliaButton = () => {
  const { isSepolia, switchToSepolia } = useSwitchToSepolia();

  return (
    <button
      disabled={isSepolia}
      className="flex flex-row items-center justify-center gap-2 rounded-3xl bg-aqua-700 p-2 px-5 hover:brightness-75"
      onClick={switchToSepolia}
    >
      Switch to Sepolia
    </button>
  );
};

export default SwitchNetwork;
