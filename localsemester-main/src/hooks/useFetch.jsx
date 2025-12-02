import { useState } from "react";
import { checkSession } from "../auth/auth";
import { useNavigate } from "react-router-dom";

export const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetcher = async ({ url, method, body }, callback) => {
    setLoading(true);

    try {
      const session = await checkSession();
      if (!session) {
        navigate("/login", { replace: true });
        return;
      }

      const request = await fetch(`${url}`, {
        method: method,
        headers:
          method !== "GET" && method !== "DELETE"
            ? { "Content-Type": "application/json" }
            : undefined,
        body:
          method !== "GET" && method !== "DELETE"
            ? JSON.stringify(body)
            : undefined,
      });

      const responseData = await request.json();

      setResponse(responseData);

      if (callback && typeof callback === "function") {
        callback(responseData);
      }

      return responseData;
    } catch (error) {
      console.error("Fetcher Error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, fetcher };
};
