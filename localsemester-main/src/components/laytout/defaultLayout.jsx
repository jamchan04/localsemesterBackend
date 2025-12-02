import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { TopNav } from "./topNav";
import { Footer } from "./footer";
import ProtectedRoute from "../../auth/protectedRoute";

const DefaultLayout = () => {
  const isLocalSemester = useLocation().pathname === "/localSemester";
  const isMember = useLocation().pathname === "/member";
  return (
    <ProtectedRoute>
      <div className="w-screen h-auto">
        <TopNav isLocalSemester={[isLocalSemester, isMember]} />
        <div
          className={
            isLocalSemester || isMember
              ? "pb-16 min-h-[calc(100vh-9rem)]"
              : "pt-16 pb-16 min-h-[calc(100vh-9rem)]"
          }
        >
          <Outlet />
          <ScrollRestoration />
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default DefaultLayout;
