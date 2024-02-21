"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

import Dashboard from "./(dashboard)/dashboard/page";
import LayoutDashboard from "./(dashboard)/dashboard/layout";
import GetInvolvedButton from "@/components/GetInvolvedButton/get-involved-button";
import OnboardingLayout from "./(onboarding)/onboarding/layout";
import Onboarding from "./(onboarding)/onboarding/page";

export default function Home() {
  const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false);

  const { address, isConnected } = useAccount();

  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/onboarding";

  useEffect(() => {
    if (isConnected) {
      setIsDefinitelyConnected(true);
    } else {
      setIsDefinitelyConnected(false);
    }
  }, [address]);

  if (isConnected) {
    redirect(nextUrl);
  } else {
    if (nextUrl === "/knowledge/create/iframe") {
      return (
        <div className="flex h-[100dvh] items-center justify-center overflow-hidden bg-neutral-900">
          <GetInvolvedButton
            buttonStyle="flex items-center border border-gray-700 rounded-full py-6 px-8 text-sm font-medium text-neutral-300 duration-200"
            wrapStyle="flex items-center text-sm font-medium ml-3 text-neutral-300 duration-200"
            chainStyle="flex items-center text-sm font-medium ml-3 text-neutral-300 duration-200"
            content={
              <>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-0.000976562 14.2241C0.333594 12.758 1.14413 11.444 2.30378 10.4875C3.15538 9.66561 3.96528 8.80065 4.83078 7.92185L6.54913 9.72624L8.48479 7.68661L9.68383 8.91589L7.77469 10.7657L9.21001 12.1314L11.0295 10.256L12.2702 11.5204L10.3119 13.3844L12.1527 15.1243C11.8836 15.3557 11.6752 15.5164 11.4895 15.6997C10.7516 16.4268 10.0036 17.1463 9.29222 17.8986C8.36961 18.9927 7.09825 19.7348 5.6925 20H4.80796C4.0883 19.766 3.39032 19.4699 2.72191 19.115C2.02335 18.6865 1.42152 18.1173 0.954517 17.4436C0.487513 16.7699 0.165573 16.0064 0.00920303 15.2015L-0.000976562 14.2241ZM4.94954 10.4952C4.11058 11.2729 3.20841 11.9871 2.45662 12.8355C1.96917 13.3084 1.68754 13.9545 1.67264 14.6338C1.65774 15.313 1.91079 15.9709 2.37704 16.4647C2.75949 16.9525 3.20807 17.3844 3.70995 17.748C4.14545 18.1181 4.69732 18.3231 5.26866 18.3268C5.84 18.3305 6.39436 18.1328 6.83462 17.7684C7.83531 16.9793 8.7172 16.0424 9.63324 15.1863L4.94954 10.4952Z"
                    fill="white"
                  />
                  <path
                    d="M19.9964 5.77497C19.6682 7.22751 18.8684 8.53024 17.722 9.47976C16.8552 10.3067 16.034 11.1818 15.2317 11.9948L8.01465 4.78742C8.26735 4.53452 8.59075 4.23345 8.89904 3.92365C9.68579 3.14053 10.4709 2.35525 11.2542 1.56791C12.0623 0.756151 13.0979 0.209354 14.2236 -1.52588e-05H15.2015C15.9081 0.227784 16.5933 0.517295 17.2494 0.864982C17.9553 1.29505 18.5645 1.86687 19.038 2.54466C19.5114 3.22244 19.8389 3.99144 20.0001 4.80254L19.9964 5.77497ZM15.079 9.49489C15.8914 8.73621 16.7719 8.02306 17.5224 7.18977C18.0115 6.71859 18.297 6.07461 18.318 5.39557C18.339 4.71653 18.094 4.05624 17.635 3.55567C17.2661 3.07516 16.8309 2.64943 16.3425 2.29121C15.878 1.88388 15.2792 1.66262 14.6616 1.67009C14.0441 1.67756 13.451 1.91321 12.9965 2.33165C12.0615 3.09033 11.2278 3.98427 10.3813 4.79606L15.079 9.49489Z"
                    fill="white"
                  />
                </svg>
                <span className="ml-3 text-xl font-medium text-neutral-300 duration-200">
                  Connect Wallet
                </span>
              </>
            }
          />
        </div>
      );
    }

    return (
      <>
        <OnboardingLayout>
          <Onboarding />
        </OnboardingLayout>
      </>
    );
  }
}
