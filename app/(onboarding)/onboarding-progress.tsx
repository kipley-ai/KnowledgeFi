import Link from "next/link";

interface BoxWithNumberProps {
  number: number | string;
}

const BoxWithNumber: React.FC<BoxWithNumberProps> = ({ number }) => {
  return (
    <div className="w-5 h-5 border border-aqua-700 bg-black flex justify-center items-center">
      <span className="text-sm font-bold">{number}</span>
    </div>
  );
};

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
            <li className="relative right-9">
              <div className="flex justify-center">
                <span
                  className="text-[#01F7FF]"
                >
                  {step > 1 ? <BoxWithNumber number="✓" /> : <BoxWithNumber number={1} />}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-sm font-medium ${step >= 1 ? "text-[#00FFFF]" : "text-[#00FFFF]"}`}
                >
                  Select Data Elements
                </span>
              </div>
            </li>
            <li>
              <div className="flex justify-center">
                <span
                  className="text-[#01F7FF]"
                >
                  {step > 2 ? <BoxWithNumber number="✓" /> : <BoxWithNumber number={2} />}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-sm font-medium ${step >= 2 ? "text-[#00FFFF]" : "text-[#00FFFF]"}`}
                >
                  Mint SFT
                </span>
              </div>
            </li>
            <li className="relative left-8">
              <div className="flex justify-center">
                <span
                  className="text-[#01F7FF]"
                >
                  {step > 3 ? <BoxWithNumber number="✓" /> : <BoxWithNumber number={3} />}
                </span>
              </div>
              <div className="flex justify-center">
                <span
                  className={`text-sm font-medium ${step >= 3 ? "text-[#00FFFF]" : "text-[#00FFFF]"}`}
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
