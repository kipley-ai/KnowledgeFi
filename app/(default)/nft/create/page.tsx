"use client";
import { useAppProvider } from "@/providers/app-provider";
import { mintNFT } from "@/smart-contract/kip-protocol-contract";
import React, { useEffect, useState } from "react";

// export const metadata = {
//     title: 'NFT - Mosaic',
//     description: 'Page description',
// }

interface Form {
  name?: string;
  symbol?: string;
  slotValue?: number;
  kbId?: string;
}

export default function NFT() {
  const title = "Create NFT";
  const { setHeaderTitle } = useAppProvider();

  const [category, setCategory] = useState("");
  const [queryRoyalties, setQueryRoyalties] = useState("");

  const [form, setForm] = useState<Form>({
    kbId: "",
  });

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  useEffect(() => {
    document.title = title;
    setHeaderTitle(title);

    return () => setHeaderTitle("Default Title");
  }, []);

  const handleMintNFT = async () => {
    try {
      const res = await mintNFT(
        form.kbId!,
        form.name!,
        form.symbol!,
        form.slotValue!
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col sm:px-6 lg:px-8 py-8 bg-[#292D32]">
      <div className="mx-56">
        <h1 className="text-2xl font-semibold text-white">Create NFT</h1>
        <h5 className="text-md text-[#7C878E]">
          Give some general information about your NFT.
        </h5>
        <hr className="my-4 border border-gray-600" />
      </div>
      <form className="flex flex-col gap-8 mt-4 mx-56">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Name</label>
          <input
            className="rounded-xl bg-transparent text-white"
            type="text"
            name="name"
            placeholder='e.g. "Redeemable KB Card with logo"'
            value={form?.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-white">Description</label>
          <textarea
            className="rounded-xl bg-transparent"
            name="description"
            placeholder='e.g. "After purchasing you will able to received the logo..."'
            rows={4}
          />
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col gap-1 w-1/3">
            <label className="font-semibold text-white">Supply</label>
            <input
              className="rounded-xl bg-transparent w-11/12"
              type="number"
              name="supply"
              placeholder="e.g. 66"
              value={form?.slotValue}
              onChange={(e) => handleFormChange("slotValue", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <label className="font-semibold text-white">Category</label>
            <select
              className="rounded-xl bg-transparent text-[#7C878E] w-11/12"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-1/3">
            <label className="font-semibold text-white">Token Symbol</label>
            <input
              className="rounded-xl bg-transparent"
              type="text"
              name="tokenSymbol"
              placeholder="e.g. SDKW7890"
              value={form?.symbol}
              onChange={(e) => handleFormChange("symbol", e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-1 w-1/3">
            <label className="font-semibold text-white">Price Per Query</label>
            <input
              className="rounded-xl bg-transparent w-11/12"
              type="number"
              name="pricePerQuery"
              placeholder="e.g. USDT 0.13243"
            />
          </div>

          <div className="flex flex-col gap-1 w-1/3">
            <label className="font-semibold text-white">Query Royalties</label>
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
            <label className="font-semibold text-white">Price Per Query</label>
            <input
              className="rounded-xl bg-transparent"
              type="number"
              name="pricePerQuery"
              placeholder="e.g. USDT 1000"
            />
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <div></div>
          <button
            className="flex flex-row items-center justify-between bg-[#01F7FF] rounded-3xl w-44 p-2 px-5 mt-8"
            onClick={handleMintNFT}
            type="button"
          >
            <h5 className="text-sm text-black font-semibold">Generate NFT</h5>
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
      </form>
    </div>
  );
}
