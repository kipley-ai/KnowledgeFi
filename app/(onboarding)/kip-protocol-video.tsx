"use client";

import GetInvolvedButton from "@/components/GetInvolvedButton/get-involved-button";
import { useState } from "react";

function KipProtocolVideo() {
  const [showButton, setShowButton] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <video
        src="/videos/kip-protocol-concept.mp4"
        autoPlay
        muted
        onEnded={() => setShowButton(true)}
      />
      {showButton && (
        <div className="absolute bottom-20 flex w-full flex-row justify-center">
          <GetInvolvedButton
            buttonStyle="rounded-md w-full py-3 px-6 text-sm font-medium bg-[#01F7FF] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
            chainStyle="hidden"
            content={
              <span className="text-base font-bold text-black">
                Create Your First AI Knowledge Asset
              </span>
            }
          />
        </div>
      )}
    </div>
  );
}

export default KipProtocolVideo;
