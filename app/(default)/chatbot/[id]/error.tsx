"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NotFoundImage from "@/public/images/404-illustration.svg";
import NotFoundImageDark from "@/public/images/404-illustration-dark.svg";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative h-full">
      <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="m-auto mt-16 max-w-2xl">
          <div className="px-4 text-center">
            <div className="mb-8 inline-flex">
              <Image
                className="dark:hidden"
                src={NotFoundImage}
                width={176}
                height={176}
                alt="404 illustration"
              />
              <Image
                className="hidden dark:block"
                src={NotFoundImageDark}
                width={176}
                height={176}
                alt="404 illustration dark"
              />
            </div>
            <div className="mb-6 text-white">
              Sorry, this chatbot is currently not available.
            </div>
            <Link
              href="/dashboard"
              className="btn bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Back To Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
