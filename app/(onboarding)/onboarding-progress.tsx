import Link from "next/link";

interface BoxWithNumberProps {
  number: number | string;
}

const BoxWithNumber: React.FC<BoxWithNumberProps> = ({ number }) => {
  return (
    <div className="flex h-5 w-5 items-center justify-center border border-aqua-700 bg-black">
      <span className="text-sm font-bold">{number}</span>
    </div>
  );
};

export default function OnboardingProgress({ step = 1 }: { step?: number }) {
  return (
    <div className="pb-8">
      <div className="flex w-full justify-center">
        <div className="relative">
          <div
            className="absolute inset-x-14 top-1/4 -mt-px h-0.5 bg-[#50575F]"
            aria-hidden="true"
          ></div>
          <ul className="relative flex justify-between gap-24">
            <li className="flex-1">
              <div className="flex justify-center">
                <span className="text-[#01F7FF]">
                  {step > 1 ? (
                    <BoxWithNumber number="✓" />
                  ) : (
                    <BoxWithNumber number={1} />
                  )}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-center text-sm font-medium ${step >= 1 ? "text-[#00FFFF]" : "text-[#00FFFF]"}`}
                >
                  Select Data Elements
                </span>
              </div>
            </li>
            <li className="flex-1">
              <div className="flex justify-center">
                <span className="text-[#01F7FF]">
                  {step > 2 ? (
                    <BoxWithNumber number="✓" />
                  ) : (
                    <BoxWithNumber number={2} />
                  )}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-center text-sm font-medium ${step >= 2 ? "text-[#00FFFF]" : "text-[#00FFFF]"}`}
                >
                  Mint SFT
                </span>
              </div>
            </li>
            <li className="flex-1">
              <div className="flex justify-center">
                <span className="text-[#01F7FF]">
                  {step > 3 ? (
                    <BoxWithNumber number="✓" />
                  ) : (
                    <BoxWithNumber number={3} />
                  )}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-center text-sm font-medium ${step >= 3 ? "text-[#00FFFF]" : "text-[#00FFFF]"}`}
                >
                  Create Chatbot
                </span>
              </div>
            </li>
            <li className="flex-1">
              <div className="flex justify-center">
                <span className="text-[#01F7FF]">
                  {step > 4 ? (
                    <BoxWithNumber number="✓" />
                  ) : (
                    <BoxWithNumber number={4} />
                  )}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-center text-sm font-medium ${step >= 4 ? "text-[#00FFFF]" : "text-[#00FFFF]"}`}
                >
                  Get KFI Token
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
