"use client";
import { useAppProvider } from "@/providers/app-provider";
import { mintNFT } from "@/smart-contract/kip-protocol-contract";
import React, { useEffect, useState } from "react";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useCreateKBAndMintNFT } from "@/hooks/api/kb";
import { useSession } from "next-auth/react";
import MintNFTModal from "./mint-nft-modal";
import ImageInput from "@/components/image-input";
import LoadingIcon from "public/images/loading-icon.svg";

// export const metadata = {
//     title: 'NFT - Mosaic',
//     description: 'Page description',
// }

interface Form {
  name?: string;
  description?: string;
  symbol?: string;
  shareSupply?: string;
  comissionRate?: number;
  coverImage?: string;
}

const noMoreThanCharacters = (number: number) =>
  "no more than " + number + " characters";

export default function NFT() {
  const { setHeaderTitle, toast, setToast } = useAppProvider();
  const [showModal, setShowModal] = useState(false);
  const createKBandMintNFT = useCreateKBAndMintNFT();
  const { createKb, createNft } = useCreateChatbotContext();
  const [category, setCategory] = useState("");
  const [queryRoyalties, setQueryRoyalties] = useState("");
  const { setStep } = useCreateChatbotContext();
  const [errorMessage, setErrorMessage] = useState<any>({});
  const [allowGenerate, setAllowGenerate] = useState(false);
  const { data: twitterSession } = useSession();
  const [form, setForm] = useState<Form>({ shareSupply: "5000" });
  const [selectedFile, setSelectedFile] = useState<any>(LoadingIcon)
  const [nftIdCreated,setNftIdCreated] = useState("")

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const title = "Mint NFT";
    document.title = title;

    return () => setHeaderTitle("");
  }, []);

  const handleMintNFT = async () => {
    try {
      console.log(createKb.type, twitterSession?.user);
      createKBandMintNFT.mutate(
        {
          type: createKb.type,
          kb_data: createKb.type == "files" ? createKb.kb_data : [],
          username:
            createKb.type == "twitter"
              ? (twitterSession?.user?.username as string)
              : "",
          name: form?.name as string,
          description: form?.description as string,
          contract_address: "",
          wallet_address: "",
          supply: form?.shareSupply as string,
          category: "",
          token_symbol: form?.symbol as string,
          price_per_query: 1,
          query_royalties: 0,
          token_amount: 1,
          url: "",
        },
        {
          async onSuccess(data, variables, context) {
            const { kb_id, nft_id, asset_id } = data.data;
            setNftIdCreated(nft_id)
            await mintNFT(
              // kb_id,
              form.name!,
              form.symbol!,
              parseInt(form.shareSupply!),
              asset_id,
            );
            setShowModal(true);
          },
        },
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (form.name && form.name.length > 100)
      setErrorMessage({
        ...errorMessage,
        name: noMoreThanCharacters(100),
      });
    else {
      setErrorMessage({
        ...errorMessage,
        name: "",
      });
    }
  }, [form.name]);

  useEffect(() => {
    if (form.description && form.description.length > 1000)
      setErrorMessage({
        ...errorMessage,
        description: noMoreThanCharacters(1000),
      });
    else {
      setErrorMessage({
        ...errorMessage,
        description: "",
      });
    }
  }, [form.description]);

  useEffect(() => {
    if (form.symbol && form.symbol.length > 10)
      setErrorMessage({
        ...errorMessage,
        symbol: noMoreThanCharacters(10),
      });
    else {
      setErrorMessage({
        ...errorMessage,
        symbol: "",
      });
    }
  }, [form.symbol]);

  useEffect(() => {
    if (
      errorMessage &&
      !errorMessage.name &&
      !errorMessage.description &&
      !errorMessage.symbol
    ) {
      setAllowGenerate(true);
    } else {
      setAllowGenerate(false);
    }
  }, [errorMessage]);

  return (
    <>
      <MintNFTModal
        children={"Your Knowledge Asset is created successfully"}
        open={showModal}
        setOpen={setShowModal}
        kbIdCreated={nftIdCreated}
      />
      <div className="flex flex-col sm:px-6 lg:px-8 py-8 pb-16 bg-[#292D32]">
        <div className="mx-56">
          <h1 className="text-2xl font-semibold text-white">Mint NFT</h1>
          <hr className="my-4 border border-gray-600" />
        </div>
        <form className="flex flex-row gap-10 mt-4 mx-56">
          <ImageInput 
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#DDD]">Name</label>
              <input
                className="rounded-xl bg-transparent text-[#DDD]"
                type="text"
                name="name"
                placeholder="Name your Knowledge NFT"
                value={form?.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
              {errorMessage && errorMessage.name ? (
                <div className=" text-red-400">{errorMessage.name}</div>
              ) : (
                <div className="opacity-0">a</div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold text-[#DDD]">Description</label>
              <textarea
                className="rounded-xl bg-transparent text-[#DDD] placeholder-text-[#7C878E]"
                name="description"
                placeholder="Describe your Knowledge NFT"
                rows={4}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
              />
              {errorMessage && errorMessage.description ? (
                <div className=" text-red-400">{errorMessage.description}</div>
              ) : (
                <div className="opacity-0">a</div>
              )}
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col gap-1 w-1/3">
                <label className="font-semibold text-[#DDD] ">
                  Token Symbol
                </label>
                <input
                  className="rounded-xl bg-transparent w-11/12 text-[#DDD] placeholder-text-[#7C878E]"
                  type="text"
                  name="tokenSymbol"
                  placeholder="e.g. BAYC"
                  value={form?.symbol}
                  onChange={(e) => handleFormChange("symbol", e.target.value)}
                />
                {errorMessage && errorMessage.symbol ? (
                  <div className=" text-red-400">{errorMessage.symbol}</div>
                ) : (
                  <div className="opacity-0">a</div>
                )}
              </div>
              <div className="flex flex-col gap-1 w-1/3">
                <label className="font-semibold text-[#DDD]">
                  Shares Supply
                </label>
                <select
                  className="rounded-xl bg-transparent text-[#DDD] w-11/12"
                  value={form?.shareSupply}
                  onChange={(e) =>
                    handleFormChange("shareSupply", e.target.value)
                  }
                >
                  <option className="text-[#7C878E]" value="5000">
                    5000
                  </option>
                  <option className="text-[#7C878E]" value="10000">
                    10000
                  </option>
                  <option className="text-[#7C878E]" value="50000">
                    50000
                  </option>
                  <option className="text-[#7C878E]" value="100000">
                    100000
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-1 w-1/3">
                <label className="font-semibold text-[#DDD]">
                  Commission Rate
                </label>
                <div className="flex w-full items-center ">
                  <input
                    className="rounded-xl bg-transparent w-full text-[#DDD] placeholder-text-[#7C878E]"
                    type="number"
                    name="comissionRate"
                    placeholder="e.g. 5"
                    onChange={(e) => {
                      console.log(e.target.value, e.target.value > "99");
                      if (parseFloat(e.target.value) < 0)
                        handleFormChange("comissionRate", 0);
                      else if (parseFloat(e.target.value) > 99)
                        handleFormChange("comissionRate", 99);
                      else handleFormChange("comissionRate", e.target.value);
                    }}
                    value={form?.comissionRate}
                  />
                  <div className="block text-[#DDD] w-fit ml-2">%</div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-row">
					<div className="flex flex-col gap-1 w-1/3">
						<label className="font-semibold text-[#DDD]">Price Per Query</label>
						<input
							className="rounded-xl bg-transparent w-11/12"
							type="number"
							name="pricePerQuery"
							placeholder="e.g. USDT 0.13243"
						/>
					</div>

					<div className="flex flex-col gap-1 w-1/3">
						<label className="font-semibold text-[#DDD]">Query Royalties</label>
						<select
							className="rounded-xl bg-transparent text-[#7C878E] w-11/12"
							value={queryRoyalties}
							onChange={(e) => setQueryRoyalties(e.target.value)}
						>
							<option value="">Select</option>
							<option value="royalties1">Royalties 1</option>
							<option value="royalties2">Royalties 2</option>
							<option value="royalties3">Royalties 3</option>
						</select>
					</div>

					<div className="flex flex-col gap-1 w-1/3">
						<label className="font-semibold text-[#DDD]">Price Per Query</label>
						<input
							className="rounded-xl bg-transparent"
							type="number"
							name="pricePerQuery"
							placeholder="e.g. USDT 1000"
						/>
					</div>
				</div> */}
            <div className="flex justify-between">
              <button
                className="flex flex-row items-center justify-between  rounded-3xl p-2 px-5 border-2 border-[#50575F]"
                type="submit"
                onClick={() => {
                  setStep("data_source");
                }}
              >
                <h5 className="text-sm text-white font-semibold">Back</h5>
              </button>
              <button
                className="flex flex-row items-center justify-between bg-[#01F7FF] disabled:bg-gray-500  rounded-3xl w-44 p-2 px-5"
                onClick={handleMintNFT}
                type="button"
                disabled={!allowGenerate}
              >
                <h5 className="text-sm text-black font-semibold">
                  Generate NFT
                </h5>
                <svg
                  width="20"
                  height="10"
                  viewBox="0 0 20 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
                    fill="#151515"
                  />
                  <path
                    d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
                    fill="#151515"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
