import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { clearSession } from "../../auth/auth";
import { ProfileButton } from "../button/profileButton";
import { useMyProfile } from "../../store/myprofile";

export const SideMenuBar = ({ state, close }) => {
  const navigate = useNavigate();
  const { username, state: superviser } = useMyProfile(
    (state) => state.myProfile
  );

  const page = [
    {
      path: "/",
      label: "홈",
    },
    {
      path: "/localSemester",
      label: "현지학기",
    },
    {
      path: "/post",
      label: "게시판",
    },
    {
      path: "/member",
      label: "조원소개",
    },
  ];

  const onLogOut = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <AnimatePresence>
      {state && (
        <div className="fixed z-40 bg-black/20 top-0 left-0 w-screen h-screen">
          <motion.div
            className="fixed z-50 right-0 top-0 h-screen w-72 bg-[#ededed] backdrop-blur-lg  dark:bg-card-dark md:hidden"
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100vw", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col justify-between h-screen items-stretch">
              <div>
                <div className="h-20 flex px-6 py-4 items-start justify-between">
                  <div className="flex">
                    <ProfileButton callback={close} />
                    <div className="h-10 ml-4">
                      <p>{username}</p>
                      <p className="text-[10px]">
                        {superviser === 1 ? "일반 사용자" : "관리자"}
                      </p>
                    </div>
                  </div>
                  <MenuIcon close={close} />
                </div>
                <nav className=" gap-2 flex flex-col justify-center items-center">
                  {page.map((item, index) => (
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-brand-brand " : ""
                      }
                      key={index}
                      to={item.path}
                    >
                      <p
                        className="text-lg font-semibold py-2 hover:opacity-50"
                        onClick={close}
                      >
                        {item.label}
                      </p>
                    </NavLink>
                  ))}
                </nav>
              </div>
              <div className="text-center mb-2 flex-col gap-2 flex text-base font-semibold py-2">
                <p className="cursor-pointer">설정</p>
                <p
                  onClick={onLogOut}
                  className="hover:text-red-700 cursor-pointer"
                >
                  로그아웃
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const MenuIcon = ({ close }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-9 md:hidden cursor-pointer hover:opacity-80 "
      onClick={close}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};
