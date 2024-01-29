import React, { useState } from 'react';
import Image from 'next/image';
import userAvatar from "public/images/user-64-05.jpg";


const ChatbotSettings = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        prompt: '',
    });

    //This is backend to handle chatbot information change
    const handleChange = (e: any) => {
        //Write the logic here
    };

    // This is backend to handle Avatar Change
    const handleAvatarChange = (e: any) => {
        // Handle avatar file change
    };

    return (
        <div className="flex flex-col sm:px-6 lg:px-0 py-8 bg-[#292D32]">
            <div className="mx-64">
                <h5 className="text-md text-white">
                    Avatar
                </h5>
            </div>
            <form className="flex flex-col gap-5">
                {/* Profile Picture */}
                <div className="flex flex-row items-start justify-center py-8 mx-64">
                    {/* Left side - Image container */}
                    <div className="w-32 h-32 bg-[#292D32] rounded-lg overflow-hidden mr-8">
                        <Image src={userAvatar} alt="User Avatar" width={800} height={800} className="user-avatar" />
                    </div>
                    {/* Right side - Text and Upload button */}
                    <div className="flex flex-col justify-center self-center">
                        <p className="text-xs text-gray-400">
                            800x800 PNG, JPG is recommended. Maximum file size: 2Mb
                        </p>
                        <div className="flex items-center justify-center bg-transparent border-2 border-white text-white text-sm font-bold py-2 px-4 rounded-xl cursor-pointer hover:bg-blue-600 mt-2">
                            <span>Upload new image</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                <path d="M3.33317 13.5352C2.32818 12.8625 1.6665 11.7168 1.6665 10.4167C1.6665 8.46369 3.15943 6.85941 5.06629 6.68281C5.45635 4.31011 7.51671 2.5 9.99984 2.5C12.483 2.5 14.5433 4.31011 14.9334 6.68281C16.8402 6.85941 18.3332 8.46369 18.3332 10.4167C18.3332 11.7168 17.6715 12.8625 16.6665 13.5352M6.6665 13.3333L9.99984 10M9.99984 10L13.3332 13.3333M9.99984 10V17.5" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <input
                                id="profileImage"
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg"
                            />
                        </div>
                    </div>
                </div>

                {/* Character Name */}
                <div className="mx-64">
                    <label
                        htmlFor="characterName"
                        className="block text-sm font-semibold text-white "
                    >
                        Name
                    </label>
                    <div className="mt-1">
                        <input
                            id="characterName"
                            type="text"
                            value="Chatbot 101"
                            className="rounded-xl bg-transparent mt-2 text-white w-full border-2"
                            placeholder="e.g. Sam Altman"
                        />
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                        The name of your AI character.
                    </p>
                </div>

                {/* Description */}
                <div className="mx-64">
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-white"
                    >
                        Description
                    </label>
                    <div className="mt-1">
                        <input
                            id="description"
                            type="text"
                            value="OpenAI has created a model that surpasses ChatGPT in several areas, like math and physics equations, creative writing, and other difficult tasks."
                            className="rounded-xl bg-transparent mt-2 text-white w-full border-2"
                            placeholder="e.g. CEO of OpenAI"
                        />
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                        Description of your AI character.
                    </p>
                </div>

                {/* Category */}
                <div className="mx-64">
                    <label
                        className="flex flex-col text-sm font-semibold text-white w-1/3"
                        htmlFor="category"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        value="Production"
                        className="rounded-xl bg-[#292D32] mt-2 text-white w-full border-2"
                    >
                        <option value="">Production</option>
                        <option value="">Select a category</option>
                        <option value="">Select a category</option>
                        {/* ... other options */}
                    </select>
                    <p className="mt-2 text-xs text-gray-400">Category of your AI.</p>
                </div>

                {/* Prompt */}
                <div className="mx-64">
                    <label
                        className="flex flex-col font-semibold text-white mt-4"
                        htmlFor="example"
                    >
                        Example Conversation
                    </label>
                    <textarea
                        id="example"
                        value="Tired of doing swaps, bridges, or lending in the hopes of getting an airdrop bigger than the gas and transaction fees you are spending? Check out these three novel platforms that are currently tokenless."
                        placeholder="Hey! AI in healthcare is thrilling—improving imaging, drug discovery, and personalized medicine!"
                        className="rounded-xl bg-transparent text-white mt-2 w-full border-2"
                    />
                    <div className="flex flex-row justify-between">
                        <p className="mt-2 text-xs text-gray-400">
                            Describe your AI character.
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                            Enter at least 200 more characters.
                        </p>
                    </div>
                </div>

                {/* Cancel and Save Changes Button */}
                <div className="form-actions mx-64 flex flex-row justify-between">
                    <button
                        className="flex items-center justify-center bg-[#292D32] rounded-3xl ring-2 ring-gray-600 p-2 px-5 mt-8"
                        type="button"
                    >
                        <h5 className="text-sm text-white font-semibold">Cancel</h5>
                    </button>
                    <button
                        className="flex items-center justify-center bg-[#01F7FF] rounded-3xl py-1 px-5 mt-8"
                        type="submit"
                    >
                        <h5 className="text-sm text-black font-semibold flex-grow">
                            Save changes
                        </h5>
                        <svg
                            width="20"
                            height="10"
                            viewBox="0 0 20 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2"
                        >
                            <path
                                d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z"
                                fill="#151515"
                            />
                            <path
                                d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z"
                                fill="#151515"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatbotSettings;
