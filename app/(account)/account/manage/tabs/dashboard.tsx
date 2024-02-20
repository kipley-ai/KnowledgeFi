import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import Image from "next/image";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import ConvoIcon from "@/components/icon/convo.svg";
import CodeIcon from "@/components/icon/code.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { PaginationController } from "@/components/pagination/controller";
import DefaultProfilePicture from "@/public/images/15 1.png";
import TwitterLogo from "@/public/images/logo-twitter.svg";
import { ImExit } from "react-icons/im";
import { TiPencil } from "react-icons/ti";
import TwitterConnection from "../connections/twitter";
import { ReactSetter } from "@/lib/aliases";
import ModalImageGallery from "@/components/modal-image-gallery";
import ImageInput from "@/components/image-input-2";
import { IoMdClose } from "react-icons/io";
import { useProfpic, useUpdateProfpic, useUserDetail } from "@/hooks/api/user";
import { FaSpinner } from "react-icons/fa6";
import axios from "axios";
import { useIsMutating } from "@tanstack/react-query";

const DateFilterComponent = () => (
  <>
    <div className="flex items-start justify-start gap-3">
      <div className="flex h-12 items-center justify-between rounded-xl border-2 border-zinc-900 px-4 py-3">
        <div className="font-mediumleading-normal pr-4 text-base text-slate-100">
          Last 30 days
        </div>
        <div className="flex items-center truncate">
          <svg
            className="ml-1 h-3 w-3 shrink-0 fill-current text-slate-100"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </div>
    </div>
  </>
);

const StatsCard = ({
  title,
  number,
  icon,
}: {
  title: string;
  number: string;
  icon: any;
}): JSX.Element => (
  <>
    <div className="flex h-56 w-80 grow gap-4">
      <div className="flex grow flex-col gap-4 rounded-2xl bg-gray-800 bg-gradient-to-r p-10">
        <Image
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-2 shadow"
          src={icon}
          width={32}
          height={32}
          alt={`${title} icon`}
        />
        {/* <div className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-xl shadow"></div> */}
        <div className="flex h-20 flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-zinc-100">
            {title}
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white pt-0.5 text-xs font-semibold text-black hover:bg-blue-700">
              i
            </div>
          </div>
          <div className="text-4xl font-semibold text-zinc-100">{number}</div>
        </div>
      </div>
    </div>
  </>
);

