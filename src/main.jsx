import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUp } from "./pages/SignUp.jsx";
import { Main } from "./pages/Main.jsx";
import ErrorPage from "./pages/Errorpage.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import { Login } from "./pages/Login.jsx";
import { Profile } from "./pages/Profile.jsx";

axios.defaults.baseURL="http://localhost:3000"
axios.defaults.withCredentials=true

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
