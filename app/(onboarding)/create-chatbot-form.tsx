import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCreateChatbotAPI } from "@/hooks/api/chatbot";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useGetCategory } from "@/hooks/api/chatbot";
import { useSession } from "next-auth/react";
import CreateChatbotModal from "@/components/toast-4";
import { useNftDetail } from "@/hooks/api/nft";
import LoadingIcon from "public/images/loading-icon.svg";
import ImageInput from "@/components/image-input-2";
import { number, string } from "zod";
import Switcher from "@/components/switcher";
import { useAppProvider } from "@/providers/app-provider";
import { DEFAULT_COVER_IMAGE } from "@/utils/constants";

interface Category {
  title: string;
  created: string;
  category_id: string;
  use_for: string;
  sort: number;
}

const ChatBotForm = () => {
  useEffect(() => {
    setHeaderTitle("");
  }, []);

  const title = "Create Chatbot";
  const { setHeaderTitle } = useAppProvider();
  const [characterName, setCharacterName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [profileImage, setProfileImage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [example, setExample] = useState("");
  const router = useRouter();
  const createChatbot = useCreateChatbotAPI();
  const { createChatbot: chatbot, sftId } = useCreateChatbotContext();
  // const { id } = useParams();
  const { data: nftData } = useNftDetail({ sft_id: sftId as string });
  const [selectedFile, setSelectedFile] = useState<any>(DEFAULT_COVER_IMAGE);
  const [mode, setMode] = useState(0);
  const [toneData, setToneData] = useState("");
  const [pricePerQuery, setPricePerQuery] = useState(0);
  const { setStep, setSftId } = useCreateChatbotContext();

  const { data: twitterSession } = useSession();

  const categoryList = useGetCategory();

  if (twitterSession?.user) {
    twitterSession?.user?.username;
  }

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
    formData.append("profileImage", profileImage);
    formData.append("characterName", characterName);
    // formData.append("description", description);
    // formData.append("category", category);
    console.log(twitterSession?.user);
    console.log(selectedFile);

    createChatbot.mutate(
      {
        profile_image: selectedFile,
        name: characterName,
        sft_id: sftId as string,
        kb_id: nftData?.data.data.kb_id as string,
        tone: toneData,
        price_per_query: pricePerQuery,
        // category_id: category,
        // description: description,
        // instruction: instructions,
        // example_conversation: example,
      },
      {
        async onSuccess() {
          setStep("onboarding_success");
        },
      },
    );
  };

  const handleCancel = () => {
    // Redirect the user to the dashboard page
    if (typeof window !== "undefined") {
      router.push("/dashboard");
    }
  };

  const examplePlaceholder = [
    "e.g. User: Hi Sam! What excites you most about AI right now?\n",
    "\n",
    "Sam Altman: Hey! AI in healthcare is thrilling—improving imaging, drug discovery, and personalized medicine\n",
    "\n",
    "User: Cool! How about AI ethics? How can bias be tackled?\n",
    "\n",
    "Sam Altman: Ethics is vital. We're committed to fairness, accountability, and transparency. It's a challenge, but we're working on it collaboratively.\n",
    "\n",
    "User: Got it. And government's role in AI regulation?\n",
  ].join("");

  // 	const examplePlaceholder = `e.g. User: Hi Sam! What excites you most about AI right now?

  // Sam Altman: Hey! AI in healthcare is thrilling—improving imaging, drug discovery, and personalized medicine.

  // User: Cool! How about AI ethics? How can bias be tackled?

  // Sam Altman: Ethics is vital. We're committed to fairness, accountability, and transparency. It's a challenge, but we're working on it collaboratively.

  // User: Got it. And government's role in AI regulation?
  // `;

  useEffect(() => {
    const title = "Create Chatbot";
    document.title = title;

    return () => setHeaderTitle("");
  }, []);

  useEffect(() => {
    document.title = title;
    if (categoryList && categoryList.data) {
      const categoryData: Category[] = categoryList.data.data.data;
      setCategories(categoryData);
      console.log(categories); //For debugging purpose
    }
  }, [title, categoryList]);

  useEffect(() => {
    if (mode == 0) {
      setToneData("instruction");
    } else if (mode == 1) {
      setToneData("instruction_2");
    }
  }, [mode]);

  return (
    <>
      {/* <CreateChatbotModal
        children={"Your chatbot has been created successfully!"}
        open={showModal}
        setOpen={setShowModal}
      /> */}
      <div className="flex flex-col bg-[#292D32] py-8 sm:px-6 lg:px-0">
        <div className="mx-5 md:mx-32">
          <h1 className="text-2xl font-semibold text-white">Create Chatbot</h1>
          {/* <h5 className="text-md text-[#7C878E]">
					Give some general information about your character.
				</h5> */}
          <hr className="my-4 border border-gray-600" />
        </div>
        <form className="mx-5 flex flex-col md:mx-32" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex items-center justify-center">
              <ImageInput
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>

            <div className="w-full space-y-5 px-8">
              <div>
                <label
                  htmlFor="characterName"
                  className="block text-xs font-semibold text-white lg:text-sm "
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="characterName"
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="mt-2 w-full rounded-xl border-2 bg-transparent text-xs text-white lg:text-sm"
                    placeholder="Name your Chatbot"
                    maxLength={100}
                  />
                </div>
                {/* <p className="mt-2 text-xs text-gray-400">
                The name of your AI character.
              </p> */}
              </div>
              <div>
                <label
                  htmlFor="tone"
                  className="block text-xs font-semibold text-white lg:text-sm "
                >
                  Tone
                </label>
                <div className="mt-3">
                  <Switcher
                    texts={["1st Person Tone", "3rd Person Tone"]}
                    mode={mode}
                    setWhich={setMode}
                  />
                </div>
                {/* <label
                  className="flex w-1/3 flex-col text-sm font-semibold text-white"
                  htmlFor="category"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  className="mt-2 w-full rounded-xl border-2 bg-transparent text-[#7C878E]"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.title}
                    </option>
                  ))}
                </select> */}

                {/* <p className="mt-2 text-xs text-gray-400">Category of your AI.</p> */}
              </div>
              <div>
                <label className="block text-xs font-semibold text-white lg:text-sm ">
                  Price Per Query
                </label>
                <div className="mt-3">
                  <input
                    className="placeholder-text-[#7C878E] w-full rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
                    type="number"
                    name="pricePerQuery"
                    placeholder="e.g. 1"
                    onChange={(e) => {
                      if (parseFloat(e.target.value) < 0) setPricePerQuery(0);
                      else setPricePerQuery(parseFloat(e.target.value));
                    }}
                    value={pricePerQuery}
                  />
                </div>
              </div>
            </div>

            <div className="">
              <div className="col-span-2">
                {/* <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-white"
                >
                  Description
                </label>
                <div className="mt-1"> */}

                {/* <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl bg-transparent mt-2 text-white w-full border-2"
                  placeholder="Describe your Chatbot"
                /> */}

                {/* <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={"Describe your Chatbot"}
                    className="mt-2 w-full rounded-xl border-2 bg-transparent text-white"
                    rows={11}
                    maxLength={1000}
                  />
                </div> */}

                {/* <p className="mt-2 text-xs text-gray-400">
                Description of your AI character.
              </p> */}
              </div>
            </div>
            {/* <div className="mx-64 mt-10">
              <h1 className="text-2xl font-semibold text-white">
                Chatbot Configuration
              </h1> */}

            {/* <h5 className="text-md text-[#7C878E]">
              Configuration defining AI behavior.
            </h5> */}

            {/* <hr className="my-4 border border-gray-700" />
            </div>
            <div className="mx-64">
              <label
                className="mt-4 flex flex-col font-semibold text-white"
                htmlFor="instructions"
              >
                Instructions
              </label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Give Instructions and Personality to your Chatbot"
                className="mt-2 w-full rounded-xl border-2 bg-transparent text-white"
                rows={5}
                maxLength={1000}
              /> */}

            {/* <div className="flex flex-row justify-between">
              <p className="mt-2 text-xs text-gray-400">
                Describe your AI character.
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Enter at least 200 more characters.
              </p>
            </div> */}

            {/* </div>
            <div className="mx-64">
              <label
                className="mt-4 flex flex-col font-semibold text-white"
                htmlFor="example"
              >
                Conversation Starters
              </label>
              <textarea
                id="example"
                value={example}
                onChange={(e) => setExample(e.target.value)}
                placeholder={"Examples for users to start the conversation"}
                className="mt-2 w-full rounded-xl border-2 bg-transparent text-white"
                rows={5}
                maxLength={1000}
              /> */}

            {/* <div className="flex flex-row justify-between">
              <p className="mt-2 text-xs text-gray-400">
                Give an example of your conversation with your AI.
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Enter at least 200 more characters.
              </p>
            </div> */}

            {/* </div> */}
          </div>

          <div className="form-actions flex flex-row justify-between space-x-2">
            <button
              className="mt-8 flex items-center justify-center rounded-3xl bg-[#292D32] p-2 px-5 ring-2 ring-gray-600"
              type="button"
            >
              <h5 className="text-xs font-semibold text-white lg:text-sm">
                Cancel
              </h5>
            </button>
            <button
              className="mt-8 flex items-center justify-center rounded-3xl bg-[#01F7FF] px-5 py-1"
              type="submit"
            >
              <h5 className="flex-grow text-xs font-semibold text-black lg:text-sm ">
                Bring my chatbot to life
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
    </>
  );
};

export default ChatBotForm;
