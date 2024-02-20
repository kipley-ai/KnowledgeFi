import Image from "next/image";
import GetInvolvedButton from "@/components/GetInvolvedButton/get-involved-button";

const Welcome = () => {
  return (
    <div className="flex h-full flex-col items-center gap-8">
      <Image
        src="/images/onboarding-welcome.png"
        width={200}
        height={200}
        alt="Welcome!"
      />
      <h1 className="text-4xl font-semibold leading-4 text-white">
        Welcome to KnowledgeFi!
      </h1>
      <p className="text-center text-[#7C878E] ">
        It's great to have you here with us!
        <br />
        We'll be guiding you through the Knowledge Assets and Chatbot creation
        progress.
      </p>
      <GetInvolvedButton
        buttonStyle="rounded-full py-3 px-16 text-sm font-medium bg-[#01F7FF]"
        chainStyle="hidden"
        content={
          <span className="text-sm font-bold text-black duration-200">
            Login
          </span>
        }
      />
    </div>
  );
};

export default Welcome;
