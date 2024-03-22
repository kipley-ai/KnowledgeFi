import Image from "next/image";
import PointIcon from "components/icon/img background copy 2.svg";
import ReferralBonusBackground from "components/background/task-center-background.svg";
import BlindBoxPicture from "components/background/blind box_final_bottom 1.svg"

const Header = () => {
    return (
        <div className="flex justify-between items-start bg-[#303030]">
            <div className="w-1/4 flex items-center flex-col">
                {/* Base Point Section */}
                <div className="flex items-center space-x-3 my-4 pr-8">
                    <Image src={PointIcon} alt="" />
                    <div>
                        <div className="text-[#808191] text-sm">Base Point</div>
                        <div className="text-white text-3xl font-bold">10000</div>
                    </div>
                </div>

                {/* Separator Line */}
                <div className="border-b border-white w-full my-2"></div>

                {/* Total Referral Section */}
                <div className="flex items-center space-x-3 my-4">
                    <Image src={PointIcon} alt="" />
                    <div>
                        <div className="text-[#808191] text-sm">Total Referral</div>
                        <div className="text-white text-3xl font-bold">10000</div>
                    </div>
                </div>
            </div>

            {/* Referral Bonus Section */}
            {/* Referral Bonus Section */}
            <div className="w-3/4 flex items-center pl-10" style={{ backgroundImage: `url(${ReferralBonusBackground.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-center flex-grow">
                        {/* Referral Bonus Code */}
                        <div className="text-white">
                            <h2 className="text-xl font-bold mb-2">Referral Bonus</h2>
                            <p className="text-gray-300 text-sm mb-4">Invite friends to earn more points!</p>
                            <div className="flex items-center bg-transparent border border-[#00EBFF] p-2">
                                <input
                                    type="text"
                                    readOnly
                                    value="https://knowledgefi.xyz/invite/97902dsa"
                                    className="bg-transparent text-white focus:outline-none flex-grow mr-4"
                                />
                                <button className="shrink-0">
                                    {/* SVG icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0012 6H7.00122V22H15.0012V20H17.0012V18H15.0012V16H17.0012V18H19.0012V16H21.0012V6ZM9.00122 20V8H19.0012V14H13.0012V20H9.00122ZM3.00122 18H5.00122V4H17.0012V2H5.00122H3.00122V4V18Z" fill="#01F7FF" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Referral Bonus Image */}
                    <div className="hidden lg:block shrink-0">
                        <Image src={BlindBoxPicture} alt="" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Header;
