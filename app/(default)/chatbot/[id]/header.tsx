import { useNewSession } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
    const title = "Levi Ackerman - Chatbot";

    useEffect(() => {
        document.title = title;
    }, [title]);

    const newSession = useNewSession()
    const {id} = useParams()

    return (
        <div className="text-white flex justify-between items-center">
            <div className="flex items-center gap-6">
                <button className="text-white text-2xl focus:outline-none">
                    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.02001 6.79012C7.10637 6.79012 6.36572 7.53077 6.36572 8.44441C6.36572 9.35805 7.10637 10.0987 8.02001 10.0987L24.3456 10.0987C25.2593 10.0987 25.9999 9.35805 25.9999 8.44441C25.9999 7.53077 25.2593 6.79011 24.3456 6.79011L8.02001 6.79012Z" fill="#01F7FF" />
                        <path d="M7.06796 6.99072C6.47814 7.63676 6.47814 8.6842 7.06796 9.33024C7.65778 9.97628 8.61406 9.97628 9.20388 9.33024L13.6053 4.50928C14.1951 3.86324 14.1951 2.8158 13.6053 2.16976C13.0155 1.52372 12.0592 1.52372 11.4694 2.16976L7.06796 6.99072Z" fill="#01F7FF" />
                    </svg>
                </button>
                <div className="flex items-center gap-2">
                    <img src="images/user-32-03.jpg" alt="Profile" className="w-8 h-8 rounded-full" />
                    <h1 className="text-xl">Levi Ackerman</h1>
                </div>
            </div>
            <div className="flex flex-row justify-between pb-5">
                <button className="text-white text-2xl focus:outline-none pr-10 pt-5">
                    ...
                </button>
                <button className="flex items-center justify-center bg-[#FFFFFF] rounded-3xl p-2 px-5 mt-8" type="submit">
                    <h5 className="text-black font-semibold flex-grow pr-2">Share</h5>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3261 9.50616C16.5296 9.33179 16.6313 9.24461 16.6686 9.14086C16.7013 9.04979 16.7013 8.95019 16.6686 8.85913C16.6313 8.75538 16.5296 8.66819 16.3261 8.49382L9.26719 2.4433C8.917 2.14314 8.74191 1.99306 8.59367 1.98938C8.46483 1.98618 8.34177 2.04278 8.26035 2.14268C8.16667 2.25763 8.16667 2.48824 8.16667 2.94947V6.52885C6.38777 6.84006 4.75966 7.74146 3.54976 9.09488C2.23069 10.5704 1.50103 12.4799 1.5 14.4591V14.9691C2.37445 13.9157 3.46626 13.0638 4.70063 12.4716C5.78891 11.9495 6.96535 11.6403 8.16667 11.5588V15.0505C8.16667 15.5117 8.16667 15.7424 8.26035 15.8573C8.34177 15.9572 8.46483 16.0138 8.59367 16.0106C8.74191 16.0069 8.917 15.8568 9.26719 15.5567L16.3261 9.50616Z" stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button className="text-gray-400 hover:text-blue-500 self-end" 
                onClick={()=> {
                    newSession.mutate({chatbot_id:id as string})
                }}>
                    {/* Insert regenerate icon here */}
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.75"
                            y="0.75"
                            width="38.5"
                            height="38.5"
                            rx="11.25"
                            stroke="#393E44"
                            stroke-width="1.5"
                        />
                        <g clip-path="url(#clip0_201_34)">
                            <path
                                d="M19.1665 11.6667L21.6665 14.1667M21.6665 14.1667L19.1665 16.6667M21.6665 14.1667H15.6665C14.2664 14.1667 13.5663 14.1667 13.0315 14.4392C12.5611 14.6789 12.1787 15.0613 11.939 15.5317C11.6665 16.0665 11.6665 16.7666 11.6665 18.1667V22.9167C11.6665 23.3037 11.6665 23.4972 11.6879 23.6597C11.8356 24.7815 12.7184 25.6643 13.8402 25.812C14.0026 25.8334 14.1962 25.8334 14.5832 25.8334M18.3332 25.8334H24.3332C25.7333 25.8334 26.4334 25.8334 26.9681 25.5609C27.4386 25.3212 27.821 24.9387 28.0607 24.4683C28.3332 23.9336 28.3332 23.2335 28.3332 21.8334V17.0834C28.3332 16.6963 28.3332 16.5028 28.3118 16.3404C28.1641 15.2185 27.2813 14.3358 26.1595 14.1881C25.997 14.1667 25.8035 14.1667 25.4165 14.1667M18.3332 25.8334L20.8332 28.3334M18.3332 25.8334L20.8332 23.3334"
                                stroke="#7C878E"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_201_34">
                                <rect
                                    width="20"
                                    height="20"
                                    fill="white"
                                    transform="translate(10 10)"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Header;