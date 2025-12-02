import { useEffect, useState } from "react";
import { checkSession } from "../auth/auth";
import { Navigate } from "react-router-dom";

export const useGet = (url) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    const getFetch = async () => {
      setLoading(true);
      const session = await checkSession();
      if (!session) {
        return <Navigate to="/login" replace={true} />;
      }

      try {
        const request = await fetch(url);
        const response = await request.json();
        if (response.length > 0) {
          setResponse(response);
        } else {
          throw new Error("에러발생");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getFetch();
  }, [url]);

  return { loading, response };
};
