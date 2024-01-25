"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
	[mainnet, polygon, optimism, arbitrum, base, zora],
	[publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "KIP Protocol",
	projectId: "f53ae5cdc0007d6f85bd532c0edf4d3d",
	chains,
});

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

export function CryptoProvider({ children }: React.PropsWithChildren) {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
		</WagmiConfig>
	);
}
