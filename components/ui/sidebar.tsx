"use client";

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useAppProvider } from "@/providers/app-provider";
import {
  redirect,
  useSearchParams,
  useSelectedLayoutSegments,
} from "next/navigation";
import { Transition } from "@headlessui/react";
import { getBreakpoint } from "../utils/utils";
import SidebarLinkGroup from "./sidebar-link-group";
import SidebarLink from "./sidebar-link";
import Logo from "./logo";
import Image from "next/image";
import home_logo from "@/public/images/logo-home.png";
import ModalLoginTwitter from "../modal-login-twitter";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import ChatText from "public/images/chat-text.png";
import HomeIcon from "public/images/home-icon.svg";
import { useChatbotChatList } from "@/hooks/api/chatbot";
import { PaginationController } from "../pagination/controller";
import CreditBalance from "../../app/(default)/chatbot/[id]/credit-balance";
import { CreditBalanceProvider } from "../../app/(default)/chatbot/[id]/credit-balance-context";

const GetInvolvedButton = dynamic(
  () => import("../GetInvolvedButton/get-involved-button"),
  {
    ssr: false,
  },
);

const ChatHistoryList = () => {
  const searchParams = useSearchParams();
  const segments = useSelectedLayoutSegments();
  const chatbotListQuery = useChatbotChatList();
  const pathname = usePathname();
  // const chatbotListPage = searchParams.get("chatbotListPage") ?? "1";
  // const chatbotListPerPage = searchParams.get("chatbotListPerPage") ?? "10";
  // const chatbotListStart = (Number(chatbotListPage) - 1) * Number(chatbotListPerPage);
  // const chatbotListEnd = chatbotListStart + Number(chatbotListPerPage);

  if (chatbotListQuery.data) {
    const chatbotListData = chatbotListQuery.data?.data.data;
    // const chatbotListTotalPages = Math.ceil(
    // 	Number(chatchatbotListListData.length) / Number(chatbotListPerPage)
    // );

    if (chatbotListData !== undefined && chatbotListData.length > 0) {
      return (
        <>
          {/* {chatbotListData.slice(chatbotListStart, chatbotListEnd).map((chatbot: any, index: number) => ( */}
          {chatbotListData.map((chatbot: any, index: number) => (
            <li
              key={chatbot.chatbot_id}
              className={`mx-3 mb-3 px-2 py-2 last:mb-0 hover:rounded-md hover:bg-stone-600 hover:text-white ${
                (segments.includes("home") || segments.includes("dashboard")) &&
                "bg-transparent"
              } ${pathname === "/chatbot/" + chatbot.chatbot_id ? "" : ""}`}
            >
              <SidebarLink href={`/chatbot/${chatbot.chatbot_id}`}>
                <div className="flex items-center">
                  <span
                    className={`text-[14px] text-sm font-medium font-semibold duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 ${pathname === "/chatbot/" + chatbot.chatbot_id ? "text-aqua-700" : ""}`}
                  >
                    {pathname === "/chatbot/" + chatbot.chatbot_id ? "> " : ""}
                    {chatbot.name}
                  </span>
                </div>
              </SidebarLink>
            </li>
          ))}
          {/* <PaginationController
						totalPages={chatbotListTotalPages}
						pageQuery={"chatbotListPage"}
					/> */}
        </>
      );
    }
    return;
  }

  if (chatbotListQuery.isError) {
    return <div>Error: {chatbotListQuery.error.message}</div>;
  }

  return <div className="text-center">Loading Chat History...</div>;
};

