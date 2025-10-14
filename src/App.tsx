import { Dispatch, SetStateAction, createContext, useState } from "react";
import router from "./navigation";
import { RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const LoaderContext = createContext<
  Partial<{
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }>
>({});
function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      <RouterProvider router={router} />
    </LoaderContext.Provider>
  );
}

export default App;
