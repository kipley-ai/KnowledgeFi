import Image from "next/image";
import PointIcon from "components/icon/img background copy 2.svg";
import ReferralBonusBackground from "components/background/task-center-background.svg";
import BlindBoxPicture from "components/background/blind box_final_bottom 1.svg";
import { useTotalReferral } from "@/hooks/api/user";
import SpinnerIcon from "@/public/images/spinner-icon.svg";
import { useTaskBasePoint } from "@/hooks/api/task";
import CountUp from "react-countup"
import { useState, useEffect } from "react";

const TotalReferral = () => {
  const { data, isSuccess } = useTotalReferral();

  if (isSuccess) {
    return (
      <div className="flex-1 px-4 py-4 flex items-center space-x-3">
        <Image src={PointIcon} className="size-[50px] md:size-auto" alt="" />
        <div>
          <div className="text-sm text-[#808191]">Referral Points</div>
          <div className="text-3xl font-bold text-white">
            {data.referral_count}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-4 flex h-full max-h-full w-full max-w-full items-center justify-center">
      <Image
        src={SpinnerIcon}
        alt="Loading"
        className="mr-3 animate-spin"
        width={40}
        height={40}
      />
    </div>
  );
};

const Header = () => {
  const { data } = useTaskBasePoint();

  // Initial states for start and end points
  const [startPoints, setStartPoints] = useState(0);
  const [endPoints, setEndPoints] = useState(0);

  // Effect hook to update endPoints whenever data changes
  useEffect(() => {
    if (data?.data?.base_point) {
      setStartPoints(endPoints); // Set startPoints to the previous endPoints
      setEndPoints(data.data.base_point); // Update endPoints with the new value
    }
  }, [data?.data?.base_point]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#303030]">
      <div className="flex w-full h-full md:w-1/4 md:flex-col items-start">
        {/* Base Point Section */}
        <div className="py-4 flex-1 px-4 flex items-center space-x-3 border-r border-white md:border-none">
          <Image src={PointIcon} className="size-[50px] md:size-auto" alt="" />
          <div>
            <div className="text-sm text-[#808191]">Base Point</div>
            <div className="text-3xl font-bold text-white">
              <CountUp start={startPoints} end={endPoints} duration={1.5} />
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="hidden md:block my-2 w-full border-b border-white"></div>

        {/* Total Referral Section */}
        <TotalReferral />
      </div>

      {/* Referral Bonus Section */}
      {/* Referral Bonus Section */}
      <div
        className="flex w-full md:w-3/4 h-full items-center pl-10 py-4"
        style={{
          backgroundImage: `url(${ReferralBonusBackground.src})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex w-full flex-row justify-between items-center">
          <div className="flex flex-grow flex-col justify-center">
            {/* Referral Bonus Code */}
            <div className="text-white">
              <h2 className="mb-2 text-xl font-bold">Referral Bonus</h2>
              <p className="mb-4 text-sm text-gray-300">
                Invite friends to earn more points!
              </p>
              <div className="flex items-center border border-[#00EBFF] bg-transparent p-2">
                <input
                  type="text"
                  readOnly
                  value="Coming Soon..."
                  className="mr-4 flex-grow bg-transparent text-white focus:outline-none"
                />
                <button className="shrink-0">
                  {/* SVG icon */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.0012 6H7.00122V22H15.0012V20H17.0012V18H15.0012V16H17.0012V18H19.0012V16H21.0012V6ZM9.00122 20V8H19.0012V14H13.0012V20H9.00122ZM3.00122 18H5.00122V4H17.0012V2H5.00122H3.00122V4V18Z"
                      fill="#01F7FF"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Referral Bonus Image */}
          <div className="shrink">
            <Image src={BlindBoxPicture} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
