import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useDarkMode } from "./store/darkmode";
import { useEffect } from "react";

function App() {
  const isDark = useDarkMode((state) => state.isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <div className="dark:text-brand-dark dark:bg-brand-dark">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
