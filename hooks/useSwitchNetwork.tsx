import { useNetwork, useSwitchNetwork } from "wagmi";
import { base, sepolia } from "wagmi/chains";
import { polygon } from "wagmi/chains";
import { mainnet } from "wagmi/chains";

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
