import { useNetwork, useSwitchNetwork } from "wagmi";
import { Chain } from "wagmi/chains";
import chains from "wagmi/chains";
import { base, sepolia } from "wagmi/chains";
import { polygon } from "wagmi/chains";
import { mainnet } from "wagmi/chains";

const chainMap: Record<string, Chain> = {
  ethereum: chains.mainnet,
  arbitrum: chains.arbitrum,
  avalanche: chains.avalanche,
  polygon: chains.polygon,
  // Add more chain mappings here
};

function getChainFromString(chainString: string): Chain | undefined {
  const lowercaseChainString = chainString.toLowerCase();
  return chainMap[lowercaseChainString];
}

export function useSwitchToEnvNetwork() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const envChain = getChainFromString(process.env.CHAIN!);

  if (envChain === undefined) {
    throw new Error("Local ENV doesnt have proper `CHAIN` defined.");
  }

  const isEnvNetwork = chain?.id === envChain.id;

  const switchToEnvNetwork = async () => {
    if (!isEnvNetwork && switchNetwork) {
      await switchNetwork(envChain.id);
    }
  };

  return { isEnvNetwork, switchToEnvNetwork };
}

export function useSwitchToSepolia() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isSepolia = chain?.id === sepolia.id;
  const switchToSepolia = async () => {
    if (!isSepolia && switchNetwork) {
      await switchNetwork(sepolia.id);
    }
  };

  return { isSepolia, switchToSepolia };
}

export function useSwitchToPolygon() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isPolygon = chain?.id === polygon.id;
  const switchToPolygon = async () => {
    if (!isPolygon && switchNetwork) {
      await switchNetwork(polygon.id);
    }
  };

  return { isPolygon, switchToPolygon };
}

export function useSwitchToEthereum() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isEthereum = chain?.id === mainnet.id;
  const switchToEthereum = async () => {
    if (!isEthereum && switchNetwork) {
      await switchNetwork(mainnet.id);
    }
  };

  return { isEthereum, switchToEthereum };
}

export function useSwitchToBase() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const isBase = chain?.id === base.id;
  const switchToBase = async () => {
    if (!isBase && switchNetwork) {
      await switchNetwork(base.id);
    }
  };

  return { isBase, switchToBase };
}
