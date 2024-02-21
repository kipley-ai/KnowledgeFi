"use client";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  AuthenticationStatus,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useDisconnect,
} from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  sepolia,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { RQProviders } from "@/providers/react-query-provider";
import { useEffect, useState } from "react";
import { okxWallet } from "@rainbow-me/rainbowkit/wallets";
import { trustWallet } from "@rainbow-me/rainbowkit/wallets";
import { phantomWallet } from "@rainbow-me/rainbowkit/wallets";
import { oneKeyWallet } from "@rainbow-me/rainbowkit/wallets";
import { ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { bitKeepWallet } from "@rainbow-me/rainbowkit/wallets";
import { useAxios } from "@/hooks/useAxios";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, sepolia],
  [publicProvider()],
);

const projectId = "f53ae5cdc0007d6f85bd532c0edf4d3d";

const { wallets } = getDefaultWallets({
  appName: "KIP Protocol",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "More",
    wallets: [
      okxWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      phantomWallet({ chains }),
      oneKeyWallet({ chains }),
      ledgerWallet({ projectId, chains }),
      bitKeepWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function CryptoProvider({ children }: React.PropsWithChildren) {
  const [status, setStatus] = useState<AuthenticationStatus>("unauthenticated");
  const [address,setAddress] = useState("")
  const { response, error, loading, sendRequest } = useAxios();
  useEffect(()=> {
    // console.log(address,"address")
    if(status == 'authenticated' && address!=''){
      sendRequest({
          method: "POST",
          url: "/api/user/create",
          data: {wallet_addr:address},
          headers: {'x-kf-user-id':address}
        })
    }

  },[address,status])

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      return "x";
    },

    createMessage: ({ nonce, address, chainId }) => {
      setAddress(address)
      return "Welcome to KnowledgeFi.xyz!";
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
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={status}
      >
        <RainbowKitProvider
          chains={chains}
          initialChain={
            process.env.NEXT_PUBLIC_ENV_DEV == "1" ? sepolia : mainnet
          }
        >
          {children}
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}
