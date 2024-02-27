import { CreateChatbotProvider } from "../create-knowledge-context";

type OnboardingLayoutProps = {
  children: React.ReactNode;
};

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <div className="flex h-dvh overflow-hidden bg-[#080403]">
      {/* Content area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-lg border-gray-700 p-0 pl-0">
        <div className="rounded-lg">
          {/*  Site header */}
          {/* <HeaderOnboarding /> */}

          <main className="h-[calc(100dvh-114px)] grow [&>*:first-child]:scroll-mt-16">
            <CreateChatbotProvider>
              <main className="h-dvh">
                {children}
              </main>
            </CreateChatbotProvider>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OnboardingLayout;
