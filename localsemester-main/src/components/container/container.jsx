export const Container = ({ children, page, className }) => {
  return (
    <div
      className={`flex justify-center w-screen dark:bg-brand-dark dark:text-brand-dark ${
        page ? "min-h-[calc(100vh-4rem)]" : "h-auto"
      } ${className}`}
    >
      <div className="lg:w-[1200px] w-screen px-2">{children}</div>
    </div>
  );
};
