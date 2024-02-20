import OnboardingHeader from "./header";

type OnboardingLayoutProps = {
  children: React.ReactNode;
};

const OnboardingLayout = ({ children }: OnboardingLayoutProps) => {
  return (
    <>
      <OnboardingHeader />
      <main className="bg-[#292D32] px-32 py-10 h-[88dvh]">
        {children}
      </main>
    </>
  );
}

export default OnboardingLayout;
