import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession } from "./auth";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const validate = async () => {
      const sessionId = sessionStorage.getItem("sessionId");
      const uid = sessionStorage.getItem("uid");

      // Fast path: nothing stored → 바로 로그인 페이지
      if (!sessionId || !uid) {
        navigate("/login", { replace: true });
        setChecked(true);
        return;
      }

      // Optimistic render to reduce flicker, then verify
      setAllowed(true);
      setChecked(true);

      const session = await checkSession();

      if (!session) {
        setAllowed(false);
        navigate("/login", { replace: true });
      }
    };
    validate();
  }, [navigate]);

  if (!checked) return null;
  if (!allowed) return null;
  return children;
};

export default ProtectedRoute;