const ContentListComponent = ({
  activities,
  totalPages,
  pageQuery,
}: {
  activities: ActivityData[];
  totalPages: number;
  pageQuery: string;
}) => {
  return (
    <>
      <div className="flex flex-col">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead className="bg-tranparent">
            <tr>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                My Activity
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {activities.map((activity, index) => {
              return (
                <tr key={index} className="hover:bg-zinc-900">
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {activity.name}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {activity.amount}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-gray-500">
                    {activity.lastUpdated}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationController totalPages={totalPages} pageQuery={pageQuery} />
      </div>
    </>
  );
};

interface ActivityData {
  name: string;
  amount: string;
  lastUpdated: string;
}

function* generateData(n: number): Generator<ActivityData> {
  for (let i = 1; i <= n; i++) {
    yield {
      name: Math.random() > 0.5 ? "Buy Credit" : "Withdrawal",
      amount: `${100 + 100 * i}`,
      lastUpdated: `${i} minutes ago`,
    };
  }
}

const activityData = Array.from(generateData(20));

const UploadProfilePicture = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useUpdateProfpic();
  const { data: curProfpic, isFetching: isCurProfpicFetching } = useProfpic();
  const [newProfpicUrl, setNewProfpicUrl] = useState<string>("");
  const [newProfpicBlob, setNewProfpicBlob] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleNewImage = (newFileObjects: File[]) => {
    const file = newFileObjects[0];
    const filenameArray = file.name.split(".");
    const fileFormat = filenameArray[filenameArray.length - 1];

    if (fileFormat === "png" || fileFormat === "jpg" || fileFormat === "jpeg") {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProfpicUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      setNewProfpicBlob(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Insert a new file from manual upload");
    e.preventDefault();
    e.stopPropagation();

    const newFileObjects = Array.from(e.target.files || []) as File[];
    handleNewImage(newFileObjects);
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setIsUploading(true);
      const profpicForm = new FormData();
      profpicForm.append("input-file-upload", newProfpicBlob!);
      profpicForm.append("file-dir", "profpic");

      // Upload to S3
      await axios
        .post("/api/upload/s3/asset", profpicForm)
        .then((response) => {
          mutate(response.data.link);
        })
        .then(() => {
          setNewProfpicUrl("");
          setNewProfpicBlob(null);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        });
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setNewProfpicUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    console.log(newProfpicUrl);
  }, [newProfpicUrl]);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <div className="relative h-20 w-20 rounded-full bg-gray-800">
          {isCurProfpicFetching ? (
            <div className="relative h-full w-full">
              <FaSpinner className="absolute inset-0 left-0 right-0 m-auto animate-spin" />
            </div>
          ) : (
            <Image
              src={
                newProfpicUrl != ""
                  ? newProfpicUrl
                  : curProfpic ?? DefaultProfilePicture
              }
              alt="Profile picture"
              layout="fill" // required
              objectFit="cover" // change to suit your needs
              className="absolute inset-0 z-0 rounded-full" // just an example
            />
          )}
          <input
            ref={inputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleChange}
            accept="image/png, image/gif, image/jpeg"
          />
          <button
            onClick={() => {
              inputRef.current?.click();
            }}
            className="bg-items-center absolute inset-0 z-10 flex items-center justify-center rounded-full bg-zinc-700 text-xs font-semibold text-cyan-400 opacity-0 duration-300 hover:bg-opacity-75 hover:opacity-100"
          >
            <span className="flex items-center justify-center gap-1 opacity-100">
              <TiPencil /> Edit
            </span>
          </button>
        </div>
        {newProfpicUrl != "" && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={handleCancel}>
              <IoMdClose size={30} color="#cf142b" fill="#cf142b" />
            </button>
            <button onClick={handleUpload} className="text-xsm text-green-400">
              Upload
            </button>
            {isUploading && <FaSpinner className="animate-spin" />}
          </div>
        )}
      </div>
    </>
  );
};

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "5";

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-100">
          Account Information
        </h1>
      </div>
      <hr className="my-8 h-px border-zinc-700"></hr>
      <div className="flex-col text-slate-100">
        <h4 className="pb-3">Profile</h4>
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center justify-center gap-5">
            <UploadProfilePicture />
            <p>0xABC89083454D...ABCD808023EF</p>
          </div>
        </div>
      </div>
      <hr className="my-8 h-px border-zinc-700"></hr>
      <div className="flex-col text-slate-100">
        <h4 className="pb-3">Connected Accounts</h4>
        <div className="flex-col space-y-2">
          <TwitterConnection />
        </div>
      </div>
      <div className="my-8 flex flex-col gap-4 rounded-2xl bg-zinc-900 p-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="rounded-sm bg-sky-200 px-2 py-4"></div>
            <h1 className="pl-2 text-2xl text-zinc-100">User Overview</h1>
          </div>
          <button className="rounded-3xl bg-sky-200 px-4 py-2 text-sm text-black">
            Reload Deposit
          </button>
        </div>
        <div className="flex flex-grow flex-row justify-between gap-4 pb-5 ">
          <StatsCard
            title="Conversations"
            number="3.8M"
            icon={ConvoCheckMarkIcon}
          />
          <StatsCard title="Users" number="18,000" icon={PersonIcon} />
        </div>
      </div>
      <div className="py-3">
        <ContentListComponent
          activities={activityData.slice(start, end)}
          totalPages={Math.ceil(Number(activityData.length) / Number(perPage))}
          pageQuery="page"
        />
      </div>
    </>
  );
}
