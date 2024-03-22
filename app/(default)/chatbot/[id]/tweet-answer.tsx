import {
  ControlledAccordion,
  AccordionItem as Item,
  useAccordionProvider,
} from "@szhsin/react-accordion";
import Chevron from "@/components/icon/chevron-down.svg";
import Image from "next/image";
import { Tweet } from "react-tweet";
import { useState, useEffect } from "react";

const tweets = [
  {
    header: "Tweet 1",
    content:
      "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
  },
  {
    header: "Tweet 2",
    content:
      "Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.",
  },
  {
    header: "Tweet 3",
    content:
      "The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.",
  },
];

const AccordionItem = ({ header, ...rest }: any) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        <h2 className={`${isEnter ? "text-aqua-700" : "text-white"}`}>
          {header}
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter ? "rotate-180 stroke-aqua-700" : "stroke-gray-500"
          }`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </>
    )}
    className=""
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left bg-stone-800 hover:brightness-150 rounded-md ${
          isEnter && "bg-slate-200"
        }`,
    }}
    contentProps={{
      className: "transition-height duration-200 ease-out",
    }}
    panelProps={{ className: "p-4" }}
  />
);

type TweetAnswerProps = {
  chunks: string[];
};

const TweetAnswer = ({ chunks }: TweetAnswerProps) => {
  const [isAllCollapsed, setIsAllCollapsed] = useState(true);

  const providerValue = useAccordionProvider({
    allowMultiple: true,
    transition: true,
    transitionTimeout: 250,
    onStateChange: ({ key, current }) => {
      if (current.isResolved)
        console.log(`${key} is expanded: ${current.isEnter}`);
    },
  });

  const { toggle, toggleAll } = providerValue;

  const handleExpandAll = () => {
    toggleAll(isAllCollapsed);
    setIsAllCollapsed(!isAllCollapsed);
  };

  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, []);

  return (
    <div className="mr-2 flex flex-col gap-2">
      <div className="flex justify-end">
        <button
          onClick={handleExpandAll}
          className="rounded-md bg-stone-800 px-4 py-1 text-xs text-white hover:brightness-150"
        >
          {isAllCollapsed ? "expand all" : "collapse all"}
          <span className="ml-2 text-gray-500">&gt;</span>
        </button>
      </div>
      <ControlledAccordion
        providerValue={providerValue}
        className="grid grid-cols-2 gap-3"
      >
        {chunks &&
          chunks.length > 0 &&
          chunks.map((chunk, i) => {
            const id = chunk.match(/\d+/)![0];

            return (
            <AccordionItem
              key={i}
              header={`Tweet ${i + 1}`}
              itemKey={`Item-${i + 1}`}
            >
              <Tweet id={id} />
            </AccordionItem>
          )})}
      </ControlledAccordion>
    </div>
  );
};

export default TweetAnswer;
