import { useState } from "react";
import { SideMenuBar } from "../laytout/sideMenu";

export const MenuIcon = () => {
  const [sideBar, setSideBar] = useState(false);

  const onToggleSideBar = () => {
    setSideBar((state) => !state);
  };

  return (
    <>
      <SideMenuBar state={sideBar} close={onToggleSideBar} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-9 md:hidden cursor-pointer hover:opacity-80 "
        onClick={onToggleSideBar}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </>
  );
};
