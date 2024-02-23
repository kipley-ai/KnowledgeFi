export const metadata = {
  title: "Calendar - Mosaic",
  description: "Page description",
};

import { useUserDetail } from "@/hooks/api/user";
import { CalendarProvider } from "./calendar-context";
import CalendarNavigation from "./calendar-navigation";
import CalendarTable from "./calendar-table";
import CalendarTitle from "./title";

export default function Calendar() {
  // Some dummy events data
  const events = [
    // Previous month
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        8,
        3,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        8,
        7,
      ),
      eventName: "⛱️ Relax for 2 at Marienbad",
      eventColor: "indigo",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        12,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        12,
        11,
      ),
      eventName: "Team Catch-up",
      eventColor: "sky",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 1,
        18,
        2,
      ),
      eventEnd: null,
      eventName: "✍️ New Project (2)",
      eventColor: "yellow",
    },
    // Current month
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
        11,
      ),
      eventName: "Meeting w/ Patrick Lin",
      eventColor: "sky",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1,
        19,
      ),
      eventEnd: null,
      eventName: "Reservation at La Ginestre",
      eventColor: "indigo",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        3,
        9,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        3,
        10,
      ),
      eventName: "✍️ New Project",
      eventColor: "yellow",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        7,
        21,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        7,
        22,
      ),
      eventName: "⚽ 2021 - Semi-final",
      eventColor: "red",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        9,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        9,
        11,
      ),
      eventName: "Meeting w/Carolyn",
      eventColor: "sky",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        9,
        13,
      ),
      eventEnd: null,
      eventName: "Pick up Marta at school",
      eventColor: "emerald",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        9,
        14,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        9,
        15,
      ),
      eventName: "Meeting w/ Patrick Lin",
      eventColor: "emerald",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        9,
        19,
      ),
      eventEnd: null,
      eventName: "Reservation at La Ginestre",
      eventColor: "indigo",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        11,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        11,
        11,
      ),
      eventName: "⛱️ Relax for 2 at Marienbad",
      eventColor: "indigo",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        11,
        19,
      ),
      eventEnd: null,
      eventName: "⚽ 2021 - Semi-final",
      eventColor: "red",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        14,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        14,
        11,
      ),
      eventName: "Team Catch-up",
      eventColor: "sky",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        21,
        2,
      ),
      eventEnd: null,
      eventName: "Pick up Marta at school",
      eventColor: "emerald",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        21,
        3,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        21,
        7,
      ),
      eventName: "✍️ New Project (2)",
      eventColor: "yellow",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        22,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        22,
        11,
      ),
      eventName: "Team Catch-up",
      eventColor: "sky",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        22,
        19,
      ),
      eventEnd: null,
      eventName: "⚽ 2021 - Semi-final",
      eventColor: "red",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        23,
        0,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        23,
        23,
      ),
      eventName: "You stay at Meridiana B&B",
      eventColor: "indigo",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        25,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        25,
        11,
      ),
      eventName: "Meeting w/ Kylie Joh",
      eventColor: "sky",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        29,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        29,
        11,
      ),
      eventName: "Call Request ->",
      eventColor: "sky",
    },
    // Next month
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        2,
        3,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        2,
        7,
      ),
      eventName: "✍️ New Project (2)",
      eventColor: "yellow",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        14,
        10,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        14,
        11,
      ),
      eventName: "Team Catch-up",
      eventColor: "sky",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        25,
        2,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        25,
        3,
      ),
      eventName: "Pick up Marta at school",
      eventColor: "emerald",
    },
    {
      eventStart: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        27,
        21,
      ),
      eventEnd: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        27,
        22,
      ),
      eventName: "⚽ 2021 - Semi-final",
      eventColor: "red",
    },
  ];

  return (
    <CalendarProvider>
      <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-4 sm:flex sm:items-center sm:justify-between">
          {/* Left: Title */}
          <CalendarTitle />

          {/* Right: Actions */}
          <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
            <CalendarNavigation />

            <hr className="mx-1 h-full w-px border-none bg-slate-200 dark:bg-slate-700" />

            {/* Create event button */}
            <button className="btn bg-indigo-500 text-white hover:bg-indigo-600">
              <svg
                className="h-4 w-4 shrink-0 fill-current opacity-50"
                viewBox="0 0 16 16"
              >
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-2 hidden xs:block">Create Event</span>
            </button>
          </div>
        </div>

        {/* Filters and view buttons */}
        <div className="mb-4 sm:flex sm:items-center sm:justify-between">
          {/* Filters  */}
          <div className="mb-4 mr-2 sm:mb-0">
            <ul className="-m-1 flex flex-wrap items-center">
              <li className="m-1">
                <button className="btn-sm border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
                  <div className="h-3.5 w-1 shrink-0 bg-sky-500"></div>
                  <span className="ml-1.5">Acme Inc.</span>
                </button>
              </li>
              <li className="m-1">
                <button className="btn-sm border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
                  <div className="h-3.5 w-1 shrink-0 bg-emerald-500"></div>
                  <span className="ml-1.5">Life & Family</span>
                </button>
              </li>
              <li className="m-1">
                <button className="btn-sm border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
                  <div className="h-3.5 w-1 shrink-0 bg-indigo-500"></div>
                  <span className="ml-1.5">Reservations</span>
                </button>
              </li>
              <li className="m-1">
                <button className="btn-sm border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
                  <div className="h-3.5 w-1 shrink-0 bg-rose-400"></div>
                  <span className="ml-1.5">Events</span>
                </button>
              </li>
              <li className="m-1">
                <button className="btn-sm border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
                  <div className="h-3.5 w-1 shrink-0 bg-amber-500"></div>
                  <span className="ml-1.5">Misc</span>
                </button>
              </li>
              <li className="m-1">
                <button className="btn-sm border-slate-200 bg-white text-indigo-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600">
                  +Add New
                </button>
              </li>
            </ul>
          </div>

          {/* View buttons (requires custom integration) */}
          <div className="flex flex-nowrap -space-x-px">
            <button className="btn rounded-none border-slate-200 bg-slate-50 text-indigo-500 first:rounded-l last:rounded-r hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
              Month
            </button>
            <button className="btn rounded-none border-slate-200 bg-white text-slate-600 first:rounded-l last:rounded-r hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
              Week
            </button>
            <button className="btn rounded-none border-slate-200 bg-white text-slate-600 first:rounded-l last:rounded-r hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">
              Day
            </button>
          </div>
        </div>

        <CalendarTable events={events} />
      </div>
    </CalendarProvider>
  );
}
