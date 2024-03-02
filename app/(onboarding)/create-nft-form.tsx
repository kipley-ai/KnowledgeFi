"use client";
import { useAppProvider } from "@/providers/app-provider";
import { mintNFT } from "@/smart-contract/kip-protocol-contract";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useCreateKBAndMintNFT, useMintNFT } from "@/hooks/api/kb";
import { useSession } from "next-auth/react";
import { uploadFileS3 } from "@/app/api/upload/s3/helper";
import MintNFTModal from "./mint-nft-modal";
import ImageInput from "@/components/image-input";
import LoadingIcon from "public/images/loading-icon.svg";
import MintConfirmationModal from "@/components/modal-mint-confirmation";
import { DEFAULT_COVER_IMAGE } from "@/utils/constants";
import Tooltip from "@/components/tooltip";
import ArrowRight from "public/images/arrow-right.svg";
import { ZodError, z } from "zod";
import { noMoreThanCharacters } from "@/utils/utils";

// export const metadata = {
//     title: 'SFT - Mosaic',
//     description: 'Page description',
// }

interface Form {
  name?: string;
  description?: string;
  symbol?: string;
  shareSupply?: string;
  comissionRate?: number;
  pricePerQuery?: number;
  coverImage?: string;
}

export default function NFT() {
  const { setHeaderTitle, toast, setToast } = useAppProvider();
  const [showModal, setShowModal] = useState(false);
  const createKBandMintNFT = useCreateKBAndMintNFT();
  const { createKb, createNft } = useCreateChatbotContext();
  const [category, setCategory] = useState("");
  const [queryRoyalties, setQueryRoyalties] = useState("");
  const { setStep, setSftId, setKbId } = useCreateChatbotContext();
  const [errorMessage, setErrorMessage] = useState<any>({});
  const [allowGenerate, setAllowGenerate] = useState(false);
  const { data: twitterSession } = useSession();
  const [form, setForm] = useState<Form>({
    shareSupply: "10000",
    comissionRate: 1,
  });
  const [selectedFile, setSelectedFile] = useState<string>(DEFAULT_COVER_IMAGE);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [nftIdCreated, setNftIdCreated] = useState("");
  const [isConfirmModalOpen, setisConfirmModalOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const mintNFTAPI = useMintNFT();

  const formValidation = z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required")
      .max(100, noMoreThanCharacters(100)),

    description: z
      .string({
        required_error: "Description is required",
      })
      .min(1, "Description is required")
      .max(1000, noMoreThanCharacters(1000)),

    symbol: z
      .string({
        required_error: "Symbol is required",
      })
      .min(1, "Symbol is required")
      .max(10, noMoreThanCharacters(10)),

    pricePerQuery: z
      .string({
        required_error: "Price per query is required",
      })
      .min(1, "Price per query is required"),
  });

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    const title = "Mint SFT";
    document.title = title;

    return () => setHeaderTitle("");
  }, []);

  const handleMintNFT = async () => {
    try {
      setIsMinting(true);
      console.log(createKb.type, twitterSession?.user);
      let assetUrl;

      if (uploadedFile) {
        const newFile = new FormData();
        newFile.append("input-file-upload", uploadedFile);
        newFile.append("file-dir", "cover_image/nft");

        const response = await axios.post("/api/upload/s3/asset", newFile);
        assetUrl = response.data.link;
      }

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
          price_per_query: form?.pricePerQuery as number,
          query_royalties: form?.comissionRate as number,
          token_amount: 1,
          url: "",
          profile_image: uploadedFile ? assetUrl : selectedFile,
        },
        {
          async onSuccess(data, variables, context) {
            const { kb_id, nft_id, asset_id } = data.data;
            setNftIdCreated(nft_id);
            try {
              await mintNFT(
                kb_id,
                form.name!,
                form.symbol!,
                parseInt(form.shareSupply!),
                asset_id,
              );
              mintNFTAPI.mutate(
                { kb_id: kb_id },
                {
                  onSuccess: (data) => {
                    setTimeout(() => {
                      setIsMinting(false);
                      setShowModal(true);
                      setisConfirmModalOpen(false);
                      setKbId(kb_id);
                      setSftId(nft_id);
                    }, 3000);
                  },
                  onError: (error) => {
                    console.log(error);
                  },
                },
              );
              // setShowModal(true);
            } catch (error: any) {
              console.log(error);
              setIsMinting(false);
            }
          },
        },
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const validateForm = () => {
    let errorTmp = {};
    try {
      formValidation.parse(form);
    } catch (error) {
      const er = error as ZodError;
      er.errors.map((e) => {
        errorTmp = {
          ...errorTmp,
          [e.path[0]]: e.message,
        };
      });
    } finally {
      setErrorMessage(errorTmp);

      if (Object.keys(errorTmp).length > 0) {
        return false;
      }

      return true;
    }
  };

  const handleGenerateSFT = async () => {
    if (validateForm()) {
      setisConfirmModalOpen(true);
    }
  };

  return (
    <>
      <MintConfirmationModal
        isOpen={isConfirmModalOpen}
        setIsOpen={setisConfirmModalOpen}
        nftImage={selectedFile}
        handleMintNFT={handleMintNFT}
        isMinting={isMinting}
      />
      <MintNFTModal
        children={"Your Knowledge Asset is created successfully"}
        open={showModal}
        setOpen={setShowModal}
        kbIdCreated={nftIdCreated}
      />
      <div className="flex flex-col px-6 py-4 pb-14 lg:px-8 xl:px-32">
        <div className="flex items-center gap-6">
          <div
            className="h-full cursor-pointer"
            onClick={() => setStep("data_source")}
          >
            <Image
              src={"/images/corner-up-left.png"}
              alt="icon"
              width={24}
              height={24}
            />
          </div>
          <h1 className="text-2xl font-semibold text-white">MINT SFT</h1>
        </div>
        <hr className="my-4 border border-gray-600" />
        <form>
          <div className="flex flex-col gap-8 md:flex-row">
            <ImageInput
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setUploadedFile={setUploadedFile}
            />
            <div className="flex w-full flex-col">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#DDD] lg:text-sm">
                  Name
                </label>
                <input
                  className="rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
                  type="text"
                  name="name"
                  placeholder="Name your Knowledge SFT"
                  value={form?.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  maxLength={100}
                />
                {errorMessage && errorMessage.name ? (
                  <div className=" text-xs text-red-400">
                    {errorMessage.name}
                  </div>
                ) : (
                  <div className="text-xs opacity-0 lg:text-sm">a</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#DDD] lg:text-sm">
                  Description
                </label>
                <textarea
                  className="placeholder-text-[#7C878E] rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
                  name="description"
                  placeholder="Describe your Knowledge SFT"
                  rows={4}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                  maxLength={1000}
                />
                {errorMessage && errorMessage.description ? (
                  <div className=" text-xs text-red-400">
                    {errorMessage.description}
                  </div>
                ) : (
                  <div className="text-xs opacity-0 lg:text-sm">a</div>
                )}
              </div>

              <div className="flex flex-row flex-wrap">
                <div className="flex w-1/3 flex-col gap-1">
                  <label className="text-wrap text-xs font-semibold text-[#DDD] lg:text-sm">
                    Token Symbol
                  </label>
                  <input
                    className="placeholder-text-[#7C878E] w-11/12 rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
                    type="text"
                    name="tokenSymbol"
                    placeholder={
                      form.name
                        ? "e.g. " +
                          form.name?.replace(" ", "").slice(0, 4).toUpperCase()
                        : "Enter NFT Token Symbol"
                    }
                    value={form?.symbol}
                    onChange={(e) => handleFormChange("symbol", e.target.value)}
                    maxLength={10}
                  />
                  {errorMessage && errorMessage.symbol ? (
                    <div className=" text-xs text-red-400">
                      {errorMessage.symbol}
                    </div>
                  ) : (
                    <div className="text-xs opacity-0 lg:text-sm">a</div>
                  )}
                </div>
                {/* <div className="flex w-1/3 flex-col gap-1">
                  <label className="text-wrap text-xs font-semibold text-[#DDD] lg:text-sm">
                    Shares Supply
                  </label>
                  <select
                    className="w-11/12 rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
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
                <div className="flex w-1/3 flex-col gap-1">
                  <label className="text-wrap text-xs font-semibold text-[#DDD] lg:text-sm">
                    Royalties
                  </label>
                  <div className="flex w-full items-center">
                    <input
                      className="placeholder-text-[#7C878E] w-full rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
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
                    <div className="ml-2 block w-fit text-[#DDD]">%</div>
                  </div>
                </div> */}
                <div className="flex w-2/3 flex-col gap-1">
                  <label className=" flex flex-row items-center space-x-3 text-wrap text-xs font-semibold text-[#DDD] lg:text-sm">
                    <span>Price Per Query (in $KFI)</span>
                    <Tooltip bg="dark" position="right" size="md">
                      Set your price per query on your knowledge asset and get
                      paid in $KFI.
                    </Tooltip>
                  </label>
                  <div className="flex w-full flex-col">
                    <input
                      // className="rounded-xl bg-transparent w-11/12"
                      className="placeholder-text-[#7C878E] w-full rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
                      type="number"
                      name="pricePerQuery"
                      placeholder="e.g. 1"
                      onChange={(e) => {
                        if (parseFloat(e.target.value) < 0)
                          handleFormChange("pricePerQuery", 0);
                        else handleFormChange("pricePerQuery", e.target.value);
                      }}
                      value={form?.pricePerQuery}
                    />
                    {errorMessage && errorMessage.pricePerQuery ? (
                      <div className=" text-xs text-red-400">
                        {errorMessage.pricePerQuery}
                      </div>
                    ) : (
                      <div className="text-xs opacity-0 lg:text-sm">a</div>
                    )}
                  </div>
                </div>
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
          {/* <div className="flex justify-between">
              <button
                className="flex flex-row items-center justify-between  rounded-3xl p-2 px-5 border-2 border-[#50575F]"
                type="submit"
                onClick={() => {
                  setStep("data_source");
                }}
              >
                <h5 className="text-xs lg:text-sm text-white font-semibold">Back</h5>
              </button>
              <button
                className="flex flex-row items-center justify-between bg-[#01F7FF] disabled:bg-gray-500  rounded-3xl w-44 p-2 px-5"
                onClick={handleMintNFT}
                type="button"
                disabled={!allowGenerate}
              >
                <h5 className="text-xs lg:text-sm text-black font-semibold">
                  Generate SFT
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
            </div> */}
          <div className="mt-8 flex justify-between">
            <button
              className="flex flex-row items-center justify-between  rounded-3xl p-2 px-5"
              type="submit"
              onClick={() => {
                setStep("data_source");
              }}
            >
              <h5 className="text-xs font-semibold text-gray-400 hover:brightness-75 lg:text-sm">
                BACK
              </h5>
            </button>
            <button
              className="flex w-44 flex-row items-center justify-between rounded-sm bg-[#01F7FF] p-2 px-5 hover:brightness-75"
              onClick={handleGenerateSFT}
              // onClick={() => setStep("create_chatbot")}
              type="button"
            >
              <h5 className="text-xs font-semibold text-black lg:text-sm">
                GENERATE SFT
              </h5>
              <Image
                width={24}
                height={24}
                src={ArrowRight}
                alt="Arrow Right Icon"
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
