"use client";
import "./css/style.css";

import { Inter } from "next/font/google";
import Theme from "./theme-provider";
import AppProvider from "./app-provider";
import NextAuthProvider from "./session-provider";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { RQProviders } from "@/providers/react-query-provider";

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

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			{/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
			<body
				className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}
			>
				<RQProviders>
				<Theme>
					<AppProvider>
						<NextAuthProvider>
							<WagmiConfig config={wagmiConfig}>
								<RainbowKitProvider chains={chains}>
									{children}
								</RainbowKitProvider>
							</WagmiConfig>
						</NextAuthProvider>
					</AppProvider>
				</Theme>
				</RQProviders>
			</body>
		</html>
	);
}
