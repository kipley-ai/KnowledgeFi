const MessageInput = () => {
    return (
        <div className="relative flex items-center rounded-full bg-dark-blue px-4 py-2 w-full">
            <div className="absolute left-4 inset-y-0 my-auto flex items-center pl-2">
                {/* Profile picture placeholder */}
                <div className="rounded-full bg-gray-300 w-8 h-8"></div>
            </div>
            <input
                type="text"
                placeholder="Ask me anything"
                className="pl-16 pr-12 bg-transparent outline-none text-white rounded-full placeholder-gray-300 flex-grow"
            />
            <div className="absolute right-10 inset-y-0 my-auto">
                {/* Attachment icon */}
                <button className="text-light-blue mr-4 pt-4">
                    {/* Replace with attachment icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#F1F5F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                {/* Microphone icon */}
                <button className="text-light-blue">
                    {/* Replace with microphone icon */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12M12 17C9.79086 17 8 15.2091 8 13V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17Z" stroke="#F1F5F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="absolute right-4 inset-y-0 my-auto">
                {/* Additional icons or buttons */}
                {/* Example: Send button */}
                <button className="text-light-blue">
                    {/* Replace with send icon */}
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
