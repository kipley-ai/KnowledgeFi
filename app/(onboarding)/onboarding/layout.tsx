import OnboardingHeader from "./header";

export default function OnboardingLayout({ children }) {
  return (
    <>
      <OnboardingHeader />
      <main className="bg-[#292D32] px-32 py-10 h-[88dvh]">
        {children}
      </main>
    </>
  );
}
