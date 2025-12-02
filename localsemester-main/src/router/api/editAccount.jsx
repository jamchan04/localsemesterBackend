import { Navigate } from "react-router-dom";
import { checkAuth } from "../../auth/auth";

export const editAccountLoader = async () => {
  try {
    const auth = await checkAuth();

    if (!auth) {
      return <Navigate to="/login" />;
    }

    return true;
  } catch (error) {
    console.log(error);
  }
};
