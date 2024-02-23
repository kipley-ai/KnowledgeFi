import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useChatbotDetail, useUpdateChatbotAPI } from "@/hooks/api/chatbot";
import defaulUserAvatar from "public/images/chatbot-avatar.png";
import { useParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import ImageInput from "@/components/image-input-2";
import LoadingIcon from "public/images/loading-icon.svg";
import CreateChatbotModal from "@/components/toast-4";

interface Form {
  category_id: string;
  chatbot_id: string;
  name: string;
  description: string;
  instruction: string;
  example_conversation: string;
  profile_image: string;
}

const ChatbotSettings = () => {
  const updateChatbot = useUpdateChatbotAPI();

  const { id } = useParams();
  const chatbotDetail = useChatbotDetail({ chatbot_id: id as string });
  const [form, setForm] = useState<any>({
    category_id: "",
    chatbot_id: "",
    name: "",
    description: "",
    instruction: "",
    example_conversation: "",
    profile_image: "",
  });
  const [selectedFile, setSelectedFile] = useState<any>(LoadingIcon);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDivClick = useDebouncedCallback(
    () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    },
    300, // 300ms debounce time
    {
      leading: true,
      trailing: false,
    },
  );

  const handleFormChange = (name: string, value: any) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleUpdateChatbot = async () => {
    try {
      updateChatbot.mutate(
        {
          category_id: form.category_id as string,
          chatbot_id: id as string,
          name: form.name as string,
          description: form.description as string,
          instruction: form.instruction as string,
          example_conversation: form.example_conversation as string,
          profile_image: selectedFile,
        },
        {
          onSuccess(data, variables, context) {
            setShowModal(true);
          },
        },
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatbotDetail.isSuccess) {
      setForm(chatbotDetail.data?.data.data);
      setSelectedFile(chatbotDetail.data?.data.data.profile_image);
    }
  }, [chatbotDetail.isSuccess]);

  return (
    <>
      <CreateChatbotModal
        children={"Your chatbot has been updated successfully!"}
        open={showModal}
        setOpen={setShowModal}
      />
      <div className="flex flex-col bg-[#292D32] py-8 sm:px-6 lg:px-0">
        <form className="flex flex-col gap-5 space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-row items-start py-8">
            {/* Left side - Image container */}
            {/* <div className="w-32 h-32 mr-8"> */}
            <div className="flex flex-col">
              <ImageInput
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>
            {/* </div> */}
            {/* Right side - Text and Upload button */}
            {/* <div className="flex flex-col justify-center self-end mt-16">
                        <p className="text-xs text-gray-400 mb-6">
                            800x800 PNG, JPG is recommended. Maximum file size: 2Mb
                        </p>
                        <div className="flex items-center justify-center bg-transparent text-white text-sm font-bold py-2 rounded-3xl cursor-pointer border-2 border-[#393E44] w-fit px-6" onClick={handleDivClick}>
                            <span>Upload new image</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                                <path d="M3.33317 13.5352C2.32818 12.8625 1.6665 11.7168 1.6665 10.4167C1.6665 8.46369 3.15943 6.85941 5.06629 6.68281C5.45635 4.31011 7.51671 2.5 9.99984 2.5C12.483 2.5 14.5433 4.31011 14.9334 6.68281C16.8402 6.85941 18.3332 8.46369 18.3332 10.4167C18.3332 11.7168 17.6715 12.8625 16.6665 13.5352M6.6665 13.3333L9.99984 10M9.99984 10L13.3332 13.3333M9.99984 10V17.5" stroke="#7C878E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <input
                                ref={fileInputRef}
                                id="profile_image"
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg"
                                onChange={(e) => handleFormChange("profile_image", e.target.value)}
                            />
                        </div>
                    </div> */}
          </div>

          {/* Character Name */}
          <div className="grid grid-cols-2 gap-5">
            <div className="">
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
                  value={form.name}
                  className="mt-2 w-full rounded-xl border-2 border-[#50575F] bg-transparent text-white"
                  placeholder="Name your Chatbot"
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  maxLength={100}
                />
              </div>
              {/* <p className="mt-2 text-xs text-gray-400">
                        The name of your AI character.
                    </p> */}
            </div>
            <div className="">
              <label
                className="flex w-1/3 flex-col text-sm font-semibold text-white"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                value={form.category_id}
                className="mt-3 w-full rounded-xl border-2 border-[#50575F] bg-[#292D32] text-white"
                onChange={(e) =>
                  handleFormChange("category_id", e.target.value)
                }
              >
                <option value="">Production</option>
                <option value="">Select a category</option>
                <option value="">Select a category</option>
                {/* ... other options */}
              </select>
              {/* <p className="mt-2 text-xs text-gray-400">Category of your AI.</p> */}
            </div>
          </div>

          {/* Description */}
          <div className="">
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
                value={form.description}
                className="mt-2 w-full rounded-xl border-2 border-[#50575F] bg-transparent text-white"
                placeholder="Describe your Chatbot"
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                maxLength={1000}
              />
            </div>
            {/* <p className="mt-2 text-xs text-gray-400">
                        Description of your AI character.
                    </p> */}
          </div>

          {/* Category */}

          {/* Prompt */}
          <div className="">
            <label
              className="mt-4 flex flex-col font-semibold text-white"
              htmlFor="prompt"
            >
              Instructions
            </label>
            <textarea
              id="prompt"
              value={form.instruction}
              placeholder="Give Instructions and Personality to your Chatbot"
              className="mt-2 w-full rounded-xl border-2 border-[#50575F] bg-transparent text-white"
              onChange={(e) => handleFormChange("instruction", e.target.value)}
              rows={5}
              maxLength={1000}
            />
            {/* <div className="flex flex-row justify-between">
                        <p className="mt-2 text-xs text-gray-400">
                            Describe your AI character.
                        </p>
                        <p className="mt-2 text-xs text-gray-400">
                            Enter at least 200 more characters.
                        </p>
                    </div> */}
          </div>
          <div className="">
            <label
              className="mt-4 flex flex-col font-semibold text-white"
              htmlFor="example"
            >
              Conversation Starters
            </label>
            <textarea
              id="example"
              value={form.example_conversation}
              onChange={(e) =>
                handleFormChange("example_conversation", e.target.value)
              }
              placeholder={"Examples for users to start the conversation"}
              className="mt-2 w-full rounded-xl border-2 bg-transparent text-white"
              rows={5}
              maxLength={1000}
            />
            {/* <div className="flex flex-row justify-between">
						<p className="mt-2 text-xs text-gray-400">
							Give an example of your conversation with your AI.
						</p>
						<p className="mt-2 text-xs text-gray-400">
							Enter at least 200 more characters.
						</p>
					</div> */}
          </div>

          {/* Cancel and Save Changes Button */}
          <div className="form-action flex flex-row justify-between">
            <button
              className="mt-8 flex items-center justify-center rounded-3xl bg-[#292D32] p-2 px-5 ring-2 ring-gray-600"
              type="button"
            >
              <h5 className="text-sm font-semibold text-white">Cancel</h5>
            </button>
            <button
              className="mt-8 flex items-center justify-center rounded-3xl bg-[#01F7FF] px-5 py-1 hover:brightness-75"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleUpdateChatbot();
              }}
            >
              <h5 className="flex-grow text-sm font-semibold text-black">
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
    </>
  );
};

export default ChatbotSettings;
