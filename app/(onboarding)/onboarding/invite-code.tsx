import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useCreateChatbotContext } from "../create-knowledge-context";
import { useIsWhitelisted } from "@/hooks/api/user";

type InviteCodeProps = {
  address: string | undefined;
};

const InviteCode = ({ address }: InviteCodeProps) => {
  const [isBlankPresent, setIsBlankPresent] = useState(true);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorMessage, setErrorMessage] = useState("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { setStep } = useCreateChatbotContext();

  const { data: isWl, isLoading } = useIsWhitelisted();

  const handleChange = (element: any, index: number) => {
    if (!/^[A-Za-z0-9]$/.test(element.value)) {
      return false;
    }

    let value = element.value;

    if (isNaN(value)) {
      value = value.toUpperCase();
    }

    setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    const deleteKeys: string[] = ["Backspace", "Delete", "ArrowLeft"];
    if (deleteKeys.includes(e.key)) {
      e.preventDefault();

      const newOtp = [...otp];

      if (index === 5 && Boolean(newOtp[5])) {
        newOtp[5] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (event: any) => {
    event.preventDefault();

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    let clipboardText = clipboardData.getData("text").trim().toUpperCase();

    if (clipboardText.length > 6) {
      clipboardText = clipboardText.slice(0, 6);
    }

    const otpArray = Array(6).fill("");

    for (let i = 0; i < clipboardText.length; i++) {
      otpArray[i] = clipboardText[i];
    }

    setOtp(otpArray);

    const lastFilledInputIndex = otpArray.lastIndexOf(clipboardText.slice(-1));
    const firstBlankInputIndex = otpArray.findIndex((value) => value === "");

    if (lastFilledInputIndex !== -1) {
      if (lastFilledInputIndex < 5) {
        inputsRef.current[lastFilledInputIndex + 1]?.focus();
      } else {
        inputsRef.current[lastFilledInputIndex]?.blur();
      }
    } else if (firstBlankInputIndex !== -1) {
      inputsRef.current[firstBlankInputIndex]?.focus();
    }
  };

  const handleContinue = async () => {
    const res = await axios.post(
      "/api/onboarding/check-invite-code",
      { invite_code: otp.join("") },
      {
        headers: {
          "x-kf-user-id": address,
        },
      },
    );

    if (res.data?.status === "error") {
      setErrorMessage(res.data?.msg);
      setTimeout(function () {
        setErrorMessage("");
      }, 3000);
    } else {
      if (address) {
        sessionStorage.setItem("address", address);
      }
      setStep("data_source");
    }
  };

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  useEffect(() => {
    // Check if any string in the OTP array is blank
    const blankCheck = otp.some((otpValue) => otpValue.trim() === "");
    setIsBlankPresent(blankCheck);
  }, [otp]);

  useEffect(() => {
    // Check if all OTP inputs are filled
    if (!otp.some((value) => value.trim() === "")) {
      handleContinue();
    }
  }, [otp]);

  if (isLoading) return null;

  if (isWl?.data.status === "error") {
    setStep("data_source");
  }

  return (
    <div className="flex h-full flex-col items-center gap-6">
      <p className="text-xl font-semibold text-white">
        Enter invite code to join
      </p>
      <div className="flex h-1 gap-2">
        <p className="text-sm font-semibold text-red-500">{errorMessage}</p>
      </div>
      <div className="mb-8 flex gap-4">
        {otp.map((data, index) => {
          return (
            <input
              className="h-24 w-24 border-0 border-b-[3px] border-[#01F7FF] bg-inherit text-center text-5xl font-semibold text-white outline-none focus:ring-0"
              maxLength={1}
              key={index}
              value={otp[index]}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(ref) => (inputsRef.current[index] = ref)}
              onPaste={handlePaste}
            />
          );
        })}
      </div>
      {/* <button
        onClick={handleContinue}
        className="rounded-full bg-[#01F7FF] px-16 py-3 text-sm font-bold text-black disabled:opacity-50"
        disabled={isBlankPresent}
      >
        Continue
      </button> */}
    </div>
  );
};

export default InviteCode;
