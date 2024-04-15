import "./App.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect,
  redirectDocument,
} from "react-router-dom";
import Home from "./components/pages/home/Home";
import About from "./components/pages/account/Account";
import Account from "./components/pages/account/Account";
import People from "./components/pages/people/People";
import { resourceUsage } from "process";

export type GlobalContext = {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<
    React.SetStateAction<{
      isAuthorized: boolean;
    }>
  > | null;
};

export const mainContext = React.createContext<GlobalContext>({
  isAuthorized: false,
  setIsAuthorized: null,
});

function myLoader() {
  return redirect("/home");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "account",
    element: <Account />,
    /* loader:myLoader , */
  },
  {
    path: "people",
    element: <People />,
  },
]);

function App() {
  const [globalState, setIsAuthorized] = React.useState({
    isAuthorized: false,
  });

  React.useEffect(() => {
    setIsAuthorized({ isAuthorized: false });
  }, []);

  return (
    <div className="App">
      <mainContext.Provider
        value={{
          isAuthorized: globalState.isAuthorized,
          setIsAuthorized,
        }}
      >
        <RouterProvider router={router} />
      </mainContext.Provider>
    </div>
  );
}

export default App;
