import { Link } from "react-router-dom";

export const LongBox = ({ title, article, to, children, className }) => {
  return (
    <div
      className={`flex justify-around w-full items-center h-28 md:h-40 bg-brand-point dark:bg-card-dark rounded-2xl ${className}`}
    >
      <div className="flex items-center">
        {children}
        <div className="flex flex-col ml-4">
          <p className="text-2xl md:text-3xl font-bold">{title}</p>
          <p className="text-brand-sub text-sm hidden md:block md:text-base">
            {article}
          </p>
        </div>
      </div>
      <Link
        to={to}
        className="text-brand-sub hidden lg:block text-sm md:text-base "
      >
        바로가기
      </Link>
      <Link to={to} className="text-brand-sub lg:hidden">
        <ArrowIcon />
      </Link>
    </div>
  );
};

export const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
};
