const MessageList = () => {
    return (
        <div className="flex flex-col p-4 space-y-4 overflow-auto border border-gray-600">
            {/* Levi's message */}
            <div className="flex items-start space-x-2">
                <div className="flex-none">
                    <div className="rounded-full bg-gray-300 w-8 h-8"></div>
                </div>
                <div className="flex-grow">
                    <div className="text-xs text-gray-400 mb-1">Levi Ackerman:</div>
                    <div className="text-white text-sm rounded-lg py-2 w-full">
                        I for one, when I mention my love of mountain biking, am often met with looks of disgust and disappointment. Trail runners don’t like us. Roadies hate us. Hikers despise us. Even internet search algorithms seem to have a bias against us mountain bikers. During the coronavirus pandemic, when I began to wonder why brake pads had become scarce commodities, I typed the words “why are mountain bike…” into an internet search bar. “Why are mountain bike brake pads so hard to find?” I intended to inquire. But the search bar auto-filled: “…rs such douchebags.”
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-600 mx-[-1rem]" />
            {/* User's message */}
            <div className="flex items-start justify-end space-x-2 flex-row">
                <div className="flex-none">
                    <div className="rounded-full bg-gray-300 w-8 h-8"></div>
                </div>
                <div className="flex-grow">
                    <div className="text-xs text-gray-400 mb-1">You:</div>
                    <div className="text-white text-sm rounded-lg py-2 w-full">
                        I for one, when I mention my love of mountain biking, am often met with looks of disgust and disappointment. Trail runners don’t like us. Roadies hate us. Hikers despise us. Even internet search algorithms seem to have a bias against us mountain bikers. During the coronavirus pandemic, when I began to wonder why brake pads had become scarce commodities, I typed the words “why are mountain bike…” into an internet search bar. “Why are mountain bike brake pads so hard to find?” I intended to inquire. But the search bar auto-filled: “…rs such douchebags.”
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-600 mx-[-1rem]" />
            {/* Repeat the pattern above for each message */}
            {/* ... */}
            <div className="flex items-start space-x-2">
                <div className="flex-none">
                    <div className="rounded-full bg-gray-300 w-8 h-8"></div>
                </div>
                <div className="flex-grow">
                    <div className="text-xs text-gray-400 mb-1">Levi Ackerman:</div>
                    <div className="text-white text-sm rounded-lg py-2 w-full">
                        Brace yourself to undertake an extraordinary adventure to the heart of Africa’s arid landscapes, where ancient deserts, rugged mountains, and unique wildlife offer a surreal and untamed experience. Cradled in the southwestern corner of the continent, this captivating nation invites you to explore its vast wilderness and connect with the raw beauty of the natural world.
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-600 mx-[-1rem]" />
            <div className="flex items-start justify-end space-x-2 flex-row">
                <div className="flex-none">
                    <div className="rounded-full bg-gray-300 w-8 h-8"></div>
                </div>
                <div className="flex-grow">
                    <div className="text-xs text-gray-400 mb-1">You:</div>
                    <div className="text-white text-sm rounded-lg py-2 w-full">
                        Your expedition begins as you touch down in this land of stark contrasts, where the vastness of the Namib Desert stretches to the horizon, and the silence of the Kalahari Desert is broken only by the whispers of the wind. Here, time seems to slow, and the spirit of exploration beckons.
                    </div>
                </div>
            </div>
            <hr className="border-t border-gray-600 mx-[-1rem]" />
            <div className="flex flex-col space-y-2">
                {/* Loading icon and generating text */}
                <div className="flex items-center text-gray-400 text-sm mb-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8v8h8c0 4.418-3.582 8-8 8s-8-3.582-8-8z"></path>
                    </svg>
                    Generating answers for you...
                </div>
                {/* Message bubble */}
                <div className="flex flex-col space-y-2">
                    {/* Message bubble */}
                    <div className="flex items-start space-x-2">
                        <div className="flex-none">
                            <div className="rounded-full bg-gray-300 w-8 h-8"></div>
                        </div>
                        <div className="flex-grow">
                            <div className="text-xs text-gray-400 mb-1">Levi Ackerman:</div>
                            <div className="text-white text-sm rounded-lg py-2 w-full">
                                And it's always like that in the evening time. We drink and we sing when our fighting is done.
                            </div>
                        </div>
                    </div>

                    {/* Interactive buttons */}
                    <div className="flex items-center justify-between pl-10">
                        <div className="flex space-x-1">
                            {/* Like button icon */}
                            <button className="text-gray-400 hover:text-blue-500">
                                {/* Insert like icon here */}
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11.25" stroke="#393E44" stroke-width="1.5" />
                                    <path d="M15.8332 28.3334V19.1667M11.6665 20.8334V26.6667C11.6665 27.5872 12.4127 28.3334 13.3332 28.3334H24.5217C25.7556 28.3334 26.805 27.4331 26.9926 26.2135L27.8901 20.3802C28.1231 18.8658 26.9514 17.5 25.4191 17.5H22.4998C22.0396 17.5 21.6665 17.1269 21.6665 16.6667V13.7216C21.6665 12.5867 20.7465 11.6667 19.6116 11.6667C19.341 11.6667 19.0957 11.8261 18.9857 12.0735L16.0531 18.6718C15.9194 18.9727 15.6209 19.1667 15.2916 19.1667H13.3332C12.4127 19.1667 11.6665 19.9129 11.6665 20.8334Z" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            {/* Dislike button icon */}
                            <button className="text-gray-400 hover:text-blue-500">
                                {/* Insert dislike icon here */}
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11.25" stroke="#393E44" stroke-width="1.5" />
                                    <path d="M24.1665 11.6667V20.8334M28.3332 18.1667V14.3334C28.3332 13.3999 28.3332 12.9332 28.1516 12.5767C27.9918 12.2631 27.7368 12.0081 27.4232 11.8483C27.0667 11.6667 26.6 11.6667 25.6665 11.6667H16.7649C15.547 11.6667 14.938 11.6667 14.4462 11.8895C14.0127 12.086 13.6443 12.402 13.3842 12.8006C13.0892 13.2528 12.9966 13.8547 12.8114 15.0585L12.3755 17.8918C12.1313 19.4794 12.0091 20.2733 12.2447 20.891C12.4515 21.4331 12.8404 21.8864 13.3448 22.1732C13.9195 22.5 14.7227 22.5 16.329 22.5H16.9999C17.4666 22.5 17.6999 22.5 17.8782 22.5908C18.035 22.6707 18.1625 22.7982 18.2424 22.955C18.3332 23.1333 18.3332 23.3666 18.3332 23.8334V26.2785C18.3332 27.4134 19.2532 28.3334 20.3881 28.3334C20.6588 28.3334 20.9041 28.1739 21.014 27.9266L23.8146 21.6252C23.942 21.3386 24.0057 21.1953 24.1064 21.0902C24.1954 20.9973 24.3047 20.9263 24.4257 20.8827C24.5626 20.8334 24.7194 20.8334 25.033 20.8334H25.6665C26.6 20.8334 27.0667 20.8334 27.4232 20.6517C27.7368 20.4919 27.9918 20.2369 28.1516 19.9233C28.3332 19.5668 28.3332 19.1001 28.3332 18.1667Z" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            {/* Share button icon */}
                            <button className="text-gray-400 hover:text-blue-500">
                                {/* Insert share icon here */}
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11.25" stroke="#393E44" stroke-width="1.5" />
                                    <path d="M27.3261 20.5062C27.5296 20.3318 27.6313 20.2446 27.6686 20.1409C27.7013 20.0498 27.7013 19.9502 27.6686 19.8591C27.6313 19.7554 27.5296 19.6682 27.3261 19.4938L20.2672 13.4433C19.917 13.1431 19.7419 12.9931 19.5937 12.9894C19.4648 12.9862 19.3418 13.0428 19.2603 13.1427C19.1667 13.2576 19.1667 13.4883 19.1667 13.9495V17.5289C17.3878 17.8401 15.7597 18.7415 14.5498 20.0949C13.2307 21.5704 12.501 23.48 12.5 25.4591V25.9691C13.3745 24.9157 14.4663 24.0638 15.7006 23.4716C16.7889 22.9495 17.9653 22.6403 19.1667 22.5588V26.0505C19.1667 26.5117 19.1667 26.7424 19.2603 26.8573C19.3418 26.9572 19.4648 27.0138 19.5937 27.0106C19.7419 27.0069 19.917 26.8569 20.2672 26.5567L27.3261 20.5062Z" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            {/* Copy button icon */}
                            <button className="text-gray-400 hover:text-blue-500">
                                {/* Insert copy icon here */}
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11.25" stroke="#393E44" stroke-width="1.5" />
                                    <g clip-path="url(#clip0_201_31)">
                                        <path d="M18.7498 11.669C18.1873 11.6766 17.8496 11.7092 17.5765 11.8483C17.2629 12.0081 17.0079 12.2631 16.8482 12.5767C16.709 12.8498 16.6765 13.1875 16.6688 13.75M26.2498 11.669C26.8124 11.6766 27.1501 11.7092 27.4232 11.8483C27.7368 12.0081 27.9917 12.2631 28.1515 12.5767C28.2906 12.8498 28.3232 13.1875 28.3308 13.75M28.3308 21.25C28.3232 21.8126 28.2907 22.1503 28.1515 22.4233C27.9917 22.7369 27.7368 22.9919 27.4232 23.1517C27.1501 23.2908 26.8124 23.3234 26.2498 23.331M28.3332 16.6667V18.3333M21.6665 11.6667H23.3331M14.3332 28.3334H20.6665C21.5999 28.3334 22.0666 28.3334 22.4232 28.1517C22.7368 27.9919 22.9917 27.7369 23.1515 27.4233C23.3332 27.0668 23.3332 26.6001 23.3332 25.6667V19.3334C23.3332 18.3999 23.3332 17.9332 23.1515 17.5767C22.9917 17.2631 22.7368 17.0081 22.4232 16.8483C22.0666 16.6667 21.5999 16.6667 20.6665 16.6667H14.3332C13.3997 16.6667 12.933 16.6667 12.5765 16.8483C12.2629 17.0081 12.0079 17.2631 11.8482 17.5767C11.6665 17.9332 11.6665 18.3999 11.6665 19.3334V25.6667C11.6665 26.6001 11.6665 27.0668 11.8482 27.4233C12.0079 27.7369 12.2629 27.9919 12.5765 28.1517C12.933 28.3334 13.3997 28.3334 14.3332 28.3334Z" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_201_31">
                                            <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        {/* Regenerate answer button */}
                        <button className="text-gray-400 hover:text-blue-500">
                            {/* Insert regenerate icon here */}
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11.25" stroke="#393E44" stroke-width="1.5" />
                                <g clip-path="url(#clip0_201_34)">
                                    <path d="M19.1665 11.6667L21.6665 14.1667M21.6665 14.1667L19.1665 16.6667M21.6665 14.1667H15.6665C14.2664 14.1667 13.5663 14.1667 13.0315 14.4392C12.5611 14.6789 12.1787 15.0613 11.939 15.5317C11.6665 16.0665 11.6665 16.7666 11.6665 18.1667V22.9167C11.6665 23.3037 11.6665 23.4972 11.6879 23.6597C11.8356 24.7815 12.7184 25.6643 13.8402 25.812C14.0026 25.8334 14.1962 25.8334 14.5832 25.8334M18.3332 25.8334H24.3332C25.7333 25.8334 26.4334 25.8334 26.9681 25.5609C27.4386 25.3212 27.821 24.9387 28.0607 24.4683C28.3332 23.9336 28.3332 23.2335 28.3332 21.8334V17.0834C28.3332 16.6963 28.3332 16.5028 28.3118 16.3404C28.1641 15.2185 27.2813 14.3358 26.1595 14.1881C25.997 14.1667 25.8035 14.1667 25.4165 14.1667M18.3332 25.8334L20.8332 28.3334M18.3332 25.8334L20.8332 23.3334" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_201_34">
                                        <rect width="20" height="20" fill="white" transform="translate(10 10)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MessageList;