export default function Sidebar() {
  const router = useRouter();
  const sidebar = useRef<HTMLDivElement>(null);
  const { sidebarOpen, setSidebarOpen } = useAppProvider();

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const segments = useSelectedLayoutSegments();
  const [breakpoint, setBreakpoint] = useState<string | undefined>(
    getBreakpoint(),
  );
  const expandOnly =
    !sidebarExpanded && (breakpoint === "lg" || breakpoint === "xl");

  // Wallet logic and modal
  const [isConnected_, setIsConnected_] = useState<boolean>(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    setIsConnected_(isConnected);
  }, [isConnected]);

  // Twitter logic and modal
  const { status: twitterStatus } = useSession();
  const { modalLogin: showTwitterLogin, setModalLogin: setShowTwitterLogin } =
    useAppProvider();

  const handleWalletReadyClick = (e: React.MouseEvent) => {
    if (twitterStatus == "authenticated") {
      router.push("/create-chatbot");
    } else {
      setShowTwitterLogin(true);
    }
  };

  const handleChatbotClick = (e: React.MouseEvent) => {
    if (!(twitterStatus == "authenticated" && isConnected_)) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleBreakpoint = () => {
    setBreakpoint(getBreakpoint());
  };

  useEffect(() => {
    window.addEventListener("resize", handleBreakpoint);
    return () => {
      window.removeEventListener("resize", handleBreakpoint);
    };
  }, [breakpoint]);

  return (
    <>
      <CreditBalanceProvider>
        <div
          className={`min-w-fit ${sidebarExpanded ? "sidebar-expanded" : ""}`}
          style={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          {/* Sidebar backdrop (mobile only) */}
          <Transition
            className="fixed inset-0 z-40 bg-slate-900 bg-opacity-30 lg:z-auto lg:hidden"
            show={sidebarOpen}
            enter="transition-opacity ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />

          {/* Sidebar */}
          <Transition
            show={sidebarOpen}
            unmount={false}
            as="div"
            id="sidebar"
            ref={sidebar}
            className="no-scrollbar absolute left-0 top-0 z-40 flex h-[100dvh] w-64 shrink-0 flex-col overflow-y-scroll bg-neutral-900 py-4 pt-9 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:!flex lg:w-12 lg:translate-x-0 lg:overflow-y-auto lg:sidebar-expanded:!w-64 2xl:!w-64"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            {/* Sidebar header */}
            <div className="mb-5 flex justify-between pr-3 sm:px-2">
              {/* Close button */}
              <button
                className="text-slate-500 hover:text-slate-400 lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                </svg>
              </button>
              {/* Logo */}
              <Link href="/dashboard">
                <h2 className="pl-3 font-semibold text-slate-500">
                  <span className="text-xl font-black text-neutral-300 lg:hidden lg:text-[28px] lg:sidebar-expanded:block 2xl:block">
                    KnowledgeFi
                  </span>
                </h2>
              </Link>
            </div>

            {/* Links */}
            <div className="space-y-8">
              {/* Pages group */}
              <div>
                <ul className="border-b-2 border-gray-700 pb-4">
                  {/* Inbox */}
                  <li
                    className={`mx-3 mb-4 px-3 py-1 last:mb-0 hover:rounded-md hover:bg-stone-600 hover:text-aqua-700 ${
                      (segments.length === 0 ||
                        segments.includes("dashboard")) &&
                      "rounded-md border-2 border-aqua-700"
                    }`}
                  >
                    {/* style={{ border: '2px solid #01F7FF', borderRadius: '24px', padding: '6px 10px' }}> */}
                    <SidebarLink href="/dashboard">
                      <div className="flex items-center py-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 0H8V2H6V4H4V6H2V8H0V10H2V20H9V14H11V20H18V10H20V8H18V6H16V4H14V2H12V0ZM12 2V4H14V6H16V8H18V10H16V18H13V12H7V18H4V10H2V8H4V6H6V4H8V2H12Z"
                            fill="#00FFFF"
                          />
                        </svg>
                        <span className="ml-3 text-[14px] text-xs font-semibold  text-aqua-700 duration-200 lg:text-lg lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                          EXPLORE
                        </span>
                      </div>
                    </SidebarLink>
                  </li>
                  {/* Login */}
                  <li
                    className={`mb-1 border-t-2 border-gray-700 px-3 pt-5 last:mb-0 ${
                      (segments.includes("home") ||
                        segments.includes("dashboard")) &&
                      "bg-transparent"
                    } `}
                  >
                    <div className="flex items-center px-3">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M2.33342 0.166992H19.6668H21.8334V2.33366V15.3337V17.5003L19.6668 17.5003H4.50035V19.667H2.33369V17.5003L4.50009 17.5003V15.3337H19.6668V2.33366H2.33342V21.8337H0.166752V2.33366H0.166748V0.166992H0.166752H2.33342ZM7.75009 7.75033H5.58342V9.91699H7.75009V7.75033ZM9.91675 7.75033H12.0834V9.91699H9.91675V7.75033ZM16.4168 7.75033H14.2501V9.91699H16.4168V7.75033Z"
                          fill="#00FFFF"
                        />
                      </svg>
                      <span className="ml-3 text-[14px] font-semibold tracking-tight text-white duration-200 lg:text-lg lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                        CHAT LIST
                      </span>
                    </div>
                  </li>
                  <ChatHistoryList />
                  {/* <li
									className={`px-3 py-2  mb-3 last:mb-0 ${
										(segments.includes("home") ||
											segments.includes("dashboard")) &&
										"bg-transparent"
									} `}
								>
									style={{ border: '2px solid #01F7FF', borderRadius: '24px', padding: '6px 10px' }}>
									<SidebarLink href="/#">
										<div className="flex items-center">
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
												Cloud Server Security
											</span>
										</div>
									</SidebarLink>
								</li>
								<li
									className={`px-3 py-2  mb-3 last:mb-0 ${
										(segments.includes("home") ||
											segments.includes("dashboard")) &&
										"bg-transparent"
									} `}
								>
									style={{ border: '2px solid #01F7FF', borderRadius: '24px', padding: '6px 10px' }}>
									<SidebarLink href="/#">
										<div className="flex items-center">
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
												Favorites
											</span>
										</div>
									</SidebarLink>
								</li>
								<li
									className={`px-3 py-2  mb-3 last:mb-0 ${
										(segments.includes("home") ||
											segments.includes("dashboard")) &&
										"bg-transparent"
									} `}
								>
									style={{ border: '2px solid #01F7FF', borderRadius: '24px', padding: '6px 10px' }}>
									<SidebarLink href="/#">
										<div className="flex items-center">
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
												Production
											</span>
										</div>
									</SidebarLink>
								</li>
								<li
									className={`px-3 py-2  mb-3 last:mb-0 ${
										(segments.includes("home") ||
											segments.includes("dashboard")) &&
										"bg-transparent"
									} `}
								>
									style={{ border: '2px solid #01F7FF', borderRadius: '24px', padding: '6px 10px' }}>
									<SidebarLink href="/#">
										<div className="flex items-center">
											<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
												Writing Tips
											</span>
										</div>
									</SidebarLink>
								</li> */}
                  {/* <li
									className={`px-3 py-2  mb-0.5 last:mb-0 ${segments.includes("login") && "bg-slate-900"
										}`}
								>
									<Link
										className="block text-slate-200 hover:text-white transition duration-150 truncate"
										href="/create-chatbot"
										onClick={handleChatbotClick}
									>
										<div className="flex items-center">
											{walletReady ? ( // wallet connected
												<>
													<div
														className="flex items-center"
														onClick={handleWalletReadyClick}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="36"
															height="36"
															fill="none"
															viewBox="0 0 36 36"
														>
															<path
																fill="#F1F5F9"
																fillRule="evenodd"
																d="M18 7C11.925 7 7 11.925 7 18s4.925 11 11 11 11-4.925 11-11S24.075 7 18 7zm0 6a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z"
																clipRule="evenodd"
															>
																{" "}
															</path>
														</svg>
														<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
															Create chat bot
														</span>
													</div>
												</>
											) : (
												<GetInvolvedButton
													buttonStyle="flex items-center "
													wrapStyle="flex items-center "
													chainStyle="flex items-center "
													content={
														<>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="36"
																height="36"
																fill="none"
																viewBox="0 0 36 36"
															>
																<path
																	fill="#F1F5F9"
																	fillRule="evenodd"
																	d="M18 7C11.925 7 7 11.925 7 18s4.925 11 11 11 11-4.925 11-11S24.075 7 18 7zm0 6a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3h-3a1 1 0 110-2h3v-3a1 1 0 011-1z"
																	clipRule="evenodd"
																>
																	{" "}
																</path>
															</svg>
															<span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 text-[14px] font-semibold text-neutral-500">
																Create chat bot
															</span>
														</>
													}
												/>
											)}
										</div>
									</Link>
								</li> */}
                </ul>
                <CreditBalance />
              </div>
            </div>

            {/* Expand / collapse button */}
            {/* <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
						<div className="px-3 py-2">
							<button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
								<span className="sr-only">Expand / collapse sidebar</span>
								<svg
									className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
									viewBox="0 0 24 24"
								>
									<path
										className="text-slate-400"
										d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
									/>
									<path className="text-slate-600" d="M3 23H1V1h2z" />
								</svg>
							</button>
						</div>
					</div> */}
          </Transition>
        </div>
      </CreditBalanceProvider>
    </>
  );
}
