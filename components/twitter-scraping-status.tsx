import { useScrapeTwitter, useScrapeTwitterStatus } from "@/hooks/api/kb";
import { ReactSetter } from "@/lib/aliases";
import { delay } from "@/utils/utils";
import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import SpinnerIcon from "@/public/images/spinner-icon.svg";
import SpinnerCheckIcon from "@/public/images/spinner-check-icon.svg";
import Image from "next/image";

export const TwitterScrapingStatus = ({
  setShowFailModal,
}: {
  setShowFailModal: ReactSetter<boolean>;
}) => {
  const { data: twitterData } = useSession();

  const scrapeTwitter = useScrapeTwitter();

  const {
    data: scrapeStatus,
    error: scrapeError,
    refetch: refetchScrapeStatus,
    isFetching: isFetchingScrapeStatus,
  } = useScrapeTwitterStatus({
    username: twitterData?.user?.username!,
  });

  useEffect(() => {
    if (twitterData?.user?.username) {
      scrapeTwitter.mutate({ username: twitterData?.user?.username });
    }

    const asyncRefetch = async () => {
      while (true) {
        const { data } = await refetchScrapeStatus();
        if (data?.status === "success") {
          break;
        }
        await delay(3000);
      }
    };

    asyncRefetch();
  }, []);

  useEffect(() => {
    console.log(`From TwitterScrapingStatus, ${twitterData?.user?.username}`);
  }, [twitterData?.user?.username]);

  useEffect(() => {
    if (scrapeStatus?.status === "failed" || scrapeError !== null) {
      console.log(
        `From TwitterScrapingStatus, ${scrapeStatus?.status}, ${scrapeError}`,
      );
      setShowFailModal(true);
    }
  }, [scrapeStatus, scrapeError]);

  if (scrapeStatus?.status === "success") {
    return (
      <>
        <Image
          src={SpinnerCheckIcon}
          alt="Profile"
          className="mr-3"
          width={40}
          height={40}
        />
        <span className="text-wrap text-sm font-light text-white">
          Your Twitter Posts are ready!
        </span>
      </>
    );
  }

  if (scrapeStatus?.status === "failed" || scrapeError !== null) {
    return "";
  }

  return (
    <>
      <Image
        src={SpinnerIcon}
        alt="Profile"
        className="mr-3 animate-spin"
        width={40}
        height={40}
      />
      <span className="text-wrap text-sm font-light text-white">
        Your Twitter Posts are processing...
      </span>
    </>
  );
};
