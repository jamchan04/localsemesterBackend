export const PageContainer = ({ children }) => {
  return (
    <div className="bg-brand dark:bg-brand-dark dark:text-brand-dark h-screen w-screen relative">
      {children}
    </div>
  );
};
