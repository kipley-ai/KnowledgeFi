import Link from "next/link";

export default function OnboardingProgress({ step = 1 }: { step?: number }) {
  return (
    <div className="px-4 pb-8">
      <div className="mx-auto w-full max-w-md">
        <div className="relative">
          <div
            className="absolute left-16 right-10 top-1/4 -mt-px h-0.5  bg-[#50575F]"
            aria-hidden="true"
          ></div>
          <ul className="relative flex w-full justify-between">
            <li className="">
              <div className="flex justify-center">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-[#1F1F1F] ${step >= 1 ? "bg-[#01F7FF]" : "bg-[#7C878E]"}`}
                >
                  {step > 1 ? <span>&#10003;</span> : 1}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-sm font-medium ${step >= 1 ? "text-[#00FFFF]" : "text-[#7C878E]"}`}
                >
                  Select Data Elements
                </span>
              </div>
            </li>
            <li>
              <div className="flex justify-center">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-[#1F1F1F] ${step >= 2 ? "bg-[#01F7FF]" : "bg-[#7C878E]"}`}
                >
                  {step > 2 ? <span>&#10003;</span> : 2}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-sm font-medium ${step >= 2 ? "text-[#00FFFF]" : "text-[#7C878E]"}`}
                >
                  Mint SFT
                </span>
              </div>
            </li>
            <li>
              <div className="flex justify-center">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold text-[#1F1F1F] ${step >= 3 ? "bg-[#01F7FF]" : "bg-[#7C878E]"}`}
                >
                  {step > 3 ? <span>&#10003;</span> : 3}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-sm font-medium ${step >= 3 ? "text-[#00FFFF]" : "text-[#7C878E]"}`}
                >
                  Create Chatbot
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
