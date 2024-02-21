'use client'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

type GetInvolvedButtonProps = {
    buttonStyle?: string;
    chainStyle?: string;
    wrapStyle?: string;
    content?: any;
};

const GetInvolvedButton = ({ buttonStyle, chainStyle, wrapStyle, content }: GetInvolvedButtonProps) => {
    // return (
    //     // <></>
    //     <ConnectButton />
    // )
    return (
        <>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    mounted,
                }) => {
                    const ready = mounted;
                    const connected = ready && account && chain;

                    return (
                        <div
                            {...(!ready && {
                                "aria-hidden": true,
                                style: {
                                    opacity: 0,
                                    pointerEvents: "none",
                                    userSelect: "none",
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <button
                                            className={buttonStyle}
                                            onClick={openConnectModal}
                                        >
                                            {content
                                                ? content
                                                : <span className="text-sm font-medium ml-3  text-neutral-300 duration-200">
                                                    Connect Wallet
                                                </span>
                                            }
                                        </button>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <button
                                            onClick={openChainModal}
                                            className={""}
                                            type="button"
                                        >
                                            Wrong network
                                        </button>
                                    );
                                }

                                return (
                                    <div className={wrapStyle}>
                                        <button
                                            onClick={openChainModal}
                                            className={chainStyle}
                                            type="button"
                                        >
                                            {chain.hasIcon && (
                                                <div
                                                    style={{
                                                        background:
                                                            chain.iconBackground,
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: 999,
                                                        overflow: "hidden",
                                                        marginRight: 4,
                                                    }}
                                                >
                                                    {chain.iconUrl && (
                                                        <Image
                                                            src={chain.iconUrl}
                                                            alt={
                                                                chain.name ??
                                                                "Chain icon"
                                                            }
                                                            width={12}
                                                            height={12}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                            {chain.name}
                                        </button>

                                        <button
                                            className={buttonStyle}
                                            onClick={openAccountModal}
                                        >
                                            <span>Connected</span>
                                        </button>
                                    </div>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </>
    );
};

export default GetInvolvedButton;
