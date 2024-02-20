import Link from 'next/link'

export default function OnboardingProgress({ step = 1 }: { step?: number}) {
  return (
    <div className="px-4 pt-12 pb-8">
      <div className="max-w-md mx-auto w-full">
        <div className="relative">
          <div className="absolute left-0 top-1/4 -mt-px w-full h-0.5 bg-[#50575F]" aria-hidden="true"></div>
          <ul className="relative flex justify-between w-full">          
            <li className="">
              <div className="flex justify-center">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-[#1F1F1F] ${step>=1 ? 'bg-[#01F7FF]' : 'bg-[#7C878E]'}`}>1</span>
                </div>
                <div className="flex justify-center">
                  <span className={`font-medium text-sm ${step>=1 ? 'text-[#00FFFF]' : 'text-[#7C878E]'}`}>Select Data Elements</span>
                </div>
            </li>
            <li>
              <div className="flex justify-center">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-[#1F1F1F] ${step>=2 ? 'bg-[#01F7FF]' : 'bg-[#7C878E]'}`}>2</span>
              </div>
              <div className="flex justify-center">
                <span className={`font-medium text-sm ${step>=2 ? 'text-[#00FFFF]' : 'text-[#7C878E]'}`}>Mint SFT</span>
              </div>
            </li>
            <li>
              <div className="flex justify-center">
                <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold text-[#1F1F1F] ${step>=3 ? 'bg-[#01F7FF]' : 'bg-[#7C878E]'}`}>3</span>
              </div>
              <div className="flex justify-center">
                <span className={`font-medium text-sm ${step>=3 ? 'text-[#00FFFF]' : 'text-[#7C878E]'}`}>Create Chatbot</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
