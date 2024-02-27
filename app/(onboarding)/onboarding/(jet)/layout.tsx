type JetLayoutProps = {
  children: React.ReactNode;
};

const JetLayout = ({ children }: JetLayoutProps) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default JetLayout;
