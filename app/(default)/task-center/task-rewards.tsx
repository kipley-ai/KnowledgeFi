import Toast from "@/components/toast";
import { useAppProvider } from "@/providers/app-provider";
import { useTaskList } from "@/hooks/api/task";
import { TaskData } from "@/lib/types";
import Image from "next/image";
import SpinnerIcon from "@/public/images/spinner-icon.svg";
import { getNextDayAtMidnight, getRemainingTimeString } from "@/lib/date";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTakeTask, useCompleteTask } from "@/hooks/api/task";

const TaskType = ({ taskFrequency }: { taskFrequency: string }) => {
  if (taskFrequency == "daily") {
    return (
      <div className="mr-1 w-min rounded-sm bg-[#FE8D08] bg-opacity-20 px-3 py-1 text-xs font-bold text-[#FE8D08] flex items-center">
        Daily
      </div>
    );
  } else {
    return (
      <div className="mr-1 w-min rounded-sm bg-[#97fe08] bg-opacity-20 px-3 py-1 text-xs font-bold text-[#97fe08] flex items-center">
        Once
      </div>
    );
  }
};

const TaskDeadline = ({
  taskFrequency,
  taskEndTime,
}: {
  taskFrequency: string;
  taskEndTime: string | null;
}) => {
  if (taskEndTime === null) {
    return "";
  }

  return (
    <div className="flex flex-row items-center rounded-sm bg-[#303030] px-3 py-1 text-xs text-white">
      <svg
        width="13"
        height="13"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.33333 1H1.66667V1.66667H1V6.33333H1.66667V7H6.33333V6.33333H7V1.66667H6.33333V1ZM6.33333 1.66667V6.33333H1.66667V1.66667H6.33333ZM3.66667 2.33333H4.33333V4.33333H5.66667V5L4.33333 5H3.66667V2.33333Z"
          fill="#01F7FF"
        />
      </svg>
      <span className="ml-2">
        {getRemainingTimeString(taskEndTime, taskFrequency)}
      </span>
    </div>
  );
};

