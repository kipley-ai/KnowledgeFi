export default function FreeKFIToken() {
    return (
        <div className="max-w-xl mx-auto text-center">
            <h1 className="text-5xl text-white font-bold mt-8 mb-8">Free Mint $KFI Token</h1>
            <p className="text-lg text-white mb-8">Get free $KFI Token. You can use it to top up credits and interact with any chatbots on KnowledgeFi.</p>
            <div className="flex flex-col space-y-4 items-center">
                <button className="bg-gray-700 hover:brightness-75 text-cyan-500 font-bold py-2 px-8 rounded w-auto max-w-xs">
                    Mint Now
                </button>
                <button className="bg-transparent text-[#353945] hover:text-blue-700 py-2 px-8 rounded w-auto max-w-xs">
                    Skip for Now
                </button>
            </div>
        </div>

    );
}
