"use client";
import "./css/style.css";

import { Inter } from "next/font/google";
import Theme from "../providers/theme-provider";
import AppProvider from "../providers/app-provider";
import NextAuthProvider from "../providers/session-provider";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  AuthenticationStatus,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useDisconnect,
} from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { RQProviders } from "@/providers/react-query-provider";
import { useState } from "react";

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
  const [status, setStatus] = useState<AuthenticationStatus>("unauthenticated");

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      return "x";
    },

    createMessage: ({ nonce, address, chainId }) => {
      return "Welcome to KnowledgeFi.xyz!\nNonce: xxxxxxx";
    },

    getMessageBody: ({ message }) => {
      return message;
    },

    verify: async ({ message, signature }) => {
      localStorage.setItem("kip-protocol-signature", signature);

      setStatus("authenticated");
      return true;
    },

    signOut: async () => {
      localStorage.setItem("kip-protocol-signature", "");

      setStatus("unauthenticated");
    },
  });

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
                  <RainbowKitAuthenticationProvider
                    adapter={authenticationAdapter}
                    status={status}
                  >
                    <RainbowKitProvider chains={chains}>
                      {children}
                    </RainbowKitProvider>
                  </RainbowKitAuthenticationProvider>
                </WagmiConfig>
              </NextAuthProvider>
            </AppProvider>
          </Theme>
        </RQProviders>
      </body>
    </html>
  );
}