const TaskCard = ({
  data,
  setToastErrorOpen,
  setToastSuccessOpen,
  setToastMessage,
  refetch,
}: {
  data: TaskData;
  setToastErrorOpen: (value: boolean) => void;
  setToastSuccessOpen: (value: boolean) => void;
  setToastMessage: (message: string) => void;
  refetch: () => void;
}) => {
  const { toast, setToast } = useAppProvider();

  let isCompleted: boolean = !!data.is_completed;
  const isTaken: boolean = !!data.is_taken;

  let taskStatus: string = isCompleted
    ? "Completed"
    : isTaken
      ? "Verify"
      : "Go";

  if (
    data.task_end_time !== null &&
    getRemainingTimeString(data.task_end_time, data.task_frequency) ===
      "Task has ended"
  ) {
    isCompleted = true;
    taskStatus = "Ended";
  }

  const statusClasses = isCompleted
    ? "disabled bg-transparent text-gray-20 border border-[#00FFFF] border-opacity-30 cursor-not-allowed"
    : "border border-[#00FFFF] bg-transparent text-[#00EBFF] hover:bg-[#00FFFF] hover:text-black";

  const { mutate: takeTask } = useTakeTask();
  const { mutate: completeTask } = useCompleteTask();

  const handleButton = () => {
    if (taskStatus?.toLowerCase() === "go") {
      takeTask({ task_id: data.task_id });
      window.open(data.task_link, "_blank");
      refetch();
    } else if (taskStatus?.toLowerCase() === "verify") {
      completeTask(
        { taken_id: data.taken_id },
        {
          onSuccess: (data) => {
            console.log("data :>> ", data.data);
            if (data.data.status === "error") {
              setToastErrorOpen(true);
              setTimeout(() => {
                setToastErrorOpen(false);
              }, 3000);
              refetch();
            } else {
              setToastSuccessOpen(true);
              setTimeout(() => {
                setToastSuccessOpen(false);
              }, 3000);
              refetch();
            }
          },
          onError: (error) => {
            console.log("error :>> ", error);
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-2 rounded-lg border-2 border-[#00FFFF] p-4 shadow-md">
      <div className="flex items-center justify-between gap-2">
      <div>
        <div className="text-xl font-bold text-[#00EBFF]">
          {data.task_reward_amount}
        </div>
        <div className="text-xs text-[#00EBFF]">POINTS</div>
      </div>
        <svg
          width="42"
          height="38"
          viewBox="0 0 42 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="42" height="38" rx="2" fill="#4EE178" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0623 9.83203C16.8774 9.83201 16.6973 9.83199 16.5445 9.84539C16.3769 9.86008 16.1788 9.89464 15.9767 10.0038C15.6393 10.186 15.3681 10.4999 15.2108 10.8906C15.1165 11.1247 15.0867 11.3541 15.074 11.548C15.0624 11.725 15.0624 11.9335 15.0625 12.1476L15.0625 17.6237C15.0625 21.1099 17.3034 23.99 20.2083 24.4381V26.332H17.0416C16.6044 26.332 16.25 26.7424 16.25 27.2487C16.25 27.755 16.6044 28.1654 17.0416 28.1654H24.9583C25.3955 28.1654 25.75 27.755 25.75 27.2487C25.75 26.7424 25.3955 26.332 24.9583 26.332H21.7916V24.4381C24.6965 23.99 26.9375 21.1099 26.9375 17.6237L26.9375 12.1476C26.9375 11.9336 26.9375 11.725 26.9259 11.548C26.9132 11.3541 26.8834 11.1247 26.7891 10.8906C26.6318 10.4999 26.3606 10.186 26.0233 10.0038C25.8211 9.89464 25.623 9.86008 25.4555 9.84539C25.3026 9.83199 25.1225 9.83201 24.9377 9.83203H17.0623Z"
            fill="#FCFDFE"
          />
          <path
            d="M13.0833 11.6654C13.5205 11.6654 13.875 12.0758 13.875 12.582V17.1654C13.875 17.6716 13.5205 18.082 13.0833 18.082C12.6461 18.082 12.2916 17.6716 12.2916 17.1654V12.582C12.2916 12.0758 12.6461 11.6654 13.0833 11.6654Z"
            fill="#FCFDFE"
          />
          <path
            d="M28.9166 11.6654C29.3539 11.6654 29.7083 12.0758 29.7083 12.582V17.1654C29.7083 17.6716 29.3539 18.082 28.9166 18.082C28.4794 18.082 28.125 17.6716 28.125 17.1654V12.582C28.125 12.0758 28.4794 11.6654 28.9166 11.6654Z"
            fill="#FCFDFE"
          />
        </svg>
      </div>

      <div className="grow">
        <p className="text-sm font-bold text-white">{data.task_name}</p>
        <div className="mt-1 flex flex-col md:flex-row gap-2">
          {/* Task Type Tag */}
          <TaskType taskFrequency={data.task_frequency} />
          {/* Deadline Tag */}
          <TaskDeadline
            taskFrequency={data.task_frequency}
            taskEndTime={data.task_end_time}
          />
        </div>
      </div>

      <div className="self-center">
        <button
          onClick={handleButton}
          className={`${statusClasses} rounded px-6 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
          {taskStatus}
        </button>
      </div>
    </div>
  );
};

const TasksSection = () => {
  const [toastSuccessOpen, setToastSuccessOpen] = useState<boolean>(false);
  const [toastErrorOpen, setToastErrorOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { toast, setToast } = useAppProvider();

  const {
    data: listData,
    isSuccess,
    refetch,
  } = useTaskList({
    page: 1,
    page_size: 10,
    sort_by: "created",
  });

  if (isSuccess) {
    console.log("listData.data :>> ", listData);
    return (
      <div className="bg-[#151515] p-6">
        <div className="mb-1 flex flex-col items-center justify-center">
          <Toast
            type="success"
            open={toastSuccessOpen}
            setOpen={setToastSuccessOpen}
          >
            Task completed successfully!
          </Toast>
          <Toast type="error" open={toastErrorOpen} setOpen={setToastErrorOpen}>
            Verification failed. Please finish the task and try again.
          </Toast>
        </div>
        <h2 className="mb-6 text-2xl font-bold text-white">TASK REWARDS</h2>
        <div className="grid grid-cols-2 gap-4">
          {listData.task_data.map((taskData, i) => {
            return (
              <TaskCard
                key={i}
                data={taskData}
                setToastMessage={setToastMessage}
                refetch={refetch}
                setToastSuccessOpen={setToastSuccessOpen}
                setToastErrorOpen={setToastErrorOpen}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#151515] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">TASK REWARDS</h2>
      <div className="flex h-full max-h-full w-full max-w-full flex-col items-center justify-center">
        <Image
          src={SpinnerIcon}
          alt="Loading"
          className="animate-spin"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default TasksSection;
