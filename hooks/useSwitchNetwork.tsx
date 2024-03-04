import { useNetwork, useSwitchNetwork } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { polygon } from 'wagmi/chains';

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
