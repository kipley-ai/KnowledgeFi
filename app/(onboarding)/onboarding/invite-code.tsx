import { useState, useEffect, useRef } from "react";
import { useCreateChatbotContext } from "../create-knowledge-context";

const InviteCode = () => {
  const [isBlankPresent, setIsBlankPresent] = useState(true);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { setStep } = useCreateChatbotContext();

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
    // Check if the key pressed is Backspace, Delete, or ArrowLeft
    if (e.key === "Backspace" || e.key === "Delete" || e.key === "ArrowLeft") {
      e.preventDefault(); // Prevent default behavior

      // Update OTP array
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the current input
      setOtp(newOtp);

      // If not the first input, move focus to the previous input
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
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

  // TODO: Integrate with BE
  const handleContinue = () => {
    console.log("otp :>> ", otp);
    setStep("data_source");
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

  return (
    <div className="flex h-full flex-col items-center gap-12">
      <p className="text-xl font-semibold text-white">
        Enter invite code to join
      </p>
      <div className="flex gap-4">
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
      <button
        onClick={handleContinue}
        className="rounded-full bg-[#01F7FF] px-16 py-3 text-sm font-bold text-black disabled:opacity-50"
        disabled={isBlankPresent}
      >
        Continue
      </button>
    </div>
  );
};

export default InviteCode;
