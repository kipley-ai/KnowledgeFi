import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateChatbotAPI } from '@/hooks/api/chatbot';
import { useCreateChatbotContext } from '../[id]/create-chatbot-context';
import { useSession } from 'next-auth/react';

const ChatBotForm = () => {
    const title = "Create Chatbot";

    const [characterName, setCharacterName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [instructions, setInstructions] = useState('');
    const [example, setExample] = useState('');
    const router = useRouter();
    const createChatbot = useCreateChatbotAPI()
    const {createChatbot: chatbot}  = useCreateChatbotContext()
    const { data: twitterSession } = useSession();
    // ... other form states for different inputs

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
            // Create a URL for the image to show a preview
            setProfileImageUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profileImage', profileImage);
        formData.append('characterName', characterName);
        formData.append('description', description);
        formData.append('category', category);
        console.log(twitterSession?.user)
        createChatbot.mutate({
            "type": chatbot.type,
            "profile_image": profileImage,
            "username":twitterSession?.user?.name as string,
            "category_id":category,
            "name": characterName,
            "description":description,
            "instruction":instructions,
            "example_conversation":example
            
        })
    };

    const handleCancel = () => {
        // Redirect the user to the dashboard page
        if (typeof window !== "undefined") {
            router.push('/dashboard');
        }
    };

    const examplePlaceholder = `e.g. User: Hi Sam! What excites you most about AI right now?

Sam Altman: Hey! AI in healthcare is thrilling—improving imaging, drug discovery, and personalized medicine.

User: Cool! How about AI ethics? How can bias be tackled?

Sam Altman: Ethics is vital. We're committed to fairness, accountability, and transparency. It's a challenge, but we're working on it collaboratively.

User: Got it. And government's role in AI regulation?
`

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className="flex flex-col sm:px-6 lg:px-0 py-8 bg-[#292D32]">
            <div className='mx-64'>
                <h1 className="text-2xl font-semibold text-white">General Information</h1>
                <h5 className="text-md text-[#7C878E]">Give some general information about your character.</h5>
                <hr className="my-4 border border-gray-600" />
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center py-8 mx-64">
                    <label
                        htmlFor="profileImage"
                        className="flex flex-col items-center justify-center w-full h-32 bg-gray-800 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-700"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="mb-3 w-10 h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-400">800x800 PNG, JPG is recommended. Maximum file size: 2 MB</p>
                        </div>
                        <input
                            id="profileImage"
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/png, image/jpeg"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-5 mx-64">
                    <div>
                        <label htmlFor="characterName" className="block text-sm font-semibold text-white ">Name</label>
                        <div className="mt-1">
                            <input
                                id="characterName"
                                type="text"
                                value={characterName}
                                onChange={(e) => setCharacterName(e.target.value)}
                                className="rounded-xl bg-transparent mt-2 text-white w-full border-2"
                                placeholder="e.g. Sam Altman"
                            />
                        </div>
                        <p className="mt-2 text-xs text-gray-400">The name of your AI character.</p>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-white">Description</label>
                        <div className="mt-1">
                            <input
                                id="description"
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="rounded-xl bg-transparent mt-2 text-white w-full border-2"
                                placeholder="e.g. CEO of OpenAI"
                            />
                        </div>
                        <p className="mt-2 text-xs text-gray-400">Description of your AI character.</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-5 mx-64">
                    <div>
                        <label className="flex flex-col text-sm font-semibold text-white w-1/3" htmlFor="category">Category</label>
                        <select
                            id="category"
                            value={category}
                            className="rounded-xl bg-transparent mt-2 text-[#7C878E] w-full border-2"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select a category</option>
                            <option value="">Select a category</option>
                            <option value="">Select a category</option>
                            {/* ... other options */}
                        </select>
                        <p className="mt-2 text-xs text-gray-400">Category of your AI.</p>
                    </div>
                </div>
                <div className='mx-64 mt-10'>
                    <h1 className="text-2xl font-semibold text-white">Configuration</h1>
                    <h5 className="text-md text-[#7C878E]">Configuration defining AI behavior.</h5>
                    <hr className="my-4 border border-gray-700" />
                </div>
                <div className="mx-64">
                    <label className="flex flex-col font-semibold text-white mt-4" htmlFor="instructions">Instructions</label>
                    <textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Tired of doing swaps, bridges, or lending in the hopes of getting an airdrop bigger than the gas and transaction fees you are spending? Check out these three novel platforms that are currently tokenless."
                        className="rounded-xl bg-transparent text-white mt-2 w-full border-2"
                        rows={5}
                    />
                    <div className="flex flex-row justify-between">
                        <p className="mt-2 text-xs text-gray-400">Describe your AI character.</p>
                        <p className="mt-2 text-xs text-gray-400">Enter at least 200 more characters.</p>
                    </div>
                </div>
                <div className="mx-64">
                    <label className="flex flex-col font-semibold text-white mt-4" htmlFor="example">Example Conversation</label>
                    <textarea
                        id="example"
                        value={example}
                        onChange={(e) => setExample(e.target.value)}
                        placeholder={examplePlaceholder}
                        className="rounded-xl bg-transparent text-white mt-2 w-full border-2"
                        rows={11}
                    />
                    <div className="flex flex-row justify-between">
                        <p className="mt-2 text-xs text-gray-400">Give an example of your conversation with your AI.</p>
                        <p className="mt-2 text-xs text-gray-400">Enter at least 200 more characters.</p>
                    </div>
                </div>
                <div className="form-actions mx-64 flex flex-row justify-between">
                    <button className="flex items-center justify-center bg-[#292D32] rounded-3xl ring-2 ring-gray-600 p-2 px-5 mt-8" type="button">
                        <h5 className="text-sm text-white font-semibold">Cancel</h5>
                    </button>
                    <button className="flex items-center justify-center bg-[#01F7FF] rounded-3xl py-1 px-5 mt-8" type="submit">
                        <h5 className="text-sm text-black font-semibold flex-grow">Bring my character to life</h5>
                        <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                            <path d="M17.98 5.7901C18.8936 5.7901 19.6343 6.53075 19.6343 7.44439V7.44439C19.6343 8.35803 18.8936 9.09868 17.98 9.09868L1.65435 9.09868C0.74071 9.09868 5.90253e-05 8.35803 5.90618e-05 7.44439V7.44439C5.90983e-05 6.53075 0.740711 5.7901 1.65435 5.7901L17.98 5.7901Z" fill="#151515" />
                            <path d="M18.932 5.9907C19.5219 6.63674 19.5219 7.68418 18.932 8.33022C18.3422 8.97626 17.3859 8.97626 16.7961 8.33022L12.3947 3.50927C11.8049 2.86322 11.8049 1.81578 12.3947 1.16974C12.9845 0.523702 13.9408 0.523702 14.5306 1.16974L18.932 5.9907Z" fill="#151515" />
                        </svg>
                    </button>
                </div>

            </form>
        </div>
    );
};

export default ChatBotForm;
