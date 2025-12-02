import { NavLink } from "react-router-dom";

export const TabButton = ({ children, onClick, path, ...props }) => {
  return (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "px-4 py-2 text-brand bg-[#ededed] rounded-lg dark:bg-[#3e3e3e]  cursor-pointer dark:text-brand-dark"
            : "px-4 py-2 text-brand hover:bg-[#ededed] dark:hover:bg-[#3e3e3e] rounded-lg  cursor-pointer dark:text-brand-dark "
        }
        to={path}
        onClick={onClick}
        {...props}
      >
        {children}
      </NavLink>
    </>
  );
};
