import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useChatbotDetail, useUpdateChatbotAPI } from "@/hooks/api/chatbot";
import defaulUserAvatar from "public/images/chatbot-avatar.png";
import { useParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import ImageInput from "@/components/image-input-2";
import LoadingIcon from "public/images/loading-icon.svg";
import CreateChatbotModal from "@/components/toast-4";
import Switcher from "@/components/switcher";
import Tooltip from "@/components/tooltip";

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
    chatbot_id: "",
    name: "",
    description: "",
    profile_image: "",
    chatbot_price_per_query: 0,
  });
  const [selectedFile, setSelectedFile] = useState<any>(LoadingIcon);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState(0);
  const [toneData, setToneData] = useState("");
  const [personality, setPersonality] = useState(0);
  const [personalityData, setPersonalityData] = useState("");
  const [errorMessage, setErrorMessage] = useState<any>({});


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
          chatbot_id: id as string,
          profile_image: selectedFile,
          name: form.name as string,
          description: form.description as string,
          tone: toneData,
          personality: personalityData,
          price_per_query: form.chatbot_price_per_query as number,
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
    if (mode == 0) {
      setToneData("instruction");
    } else if (mode == 1) {
      setToneData("instruction_2");
    }
  }, [mode]);

  useEffect(() => {
    if (personality == 0) {
      setPersonalityData("instruction");
    } else if (personality == 1) {
      setPersonalityData("instruction_2");
    }
  }, [personality]);

  useEffect(() => {
    if (chatbotDetail.isSuccess) {
      setForm(chatbotDetail.data?.data.data);
      setSelectedFile(chatbotDetail.data?.data.data.profile_image);
      setMode(chatbotDetail.data?.data.data.tone === "instruction" ? 0 : 1);
      // TODO: set personality
    }
  }, [chatbotDetail.isSuccess]);

  console.log('form :>> ', form);

  return (
    <>
      <CreateChatbotModal
        children={"Your chatbot has been updated successfully!"}
        open={showModal}
        setOpen={setShowModal}
      />
      <div className="flex flex-col bg-[#292D32] py-8 sm:px-6 lg:px-0">
        <form className="flex flex-col gap-4 space-y-4">
          <div className="flex flex-row justify-between gap-8">
            <div className="w-60">
              <ImageInput
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>

            <div className="flex w-full flex-col gap-6">
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
              </div>

              <div className="">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-white"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    value={form.description}
                    className="mt-2 w-full rounded-xl border-2 border-[#50575F] bg-transparent text-white"
                    placeholder="Describe your Chatbot"
                    onChange={(e) =>
                      handleFormChange("description", e.target.value)
                    }
                    rows={3}
                    maxLength={1000}
                  />
                </div>
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
              </div>

              <div>
                <label
                  htmlFor="personality"
                  className="block text-xs font-semibold text-white lg:text-sm"
                >
                  Personality
                </label>
                <div className="mt-3">
                  <Switcher
                    texts={["More Focused", "More Creative"]}
                    mode={personality}
                    setWhich={setPersonality}
                  />
                </div>
              </div>
              
              <div>
                <label className=" flex flex-row items-center space-x-3 text-wrap text-xs font-semibold text-[#DDD] lg:text-sm">
                  <span>Price Per Query (in $KFI)</span>
                  <Tooltip bg="dark" position="right" size="md">
                    Set your price per query on your chatbot app and get paid in
                    $KFI.
                  </Tooltip>
                </label>
                <div className="mt-3">
                  <input
                    className="placeholder-text-[#7C878E] w-full rounded-xl bg-transparent text-xs text-[#DDD] lg:text-sm"
                    type="number"
                    name="pricePerQuery"
                    placeholder="e.g. 1"
                    onChange={(e) => {
                      if (parseFloat(e.target.value) < 0)
                        handleFormChange("pricePerQuery", 0);
                      else handleFormChange("pricePerQuery", e.target.value);
                    }}
                    value={form.chatbot_price_per_query}
                  />
                  {errorMessage && errorMessage.pricePerQuery ? (
                    <div className=" text-xs text-red-400">
                      {errorMessage.pricePerQuery}
                    </div>
                  ) : (
                    <div className="text-xs opacity-0 lg:text-sm">a</div>
                  )}
                </div>
              </div>
            </div>
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
